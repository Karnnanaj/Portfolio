#!/usr/bin/env python3
"""
Replace all Blob URLs in MDX files with local /images/ paths
"""

import re
from pathlib import Path

MDX_DIR = Path(__file__).parent.parent / "src" / "app" / "work" / "projects"

print("\n" + "="*60)
print("Replace Blob URLs in MDX Files")
print("="*60 + "\n")

# Pattern to match Blob URLs
blob_pattern = r'https://favw6hdckgdqdobu\.public\.blob\.vercel-storage\.com/portfolio/[^"]*'

mdx_files = list(MDX_DIR.glob("*.mdx"))
total_replaced = 0

for mdx_file in sorted(mdx_files):
    with open(mdx_file, "r", encoding="utf-8") as f:
        content = f.read()
    
    matches = re.findall(blob_pattern, content)
    
    if not matches:
        continue
    
    print(f"📝 {mdx_file.name}")
    
    # Replace: extract filename from URL
    def replace_blob_url(match):
        url = match.group(0)
        # Extract filename (handle URL encoding and subfolders)
        filename_encoded = url.split('/')[-1]
        # Decode URL encoding
        filename = filename_encoded.replace('%20', ' ').replace('%28', '(').replace('%29', ')')
        local_path = f"/images/{filename}"
        print(f"  ✓ {filename}")
        return local_path
    
    new_content = re.sub(blob_pattern, replace_blob_url, content)
    
    with open(mdx_file, "w", encoding="utf-8") as f:
        f.write(new_content)
    
    total_replaced += len(matches)

print("\n" + "="*60)
print(f"✓ Updated {len(mdx_files)} MDX files with {total_replaced} URL replacements")
print("="*60 + "\n")
