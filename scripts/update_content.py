#!/usr/bin/env python3
"""
Update content.tsx with -optimized image URLs
Maps original filenames to -optimized versions
"""

import json
from pathlib import Path
import re

optimized_dir = Path(__file__).parent.parent / "optimized-media"
mapping_file = optimized_dir / "url-mapping.json"
content_file = Path(__file__).parent.parent / "src/resources/content.tsx"

if not mapping_file.exists():
    print(f"ERROR: {mapping_file} not found")
    print("Run upload_optimized.py first to generate mapping")
    exit(1)

print("\n" + "=" * 60)
print("Update content.tsx with Optimized URLs")
print("=" * 60)

# Load mapping
with open(mapping_file) as f:
    mapping = json.load(f)

print(f"\nLoaded mapping for {len(mapping)} images")

# Read content.tsx
with open(content_file) as f:
    content = f.read()

# Update each URL
original_content = content
for original, optimized in mapping.items():
    # Find URL pattern: /portfolio/path/filename
    # Replace just the filename with optimized version
    pattern = f'/portfolio/([^"]*){re.escape(original)}'
    replacement = f'/portfolio/\\1{optimized}'
    
    old_count = content.count(original)
    content = re.sub(pattern, replacement, content)
    
    if old_count > 0:
        print(f"  {original} → {optimized}")

# Count changes
if content != original_content:
    # Write updated content
    with open(content_file, "w") as f:
        f.write(content)
    
    print(f"\n✓ Updated {content_file.name}")
    print("✓ All image URLs updated to use -optimized versions")
    print("\nNext step:")
    print("1. Build: npm run build")
    print("2. Git commit: git add . && git commit -m 'chore: optimize gallery images'")
    print("3. Deploy: git push (auto-deploys to Vercel)")
    print("\nTo revert: Run revert-to-original-images.py")
else:
    print("\n✗ No URLs found to update")
    print("Verify original filenames in content.tsx match mapping")

print("=" * 60)
