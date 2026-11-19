"""Build the manual-install ZIP; never includes private backups or test data."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
module = json.loads((ROOT / 'module.json').read_text())
out = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / 'dist'
out.mkdir(exist_ok=True)
target = out / f"Landing-Page-Prototyper-v{module['version']}.zip"
files = [ROOT / 'module.json', ROOT / 'README.md']
if (ROOT / 'docs/CAST.md').exists():
    files.append(ROOT / 'docs/CAST.md')
if (ROOT / 'assets').exists():
    files += sorted(p for p in (ROOT / 'assets').rglob('*') if p.is_file())
runtime_scripts = [
    'cast-config.js', 'cast-data.js', 'cast-page.js', 'installer.js',
    'landing-config.js', 'module.js', 'open-landing-macro.js',
    'presentation.js', 'scene-transform.js',
]
files += [ROOT / 'scripts' / name for name in runtime_scripts]
files += sorted((ROOT / 'styles').glob('*.css'))
with ZipFile(target, 'w', ZIP_DEFLATED) as archive:
    for path in files:
        archive.write(path, f"{module['id']}/{path.relative_to(ROOT).as_posix()}")
with ZipFile(target) as archive:
    assert archive.testzip() is None
    assert all('/backups/' not in n and '/docs/verification/' not in n and '/tests/' not in n for n in archive.namelist())
    assert not any(n.endswith(('/story-content.js', '/rules-content.js', '/details-content.js', '/graveyard-content.js')) for n in archive.namelist())
    # Private, git-ignored list of words that must never ship (one per line).
    # Kept outside the module folder (Foundry serves everything inside it).
    candidates = [ROOT.parent / f'{ROOT.name}-private' / 'backups' / 'forbidden-terms.txt', ROOT / 'backups' / 'forbidden-terms.txt']
    terms_file = next((c for c in candidates if c.exists()), None)
    terms = [t.strip().lower() for t in terms_file.read_text().splitlines() if t.strip()] if terms_file else []
    for name in archive.namelist():
        data = archive.read(name).decode('utf-8', 'replace').lower() if name.endswith(('.js', '.css', '.json', '.md', '.html', '.txt')) else ''
        for term in terms:
            assert term not in name.lower() and term not in data, f'forbidden term found in {name}'
    if not terms:
        print('warning: no forbidden-terms.txt found; forbidden-term check skipped')
checksum = hashlib.sha256(target.read_bytes()).hexdigest()
target.with_suffix('.zip.sha256').write_text(f'{checksum}  {target.name}\n')
print(f'{target}\n{len(files)} runtime files; ZIP verified; SHA-256 {checksum}')
