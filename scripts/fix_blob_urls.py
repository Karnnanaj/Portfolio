#!/usr/bin/env python3
"""
Fix gallery URLs to match flat structure in Blob
Images are stored flat in portfolio/, not in subfolders
"""

import re
from pathlib import Path

content_file = Path(__file__).parent.parent / "src/resources/content.tsx"

print("\n" + "="*60)
print("Fix Gallery Image URLs (Blob flat structure)")
print("="*60)

with open(content_file) as f:
    content = f.read()

# Pattern: /portfolio/ANYTHING/filename-optimized.ext
# Replace with: /portfolio/filename-optimized.ext
pattern = r'favw6hdckgdqdobu\.public\.blob\.vercel-storage\.com/portfolio/[^/]*/([^/]*-optimized\.[^"]+)'
replacement = r'favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/\1'

updated_content = re.sub(pattern, replacement, content)

# Count changes
original_urls = len(re.findall(r'portfolio/[^/]*/[^"]*-optimized', content))
new_urls = len(re.findall(r'portfolio/[^/]*-optimized', updated_content))

print(f"\nURLs to fix: {original_urls}")

if updated_content != content:
    with open(content_file, "w") as f:
        f.write(updated_content)
    print("✓ Updated content.tsx")
    print(f"✓ Fixed {original_urls} image URLs to flat structure")
    print("\nExample changes:")
    print("  Before: .../portfolio/pcb strain mapping/IMG_20260212_174414603-optimized.jpg")
    print("  After:  .../portfolio/IMG_20260212_174414603-optimized.jpg")
else:
    print("✗ No URLs to update")

print("="*60 + "\n")
