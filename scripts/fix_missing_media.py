#!/usr/bin/env python3
"""
Fix missing media: rename files to match content.tsx expectations,
find and copy missing videos
"""

import os
import shutil
from pathlib import Path

OPTIMIZED_DIR = Path(__file__).parent.parent / "optimized-media"
PUBLIC_IMAGES_DIR = Path(__file__).parent.parent / "public" / "images"

print("\n" + "="*60)
print("Fix Missing/Misnamed Media Files")
print("="*60)

# Mapping: what content.tsx expects → what files to use
fixes = {
    "/images/final-optimized.jpg": ("final.jpg", "final-optimized.jpg"),
    "/images/interface-optimized.png": ("interface.png", "interface-optimized.png"),
    "/images/internals-optimized.jpg": ("internals.jpg", "internals-optimized.jpg"),
    "/images/emi isolation testing-optimized.jpg": ("emi isolation testing.jpg", "emi isolation testing-optimized.jpg"),
    "/images/outputgraph-optimized.jpg": ("outputgraph.jpg", "outputgraph-optimized.jpg"),
    "/images/testsetup-optimized.jpg": ("testsetup.jpg", "testsetup-optimized.jpg"),
    "/images/videofeed-optimized.jpg": ("videofeed.jpg", "videofeed-optimized.jpg"),
    "/images/pedalsandsteeringwheel-optimized.jpg": ("pedalsandsteeringwheel.jpg", "pedalsandsteeringwheel-optimized.jpg"),
    "/images/showcase steering-optimized.jpg": ("showcase steering.jpg", "showcase steering-optimized.jpg"),
    "/images/uncomplete steering system-optimized.jpg": ("uncomplete steering system.jpg", "uncomplete steering system-optimized.jpg"),
    "/images/uncomplete pedal system-optimized.jpg": ("uncomplete pedal system.jpg", "uncomplete pedal system-optimized.jpg"),
    "/images/hotspot detected-optimized.png": ("hotspot detected.png", "hotspot detected-optimized.png"),
    "/images/IMG_20260212_174414603-optimized.jpg": ("IMG_20260212_174414603.jpg", "IMG_20260212_174414603-optimized.jpg"),
    "/images/IMG_20260212_174437091-optimized.jpg": ("IMG_20260212_174437091.jpg", "IMG_20260212_174437091-optimized.jpg"),
    "/images/output strain S trace-optimized.png": ("output strain S trace.png", "output strain S trace-optimized.png"),
    "/images/closeup setup-optimized.jpg": ("closeup setup.jpg", "closeup setup-optimized.jpg"),
    "/images/Spi communication development setup-optimized.jpg": ("Spi communication development setup.jpg", "Spi communication development setup-optimized.jpg"),
    "/images/optical trapping-optimized.png": ("optical trapping.png", "optical trapping-optimized.png"),
}

print("\n[1] Checking and fixing image files")
for target_path, (original_name, optimized_name) in fixes.items():
    target_file = target_path.replace("/images/", "")
    source_file = PUBLIC_IMAGES_DIR / original_name
    dest_file = PUBLIC_IMAGES_DIR / target_file
    
    # If target doesn't exist but source does, copy it
    if not dest_file.exists() and source_file.exists():
        shutil.copy2(source_file, dest_file)
        print(f"  ✓ {original_name} → {target_file}")

print("\n[2] Looking for missing video files")
missing_videos = [
    ("videofeedviafiber.mp4", "videofeedviafiber.mp4"),
    ("optical trapping.mp4", "optical trapping.mp4"),
]

for video_file, target_name in missing_videos:
    source = OPTIMIZED_DIR / video_file
    dest = PUBLIC_IMAGES_DIR / target_name
    
    if not dest.exists():
        if source.exists():
            shutil.copy2(source, dest)
            print(f"  ✓ Found {video_file}")
        else:
            print(f"  ❌ Missing {video_file} (not in optimized-media/)")

print("\n" + "="*60)
print("✓ Media files fixed")
print("="*60 + "\n")
