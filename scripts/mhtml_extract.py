"""Extract structured product fields from a 1688 .mhtml → JSON.
Best-effort section parsing. Outputs intake/<stem>.json.
Usage: python mhtml_extract.py <file.mhtml>"""
import email, json, os, re, sys
from email import policy

def decode_html(part):
    raw = part.get_payload(decode=True)
    cs = part.get_content_charset() or ''
    if not cs:
        m = re.search(rb'charset=["\']?([\w-]+)', raw[:2000], re.I)
        cs = m.group(1).decode('ascii', 'ignore') if m else ''
    for enc in ([cs] if cs else []) + ['utf-8', 'gbk', 'gb18030']:
        if not enc: continue
        try: return raw.decode(enc)
        except (UnicodeDecodeError, LookupError): continue
    return raw.decode('utf-8', 'replace')

def strip(html):
    t = re.sub(r'<script.*?</script>', ' ', html, flags=re.S | re.I)
    t = re.sub(r'<style.*?</style>', ' ', t, flags=re.S | re.I)
    t = re.sub(r'<(tr|/tr|td|/td|th|/th|li|/li|p|/p|div|/div|br\s*/?)>', '\n', t, flags=re.I)
    t = re.sub(r'<[^>]+>', ' ', t)
    t = t.replace('&nbsp;', ' ').replace('&amp;', '&')
    lines = [re.sub(r'[ \t]+', ' ', ln).strip() for ln in t.splitlines()]
    return [ln for ln in lines if ln]

def parse_kv_block(lines, start_idx, stop_terms):
    """Parse alternating key/value pairs after a marker, until a stop term."""
    out = {}; i = start_idx
    while i < len(lines):
        if any(s in lines[i] for s in stop_terms): break
        key = lines[i]; i += 1
        if i < len(lines) and not any(s in lines[i] for s in stop_terms) and lines[i] not in ('展开全部',):
            out[key] = lines[i]; i += 1
        else:
            out[key] = ''
    return out, i

def extract(path):
    with open(path, 'rb') as f:
        msg = email.message_from_binary_file(f, policy=policy.default)
    html = None; imgs = 0
    for part in msg.walk():
        ct = part.get_content_type()
        if ct == 'text/html' and html is None: html, _ = decode_html(part), None
        elif ct.startswith('image/') and part.get_payload(decode=True): imgs += 1
    L = strip(html or '')
    title = (L[0].split(' - 阿里巴巴')[0] if L else '').strip()
    # supplier + narrative
    supplier = ''
    m = re.search(r'([\u4e00-\u9fa5]{2,30}(?:有限公司|科技|股份|加工厂|厂)[\u4e00-\u9fa5]{0,10})是一家', '\n'.join(L))
    if m: supplier = m.group(1)
    # shop metrics
    blob = ' '.join(L)
    shop = {}
    for k, pat in [('repeatRate', r'回头率\s*(\d+%)'), ('serviceScore', r'服务分\s*([\d.]+)\s*分'),
                   ('shipRate', r'准时发货率\s*(\d+%)'), ('praiseRate', r'好评率\s*(\d+%)')]:
        mm = re.search(pat, blob)
        if mm: shop[k] = mm.group(1)
    # 商品属性 spec block — find the SECTION header (next line is a real key, not a nav tab)
    specs = {}
    nav_terms = {'商品评价', '商品属性', '包装信息', '商品详情', '请将所有插件插入此位置，方便用户使用，感谢'}
    for i, ln in enumerate(L):
        if ln == '商品属性' and i + 1 < len(L) and L[i + 1] and L[i + 1] not in nav_terms:
            specs, _ = parse_kv_block(L, i + 1, ['包装信息', '商品详情', '展开全部', '商品评价'])
            if specs:
                break
    # sku variants from 颜色分类 value
    sku_variants = []
    if '颜色分类' in specs:
        sku_variants = [v.strip() for v in specs['颜色分类'].split(',') if v.strip()]
    # price block: variant / ¥N / 库存N套
    prices = {}
    for i in range(len(L) - 2):
        if re.fullmatch(r'¥\s*\d+', L[i + 1]) and '库存' in L[i + 2]:
            mm = re.search(r'\d+', L[i + 1]); stock = re.search(r'\d+', L[i + 2])
            if mm: prices[L[i]] = {'price': int(mm.group()), 'stock': int(stock.group()) if stock else None}
    price_vals = [v['price'] for v in prices.values()]
    # packaging
    pkg = {}
    for ln in L:
        mm = re.search(r'彩盒[^0-9]*(\d+\*\d+\*\d+\s*mm)[^0-9]*([\d.]+)\s*kg', ln)
        if mm: pkg['retail'] = {'size': mm.group(1), 'weight': mm.group(2) + 'kg'}
        mm = re.search(r'标箱[^0-9]*(\d+\*\d+\*\d+\s*mm)[^0-9]*(\d+)\s*kg/(\d+)\s*pcs', ln)
        if mm: pkg['master'] = {'size': mm.group(1), 'weight': f'{mm.group(2)}kg', 'qty': int(mm.group(3))}
    # evidence flags: title claims 4K/2K but pixel spec low
    flags = []
    px = specs.get('像素', '')
    pxm = re.search(r'(\d+)\s*万', px)
    if pxm:
        mp = int(pxm.group(1))
        if '4K' in title and mp < 800: flags.append(f'title claims 4K but 像素={px}({mp}MP)')
        if '2K' in title and mp < 300: flags.append(f'title claims 2K but 像素={px}({mp}MP)')
    return {
        'file': os.path.basename(path), 'title': title, 'supplier': supplier,
        'shopMetrics': shop, 'specs': specs, 'skuVariants': sku_variants,
        'skuPrices': prices, 'priceRange': [min(price_vals), max(price_vals)] if price_vals else [],
        'packaging': pkg, 'imageCount': imgs, 'evidenceFlags': flags,
    }

def main(path):
    data = extract(path)
    stem = re.sub(r'[^\w-]+', '_', os.path.splitext(os.path.basename(path))[0])[:60]
    out = os.path.join('intake', stem + '.json')
    with open(out, 'w', encoding='utf-8') as o:
        json.dump(data, o, ensure_ascii=False, indent=2)
    print(f"{data['title'][:40]} | specs={len(data['specs'])} skus={len(data['skuVariants'])} prices={len(data['skuPrices'])} flags={data['evidenceFlags']}")

if __name__ == '__main__':
    main(sys.argv[1])
