"""Aggregate intake/*.json → intake/catalog.json + print a markdown summary."""
import json, glob, os

def suggest_platform(title):
    t = title
    if '6.25' in t or '6.2寸' in t: return 'tour-view-625'
    if '7寸' in t or '7.0' in t: return 'NEW 7\" platform'
    if '5寸' in t or '5.0' in t or '5寸' in t: return 'ride-view-5'
    if '头盔' in t: return 'NEW helmet-cam'
    if any(k in t for k in ['便携', '运动相机', '隐藏式', '无屏', '直供', 'OTG', 'USB供电', '骑行记录仪', 'DVR']) and 'carplay' not in t.lower() and '车机' not in t:
        return 'road-eye-d2 / portable'
    if 'carplay' in t.lower() or '车机' in t or '导航' in t: return 'smart-display'
    return 'road-eye-d2 (DVR)'

files = sorted(glob.glob('intake/*.json'))
catalog = []
for fp in files:
    with open(fp, encoding='utf-8') as f:
        catalog.append(json.load(f))
with open('intake/catalog.json', 'w', encoding='utf-8') as o:
    json.dump(catalog, o, ensure_ascii=False, indent=2)

print(f'# Intake catalog: {len(catalog)} products\n')
print('| # | Title (short) | Supplier | Specs | SKUs | Price¥ | Flags | → Platform |')
print('|---|---|---|---|---|---|---|---|')
for i, p in enumerate(catalog, 1):
    pr = p.get('priceRange', [])
    prs = f"{pr[0]}-{pr[1]}" if pr else '-'
    flags = '; '.join(p.get('evidenceFlags', [])) or '-'
    title = p['title'][:28]
    sup = (p.get('supplier') or '-')[:14]
    print(f"| {i} | {title} | {sup} | {len(p['specs'])} | {len(p['skuVariants'])} | {prs} | {flags[:30]} | {suggest_platform(p['title'])} |")
print('\n(catalog.json written)')
