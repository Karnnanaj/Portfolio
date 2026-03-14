#!/usr/bin/env python3
"""
Simple Media Optimization Script
Downloads and optimizes images from Vercel Blob
"""

import os
from pathlib import Path
from PIL import Image
import requests
import json

GALLERY_URLS = [
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/cloud%20chamber/final.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/humidity%20and%20temp%20logger/final.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/humidity%20and%20temp%20logger/interface.png",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/humidity%20and%20temp%20logger/internals.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/emi%20isolation/emi%20isolation%20testing.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/emi%20isolation/outputgraph.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/emi%20isolation/testsetup.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/fiber%20optic%20link/videofeed.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/sim%20racing/pedalsandsteeringwheel.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/sim%20racing/showcase%20steering.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/sim%20racing/uncomplete%20steering%20system.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/sim%20racing/uncomplete%20pedal%20system.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/pcb%20strain%20mapping/hotspot%20detected.png",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/pcb%20strain%20mapping/IMG_20260212_174414603.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/pcb%20strain%20mapping/IMG_20260212_174437091.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/pcb%20strain%20mapping/output%20strain%20S%20trace.png",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/spi%20communication/closeup%20setup.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/spi%20communication/Spi%20communication%20development%20setup.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/optical%20trapping/optical%20trapping.png",
]

output_dir = Path(__file__).parent.parent / "optimized-media"
output_dir.mkdir(exist_ok=True)

print("\n" + "=" * 60)
print("Image Optimization (Blob CDN)")
print("=" * 60)

results = []
for idx, url in enumerate(GALLERY_URLS, 1):
    filename = url.split("/")[-1]
    output_path = output_dir / filename
    
    # Skip if already optimized
    if output_path.exists():
        print(f"\n[{idx}/{len(GALLERY_URLS)}] {filename} (already done)")
        continue
    
    print(f"\n[{idx}/{len(GALLERY_URLS)}] {filename}", end="")
    
    try:
        # Download
        resp = requests.get(url, timeout=30)
        resp.raise_for_status()
        
        temp_file = output_dir / f"{filename}.tmp"
        with open(temp_file, "wb") as f:
            f.write(resp.content)
        
        orig_size = temp_file.stat().st_size / (1024 * 1024)
        
        # Skip optimization if already under 4MB
        if orig_size < 4:
            print(f" ({orig_size:.1f}MB) - Skipping (already optimized)")
            output_path.write_bytes(resp.content)
            temp_file.unlink()
            continue
        
        print(f" ({orig_size:.1f}MB) → Compressing...", end="", flush=True)
        img = Image.open(temp_file)
        
        # Resize to 800px max, maintain aspect ratio
        if img.width > 800:
            ratio = 800 / img.width
            new_size = (800, int(img.height * ratio))
            img = img.resize(new_size, Image.Resampling.LANCZOS)
        
        # Save with higher quality (85) to avoid poor quality
        is_jpg = filename.lower().endswith((".jpg", ".jpeg"))
        img.save(output_path, "JPEG" if is_jpg else "PNG", quality=85, optimize=True)
        temp_file.unlink()
        
        new_size = output_path.stat().st_size / (1024 * 1024)
        reduction = ((orig_size - new_size) / orig_size) * 100
        print(f" ✓ ({new_size:.1f}MB, -{reduction:.1f}%)")
        
        results.append({"file": filename, "orig_mb": round(orig_size, 2), "new_mb": round(new_size, 2), "reduction": round(reduction, 1)})
        
    except Exception as e:
        print(f" ✗ {e}")

print("\n" + "=" * 60)
if results:
    total_orig = sum(r["orig_mb"] for r in results)
    total_new = sum(r["new_mb"] for r in results)
    total_saved = total_orig - total_new
    overall = (total_saved / total_orig) * 100 if total_orig > 0 else 0
    
    print(f"Total: {total_orig:.1f}MB → {total_new:.1f}MB ({overall:.1f}% compression)")
    print(f"Space saved: {total_saved:.1f}MB")
    
    # Save summary
    with open(output_dir / "summary.json", "w") as f:
        json.dump({"total_orig_mb": round(total_orig, 2), "total_new_mb": round(total_new, 2), "reduction_percent": round(overall, 1), "files": results}, f, indent=2)

print(f"Location: {output_dir.absolute()}")
print("=" * 60)
