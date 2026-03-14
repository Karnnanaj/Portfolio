#!/usr/bin/env python3
"""
Image Optimization Script
- Skip images already < 4MB
- Resize to 800px max
- Quality 90 (very high quality)
"""

import os
from pathlib import Path
from PIL import Image
import requests
import json

# Actual URLs from content.tsx (images and PNGs only)
GALLERY_URLS = [
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/humidity and temp logger/final.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/humidity and temp logger/interface.png",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/humidity and temp logger/internals.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/emi isolation/emi isolation testing.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/emi isolation/outputgraph.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/emi isolation/testsetup.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/fiber optic link/videofeed.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/sim racing/pedalsandsteeringwheel.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/sim racing/showcase steering.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/sim racing/uncomplete steering system.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/sim racing/uncomplete pedal system.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/pcb strain mapping/hotspot detected.png",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/pcb strain mapping/IMG_20260212_174414603.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/pcb strain mapping/IMG_20260212_174437091.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/pcb strain mapping/output strain S trace.png",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/spi communication/closeup setup.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/spi communication/Spi communication development setup.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/optical trapping/optical trapping.png",
]

output_dir = Path(__file__).parent.parent / "optimized-media"
output_dir.mkdir(exist_ok=True)

print("\n" + "=" * 60)
print("Image Optimization (Quality 85, Min 4MB)")
print("=" * 60)

results = []
skipped = 0

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
            print(f" ({orig_size:.1f}MB) - Skipping (already optimal)")
            output_path.write_bytes(resp.content)
            temp_file.unlink()
            skipped += 1
            continue
        
        print(f" ({orig_size:.1f}MB) → Compressing...", end="", flush=True)
        img = Image.open(temp_file)
        
        # Resize to 800px max, maintain aspect ratio
        if img.width > 800:
            ratio = 800 / img.width
            new_size = (800, int(img.height * ratio))
            img = img.resize(new_size, Image.Resampling.LANCZOS)
        
        # Save with quality 85 (high quality)
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
    
    print(f"Compressed: {total_orig:.1f}MB → {total_new:.1f}MB ({overall:.1f}%)")
    print(f"Space saved: {total_saved:.1f}MB")
    print(f"Skipped (< 4MB): {skipped} files")
    
    # Save summary
    with open(output_dir / "summary.json", "w") as f:
        json.dump({"total_orig_mb": round(total_orig, 2), "total_new_mb": round(total_new, 2), "reduction_percent": round(overall, 1), "files_compressed": len(results), "files_skipped": skipped, "files": results}, f, indent=2)

print(f"Output: {output_dir.absolute()}")
print("=" * 60 + "\n")
