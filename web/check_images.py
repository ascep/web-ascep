import json
from pathlib import Path
from collections import Counter
root = Path(r'c:/Users/Home/Desktop/ascep/web')
json_path = root / 'src' / 'data' / 'fotos.json'
with json_path.open('r', encoding='utf-8') as f:
    data = json.load(f)
refs = set()

def collect(obj):
    if isinstance(obj, dict):
        for v in obj.values():
            collect(v)
    elif isinstance(obj, list):
        for item in obj:
            collect(item)
    elif isinstance(obj, str):
        if obj.startswith('/') and any(obj.lower().endswith(ext) for ext in ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']):
            refs.add(obj)

collect(data)
img_dir = root / 'public' / 'images'
files = sorted([p for p in img_dir.rglob('*') if p.is_file() and p.suffix.lower() in {'.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'}])
ref_files = {r.lstrip('/') for r in refs}
missing_in_json = [f for f in files if str(f.relative_to(img_dir)).replace('\\', '/') not in ref_files]
missing_in_fs = [r for r in refs if not (root / 'public' / r.lstrip('/')).exists()]
print('total_image_files:', len(files))
print('total_json_refs:', len(refs))
print('ref_files_match_files:', len(ref_files & {str(f.relative_to(img_dir)).replace('\\','/') for f in files}))
print('missing_in_json_count:', len(missing_in_json))
print('missing_in_fs_count:', len(missing_in_fs))
print('missing_in_json_by_dir:')
for k,v in Counter([str(f.relative_to(img_dir).parent).replace('\\','/') for f in missing_in_json]).most_common():
    print(k, v)
print('missing_in_fs:')
for x in sorted(missing_in_fs):
    print(x)
print('missing_in_json sample:')
for x in sorted(missing_in_json, key=lambda p: str(p.relative_to(img_dir)))[:50]:
    print(str(x.relative_to(root)).replace('\\','/'))
