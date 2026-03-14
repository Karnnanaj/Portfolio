#!/usr/bin/env python3
"""
Upload Optimized Images to Vercel Blob with -optimized suffix
Keeps originals as backup, uses optimized versions in gallery
"""

import os
import sys
from pathlib import Path
import requests
import json

# Get token from environment
TOKEN = os.getenv("BLOB_READ_WRITE_TOKEN")
if not TOKEN:
    print("ERROR: BLOB_READ_WRITE_TOKEN environment variable not set")
    print("\nTo get your token:")
    print("1. Go to: https://vercel.com/account/tokens")
    print("2. Create and copy your token (full access)")
    print("3. Run: $env:BLOB_READ_WRITE_TOKEN='your-token'")
    print("4. Then run this script again")
    sys.exit(1)

# Use Vercel Blob API via PUT method
BLOB_STORAGE_ID = "favw6hdckgdqdobu"
BLOB_URL = f"https://{BLOB_STORAGE_ID}.public.blob.vercel-storage.com"

optimized_dir = Path(__file__).parent.parent / "optimized-media"

print("\n" + "=" * 60)
print("Upload Compressed Images (with -optimized suffix)")
print("=" * 60)

# Get list of optimized files
files = sorted([f for f in optimized_dir.iterdir() if f.suffix in {".jpg", ".png"} and "summary" not in f.name and not f.name.endswith(".tmp")])

if not files:
    print(f"\nNo optimized images found in {optimized_dir}")
    sys.exit(1)

print(f"\nFound {len(files)} optimized images")
print(f"Upload destination: {BLOB_URL}/portfolio/")

uploaded = 0
failed = 0
failed_files = []

for idx, file_path in enumerate(files, 1):
    original_name = file_path.name
    # Add -optimized before extension
    name_parts = original_name.rsplit(".", 1)
    optimized_name = f"{name_parts[0]}-optimized.{name_parts[1]}"
    
    file_size_mb = file_path.stat().st_size / (1024 * 1024)
    
    print(f"\n[{idx}/{len(files)}] {original_name} → {optimized_name} ({file_size_mb:.2f}MB)", end="", flush=True)
    
    try:
        with open(file_path, "rb") as f:
            file_content = f.read()
        
        # Try uploading via Vercel Blob REST API
        # Using put endpoint: PUT /blob/<pathname>
        blob_path = f"portfolio/{optimized_name}"
        upload_url = f"{BLOB_URL}/{blob_path}"
        
        headers = {
            "Authorization": f"Bearer {TOKEN}",
        }
        
        response = requests.put(
            upload_url,
            data=file_content,
            headers=headers,
            timeout=60
        )
        
        if response.status_code in {200, 201}:
            print(f" ✓ Uploaded")
            uploaded += 1
        else:
            print(f" ✗ HTTP {response.status_code}")
            failed += 1
            failed_files.append(original_name)
            
    except Exception as e:
        print(f" ✗ {str(e)[:50]}")
        failed += 1
        failed_files.append(original_name)

print("\n" + "=" * 60)
print(f"Results: {uploaded} uploaded, {failed} failed")
if failed_files:
    print(f"Failed: {', '.join(failed_files[:3])}")
print("=" * 60)

if uploaded > 0:
    # Save mapping of original -> optimized
    mapping = {}
    for file_path in files:
        original_name = file_path.name
        name_parts = original_name.rsplit(".", 1)
        optimized_name = f"{name_parts[0]}-optimized.{name_parts[1]}"
        mapping[original_name] = optimized_name
    
    mapping_file = optimized_dir / "url-mapping.json"
    with open(mapping_file, "w") as f:
        json.dump(mapping, f, indent=2)
    
    print(f"\n✓ Mapping saved to: {mapping_file}")
    print("\nNext step: Run update-content.py to update src/resources/content.tsx")
else:
    print("\n✗ No files uploaded - check token and try again")
    sys.exit(1)
