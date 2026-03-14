#!/usr/bin/env python3
"""
Download, compress, and upload optimized videos
H.264 2Mbps encoding for fast streaming
"""

import os
import subprocess
from pathlib import Path
import requests
import json

# All gallery videos
VIDEO_URLS = [
    ("Americium test.mp4", "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/cloud%20chamber/Americium%20test.mp4"),
    ("cooling test.mp4", "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/cloud%20chamber/cooling%20test.mp4"),
    ("operation(electron flood).mp4", "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/cloud%20chamber/operation%28electron%20flood%29.mp4"),
    ("VID_20250124_141833022.mp4", "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/cloud%20chamber/VID_20250124_141833022.mp4"),
    ("videofeedviafiber.mp4", "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/fiber%20optic%20link/videofeedviafiber.mp4"),
    ("optical trapping.mp4", "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/optical%20trapping/optical%20trapping.mp4"),
]

output_dir = Path(__file__).parent.parent / "optimized-media"
output_dir.mkdir(exist_ok=True)

print("\n" + "=" * 60)
print("Video Optimization (2Mbps H.264)")
print("=" * 60)

optimized_videos = {}

for idx, (filename, url) in enumerate(VIDEO_URLS, 1):
    output_path = output_dir / f"{filename.rsplit('.', 1)[0]}-optimized.mp4"
    temp_input = output_dir / f"{filename}.input"
    
    # Skip if already compressed
    if output_path.exists():
        size = output_path.stat().st_size / (1024 * 1024)
        print(f"\n[{idx}/{len(VIDEO_URLS)}] {filename}")
        print(f"  Already compressed ({size:.1f}MB)")
        optimized_videos[filename] = output_path.name
        continue
    
    print(f"\n[{idx}/{len(VIDEO_URLS)}] {filename}", end="")
    
    try:
        # Check local copy first
        local_path = output_dir / filename
        if local_path.exists():
            print(" → Using local copy...", end="", flush=True)
            input_file = local_path
            orig_size = input_file.stat().st_size / (1024 * 1024)
            print(f" ✓ ({orig_size:.1f}MB)", end="", flush=True)
        else:
            # Download if not local
            print(" → Downloading...", end="", flush=True)
            resp = requests.get(url, timeout=120, stream=True)
            resp.raise_for_status()
            
            with open(temp_input, "wb") as f:
                for chunk in resp.iter_content(chunk_size=1024*1024):
                    f.write(chunk)
            
            orig_size = temp_input.stat().st_size / (1024 * 1024)
            print(f" ✓ ({orig_size:.1f}MB)", end="", flush=True)
            input_file = temp_input
        
        # Compress
        print(" → Compressing...", end="", flush=True)
        subprocess.run([
            "ffmpeg", "-i", str(input_file),
            "-c:v", "libx264",
            "-b:v", "2000k",
            "-maxrate", "2500k",
            "-bufsize", "5000k",
            "-c:a", "aac",
            "-b:a", "128k",
            "-preset", "fast",
            "-y",
            str(output_path)
        ], capture_output=True, check=True)
        
        new_size = output_path.stat().st_size / (1024 * 1024)
        reduction = ((orig_size - new_size) / orig_size) * 100
        print(f" ✓ ({new_size:.1f}MB, -{reduction:.1f}%)")
        
        # Cleanup
        if temp_input.exists():
            temp_input.unlink()
        
        optimized_videos[filename] = output_path.name
        
    except Exception as e:
        print(f" ✗ {str(e)[:50]}")

print("\n" + "=" * 60)
print(f"Compressed: {len(optimized_videos)}/6 videos")
if optimized_videos:
    total_mb = sum([(output_dir / name).stat().st_size / (1024 * 1024) for name in optimized_videos.values() if (output_dir / name).exists()])
    print(f"Total size: {total_mb:.1f}MB")
print("=" * 60 + "\n")

# Save mapping
mapping_file = output_dir / "video-mapping.json"
with open(mapping_file, "w") as f:
    json.dump(optimized_videos, f, indent=2)

print("✓ Videos optimized and ready to upload")
print("Next step: node scripts/upload-videos.mjs")
