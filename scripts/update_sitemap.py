#!/usr/bin/env python3

"""
Update <lastmod> entries in sitemap.xml to today's date.

Usage: python3 scripts/update_sitemap.py sitemap.xml
"""

import sys
from datetime import date
import xml.etree.ElementTree as ET


URL_SOURCE_FILES = {
    'https://lackomasszazs.hu/': {'index.html'},
    'https://lackomasszazs.hu/privacy.html': {'privacy.html'},
}


def update_sitemap(path: str, changed_files: set[str] | None = None) -> bool:
    ns = { 'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9' }
    ET.register_namespace('', ns['sm'])
    tree = ET.parse(path)
    root = tree.getroot()
    today = date.today().isoformat()
    changed = False

    for url in root.findall('sm:url', ns):
        loc = url.find('sm:loc', ns)
        if changed_files is not None and loc is not None:
            source_files = URL_SOURCE_FILES.get(loc.text, set())
            if not source_files.intersection(changed_files):
                continue

        lastmod = url.find('sm:lastmod', ns)
        if lastmod is None:
            lastmod = ET.SubElement(url, '{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod')
            lastmod.text = today
            changed = True
        else:
            if lastmod.text != today:
                lastmod.text = today
                changed = True

    if changed:
        tree.write(path, encoding='utf-8', xml_declaration=True)
    return changed


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: update_sitemap.py <sitemap.xml> [changed-file ...]')
        sys.exit(2)
    path = sys.argv[1]
    changed_files = set(sys.argv[2:]) or None
    updated = update_sitemap(path, changed_files)
    if updated:
        print(f'Updated {path} lastmod to today')
        sys.exit(0)
    else:
        print('No changes needed')
        sys.exit(0)
