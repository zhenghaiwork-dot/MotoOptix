"""Parse a 1688/Alibaba .mhtml archive → clean utf-8 text dump + images.
Stdlib only. Writes to intake/<stem>.txt and intake/<stem>-img/.
Usage: python mhtml_parse.py <file.mhtml>"""
import email, os, re, sys, base64
from email import policy

def decode_html(part):
    raw = part.get_payload(decode=True)  # bytes, email lib decodes transfer-encoding
    # detect charset: MIME declared, then <meta charset>, then utf-8/gbk fallback
    cs = part.get_content_charset() or ''
    if not cs:
        m = re.search(rb'charset=["\']?([\w-]+)', raw[:2000], re.I)
        cs = m.group(1).decode('ascii', 'ignore') if m else ''
    for enc in ([cs] if cs else []) + ['utf-8', 'gbk', 'gb18030', 'big5']:
        if not enc: continue
        try:
            return raw.decode(enc), enc
        except (UnicodeDecodeError, LookupError):
            continue
    return raw.decode('utf-8', 'replace'), 'utf-8-replace'

def strip(html):
    t = re.sub(r'<script.*?</script>', ' ', html, flags=re.S | re.I)
    t = re.sub(r'<style.*?</style>', ' ', t, flags=re.S | re.I)
    t = re.sub(r'<(tr|/tr|td|/td|th|/th|li|/li|p|/p|div|/div|br\s*/?)>', lambda m: '\n' if not m.group(1).startswith(('td','th','li')) else m.group(0), t, flags=re.I)
    t = re.sub(r'<[^>]+>', ' ', t)
    t = t.replace('&nbsp;', ' ').replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    # collapse spaces but keep newlines
    lines = [re.sub(r'[ \t]+', ' ', ln).strip() for ln in t.splitlines()]
    lines = [ln for ln in lines if ln]
    return '\n'.join(lines)

def main(path):
    with open(path, 'rb') as f:
        msg = email.message_from_binary_file(f, policy=policy.default)
    stem = re.sub(r'[^\w-]+', '_', os.path.splitext(os.path.basename(path))[0])[:60]
    outdir = os.path.join('intake')
    os.makedirs(outdir, exist_ok=True)
    imgdir = os.path.join(outdir, stem + '-img')
    os.makedirs(imgdir, exist_ok=True)
    html = None; imgs = 0
    for part in msg.walk():
        ct = part.get_content_type()
        if ct == 'text/html' and html is None:
            html, enc = decode_html(part)
        elif ct.startswith('image/'):
            data = part.get_payload(decode=True)
            if data:
                ext = ct.split('/', 1)[1].split('+')[0]
                imgs += 1
                with open(os.path.join(imgdir, f'img-{imgs:03d}.{ext}'), 'wb') as o:
                    o.write(data)
    if not html:
        print('NO HTML'); return
    text = strip(html)
    txt_path = os.path.join(outdir, stem + '.txt')
    with open(txt_path, 'w', encoding='utf-8') as o:
        o.write(text)
    print(f'OK  enc={enc}  text={len(text)}  images={imgs}')
    print(f'text -> {txt_path}')
    print(f'imgs -> {imgdir}')

if __name__ == '__main__':
    main(sys.argv[1])
