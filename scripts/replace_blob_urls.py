#!/usr/bin/env python3
"""
Smart migration: Replace all Blob URLs with local /images/ paths
"""

import re
from pathlib import Path

CONTENT_FILE = Path(__file__).parent.parent / "src" / "resources" / "content.tsx"

print("\n" + "="*60)
print("Replace Blob URLs with Local Paths")
print("="*60 + "\n")

with open(CONTENT_FILE, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern to match any Blob URL (handles subfolders and URL encoding)
# Matches: https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/...
pattern = r'https://favw6hdckgdqdobu\.public\.blob\.vercel-storage\.com/portfolio/[^"]*'

matches = re.findall(pattern, content)
print(f"Found {len(matches)} Blob URLs to replace\n")

# Replace: extract filename from URL and create local path
def replace_blob_url(match):
    url = match.group(0)
    # Extract filename from URL (handle URL encoding and subfolders)
    # E.g., ".../cloud%20chamber/Americium%20test-optimized.mp4" → "Americium test-optimized.mp4"
    filename_encoded = url.split('/')[-1]
    # Decode URL encoding
    filename = filename_encoded.replace('%20', ' ').replace('%28', '(').replace('%29', ')')
    local_path = f"/images/{filename}"
    print(f"  {filename} → {local_path}")
    return local_path

# Replace all matches
new_content = re.sub(pattern, replace_blob_url, content)

with open(CONTENT_FILE, "w", encoding="utf-8") as f:
    f.write(new_content)

print("\n" + "="*60)
print(f"✓ Updated content.tsx with local paths")
print("="*60)
print(f"""
Media is now served from /images/ locally.

Next steps:
  1. npm run build
  2. git add . && git commit -m "chore: migrate to local media" && git push
""")
print("="*60 + "\n")
