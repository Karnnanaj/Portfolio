#!/usr/bin/env python3
"""
Migrate optimized media from optimized-media/ to public/images/
and update content.tsx URLs from Blob to local paths
"""

import shutil
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
OPTIMIZED_DIR = BASE_DIR / "optimized-media"
PUBLIC_IMAGES_DIR = BASE_DIR / "public" / "images"
CONTENT_FILE = BASE_DIR / "src" / "resources" / "content.tsx"

print("\n" + "="*60)
print("Migrate Optimized Media to Local")
print("="*60)

# Create public/images if it doesn't exist
PUBLIC_IMAGES_DIR.mkdir(parents=True, exist_ok=True)

# Copy optimized images
print("\n[1] Copying optimized images to public/images/")
image_mappings = {}
optimized_images = list(OPTIMIZED_DIR.glob("*.jpg")) + list(OPTIMIZED_DIR.glob("*.png"))

for img_file in optimized_images:
    dest = PUBLIC_IMAGES_DIR / img_file.name
    shutil.copy2(img_file, dest)
    image_mappings[img_file.name] = f"/images/{img_file.name}"
    print(f"  ✓ {img_file.name}")

# Copy optimized videos
print("\n[2] Copying optimized videos to public/images/")
video_mappings = {}
optimized_videos = list(OPTIMIZED_DIR.glob("*.mp4"))

for vid_file in optimized_videos:
    dest = PUBLIC_IMAGES_DIR / vid_file.name
    shutil.copy2(vid_file, dest)
    video_mappings[vid_file.name] = f"/images/{vid_file.name}"
    print(f"  ✓ {vid_file.name}")

# Update content.tsx - replace Blob URLs with local paths
print("\n[3] Updating content.tsx URLs")
with open(CONTENT_FILE, "r", encoding="utf-8") as f:
    content = f.read()

# Replace all Blob URLs
blob_base = "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/"
updates_made = 0

for filename, local_path in {**image_mappings, **video_mappings}.items():
    # Handle files with spaces (URL encoded as %20)
    blob_url = f'{blob_base}{filename.replace(" ", "%20")}'
    if blob_url in content:
        content = content.replace(blob_url, local_path)
        updates_made += 1
        print(f"  ✓ {filename} → {local_path}")

# Also handle non-encoded blob URLs
blob_base_plain = "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/"
for filename, local_path in {**image_mappings, **video_mappings}.items():
    blob_url = f'{blob_base_plain}{filename}'
    if blob_url in content:
        content = content.replace(blob_url, local_path)
        updates_made += 1
        print(f"  ✓ {filename} (plain) → {local_path}")

with open(CONTENT_FILE, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\n✓ Updated {updates_made} URLs in content.tsx")

print("\n" + "="*60)
print("Migration Complete!")
print("="*60)
print(f"""
✓ Optimized media copied to public/images/
✓ URLs in content.tsx updated to local paths
✓ .gitignore updated to track public/images/

Next steps:
  1. Review public/images/ folder
  2. Run: npm run build
  3. Run: git add . && git commit -m "chore: migrate media to local" && git push
  
Your portfolio is now self-contained, <250MB for Vercel!
""")
print("="*60 + "\n")
