#!/usr/bin/env python3
"""
Compress a single MP4 video using FFmpeg
"""

import subprocess
from pathlib import Path

VIDEO_FILE = Path(__file__).parent.parent / "public" / "images" / "VID20260222221104.mp4"
OUTPUT_FILE = Path(__file__).parent.parent / "public" / "images" / "VID20260222221104-optimized.mp4"

print("\n" + "="*60)
print("Compress Video Locally")
print("="*60 + "\n")

if not VIDEO_FILE.exists():
    print(f"❌ Video not found: {VIDEO_FILE}")
    exit(1)

original_size = VIDEO_FILE.stat().st_size / (1024**2)
print(f"Input:  {VIDEO_FILE.name} ({original_size:.2f}MB)")
print(f"Output: {OUTPUT_FILE.name}")
print(f"Settings: H.264, 2Mbps bitrate, 'fast' preset\n")

# Compress using FFmpeg
cmd = [
    "ffmpeg",
    "-i", str(VIDEO_FILE),
    "-c:v", "libx264",
    "-b:v", "2000k",
    "-preset", "fast",
    "-c:a", "aac",
    "-b:a", "128k",
    "-y",  # Overwrite output
    str(OUTPUT_FILE)
]

print("Running FFmpeg compression...\n")
result = subprocess.run(cmd, capture_output=False)

if result.returncode == 0:
    output_size = OUTPUT_FILE.stat().st_size / (1024**2)
    reduction = ((original_size - output_size) / original_size) * 100
    print(f"\n✓ Compression successful!")
    print(f"  Original: {original_size:.2f}MB")
    print(f"  Optimized: {output_size:.2f}MB")
    print(f"  Reduction: {reduction:.1f}%")
else:
    print("\n❌ Compression failed")
    exit(1)

print("\n" + "="*60 + "\n")
