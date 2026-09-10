#!/usr/bin/env python3

"""
Update <lastmod> entries in sitemap.xml to today's date.

Usage: python3 scripts/update_sitemap.py sitemap.xml
"""

import sys
from datetime import date
import xml.etree.ElementTree as ET


def update_sitemap(path: str) -> bool:
    ns = { 'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9' }
    ET.register_namespace('', ns['sm'])
    tree = ET.parse(path)
    root = tree.getroot()
    today = date.today().isoformat()
    changed = False

    for url in root.findall('sm:url', ns):
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
    if len(sys.argv) != 2:
        print('Usage: update_sitemap.py <sitemap.xml>')
        sys.exit(2)
    path = sys.argv[1]
    updated = update_sitemap(path)
    if updated:
        print(f'Updated {path} lastmod to today')
        sys.exit(0)
    else:
        print('No changes needed')
        sys.exit(0)
