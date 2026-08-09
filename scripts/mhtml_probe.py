"""Probe a 1688/Alibaba .mhtml archive: list parts, dump stripped text + image count.
Usage: python mhtml_probe.py <file.mhtml>
Stdlib only (email + regex). Confirms the rendered product DOM is extractable."""
import email, re, sys
from email import policy

def main(path):
    with open(path, 'rb') as f:
        msg = email.message_from_binary_file(f, policy=policy.default)
    html = None
    parts = []
    imgs = 0
    for part in msg.walk():
        ct = part.get_content_type()
        cl = len(part.get_payload(decode=True) or b'')
        parts.append((ct, cl))
        if ct == 'text/html' and html is None:
            html = part.get_content()
        elif ct.startswith('image/'):
            imgs += 1
    print('=== PARTS (type, bytes) ===')
    for ct, cl in parts[:20]:
        print(f'  {ct}  {cl}')
    print(f'total parts: {len(parts)}  images: {imgs}')
    if not html:
        print('NO HTML PART'); return
    # strip script/style, then tags
    t = re.sub(r'<script.*?</script>', ' ', html, flags=re.S | re.I)
    t = re.sub(r'<style.*?</style>', ' ', t, flags=re.S | re.I)
    t = re.sub(r'<[^>]+>', ' ', t)
    t = re.sub(r'&nbsp;', ' ', t)
    t = re.sub(r'\s+', ' ', t).strip()
    print(f'=== STRIPPED TEXT len={len(t)} ===')
    print(t[:4000])

if __name__ == '__main__':
    main(sys.argv[1])
