#!/usr/bin/env python3
"""
Revert Gallery Images to Original URLs
Use this if optimized images have issues
"""

import json
from pathlib import Path
import re

optimized_dir = Path(__file__).parent.parent / "optimized-media"
mapping_file = optimized_dir / "url-mapping.json"
content_file = Path(__file__).parent.parent / "src/resources/content.tsx"

if not mapping_file.exists():
    print(f"ERROR: {mapping_file} not found")
    exit(1)

print("\n" + "=" * 60)
print("Revert to Original Gallery Images")
print("=" * 60)

# Load mapping
with open(mapping_file) as f:
    mapping = json.load(f)

print(f"\nReverting {len(mapping)} images to originals...\n")

# Read content.tsx
with open(content_file) as f:
    content = f.read()

# Revert each URL (reverse the mapping)
original_content = content
for original, optimized in mapping.items():
    # Find optimized URL and replace with original
    pattern = f'/portfolio/([^"]*){re.escape(optimized)}'
    replacement = f'/portfolio/\\1{original}'
    
    if optimized in content:
        print(f"  {optimized} → {original}")
    
    content = re.sub(pattern, replacement, content)

# Write reverted content
if content != original_content:
    with open(content_file, "w") as f:
        f.write(content)
    
    print(f"\n✓ Reverted {content_file.name} to original URLs")
    print("\nNext step:")
    print("1. Build: npm run build")
    print("2. Git commit: git add . && git commit -m 'chore: revert to original images'")
    print("3. Deploy: git push")
else:
    print("\n✗ No optimized URLs found to revert")

print("=" * 60)
