#!/usr/bin/env python3
"""
Media Optimization Script
Batch download and optimize images/videos from Vercel Blob storage
- Images: Resize to 800px, compress to quality 75
- Videos: Re-encode to 2 Mbps H.264
"""

import os
import sys
import subprocess
from pathlib import Path
import urllib.request
import urllib.parse
import shutil
from PIL import Image
import json

# Gallery URLs
GALLERY_URLS = [
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/cloud chamber/Americium test.mp4",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/cloud chamber/cooling test.mp4",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/cloud chamber/operation(electron flood).mp4",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/cloud chamber/VID_20250124_141833022.mp4",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/humidity and temp logger/final.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/humidity and temp logger/interface.png",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/humidity and temp logger/internals.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/emi isolation/emi isolation testing.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/emi isolation/outputgraph.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/emi isolation/testsetup.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/fiber optic link/videofeed.jpg",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/fiber optic link/videofeedviafiber.mp4",
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
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/optical trapping/optical trapping.mp4",
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/optical trapping/optical trapping.png",
]

VIDEO_EXTENSIONS = {".mp4", ".mov", ".avi", ".mkv"}
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}


def check_ffmpeg():
    """Check if FFmpeg is installed"""
    try:
        subprocess.run(["ffmpeg", "-version"], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False


def download_file(url, output_path):
    """Download file from URL"""
    try:
        print(f"  Downloading...", end="", flush=True)
        # URL encode spaces and special characters in the path component
        parsed = urllib.parse.urlparse(url)
        # Encode each path segment separately to preserve /
        path_segments = [urllib.parse.quote(segment, safe='') for segment in parsed.path.split('/')]
        encoded_path = '/'.join(path_segments)
        # Reconstruct URL
        encoded_url = urllib.parse.urlunparse((
            parsed.scheme,
            parsed.netloc,
            encoded_path,
            parsed.params,
            parsed.query,
            parsed.fragment
        ))
        urllib.request.urlretrieve(encoded_url, output_path)
        print(" ✓", end="", flush=True)
        return True
    except Exception as e:
        print(f" ✗ Failed: {e}")
        return False


def optimize_image(input_path, output_path):
    """Optimize image: resize to 800px, quality 75"""
    try:
        print(f"  Compressing image (800px)...", end="", flush=True)
        img = Image.open(input_path)
        
        # Resize to max 800px width, maintaining aspect ratio
        max_width = 800
        ratio = max_width / img.width if img.width > max_width else 1
        
        if ratio < 1:
            new_size = (int(img.width * ratio), int(img.height * ratio))
            img = img.resize(new_size, Image.Resampling.LANCZOS)
        
        # Save with quality compression
        output_str = str(output_path).lower()
        format = "JPEG" if output_str.endswith((".jpg", ".jpeg")) else "PNG"
        img.save(output_path, format, quality=75, optimize=True)
        print(" ✓", end="", flush=True)
        return True
    except Exception as e:
        print(f" ✗ Failed: {e}")
        return False


def optimize_video(input_path, output_path):
    """Optimize video: re-encode to 2Mbps H.264"""
    try:
        print(f"  Compressing video (2Mbps)...", end="", flush=True)
        cmd = [
            "ffmpeg",
            "-i", input_path,
            "-c:v", "libx264",
            "-b:v", "2000k",
            "-maxrate", "2500k",
            "-bufsize", "5000k",
            "-c:a", "aac",
            "-b:a", "128k",
            "-preset", "fast",
            "-y",
            output_path,
        ]
        subprocess.run(cmd, capture_output=True, check=True)
        print(" ✓", end="", flush=True)
        return True
    except Exception as e:
        print(f" ✗ Failed: {e}")
        return False


def get_file_size_mb(path):
    """Get file size in MB"""
    return os.path.getsize(path) / (1024 * 1024)


def main():
    output_dir = Path(__file__).parent.parent / "optimized-media"
    output_dir.mkdir(exist_ok=True)
    
    print("\n" + "=" * 60)
    print("Media Optimization Script")
    print("=" * 60)
    
    # Check FFmpeg for videos
    has_ffmpeg = check_ffmpeg()
    if not has_ffmpeg:
        print("\n⚠️  FFmpeg not found. Install with: pip install ffmpeg-python")
        print("   (or use: winget install ffmpeg)")
        print("   Videos will be skipped.")
    
    success_count = 0
    fail_count = 0
    results = []
    
    for idx, url in enumerate(GALLERY_URLS, 1):
        filename = url.split("/")[-1]
        file_ext = Path(filename).suffix.lower()
        output_path = output_dir / filename
        temp_path = output_dir / f"{filename}.tmp"
        
        print(f"\n[{idx}/{len(GALLERY_URLS)}] {filename}")
        
        # Download
        if not download_file(url, temp_path):
            fail_count += 1
            continue
        
        orig_size = get_file_size_mb(temp_path)
        
        # Optimize based on type
        if file_ext in VIDEO_EXTENSIONS:
            if not has_ffmpeg:
                print(f"  Skipping (FFmpeg required)")
                fail_count += 1
                temp_path.unlink(missing_ok=True)
                continue
            
            success = optimize_video(temp_path, output_path)
        elif file_ext in IMAGE_EXTENSIONS:
            success = optimize_image(temp_path, output_path)
        else:
            print(f"  Unknown format")
            success = False
        
        # Cleanup and report
        temp_path.unlink(missing_ok=True)
        
        if success:
            new_size = get_file_size_mb(output_path)
            reduction = ((orig_size - new_size) / orig_size) * 100
            print(f" ({orig_size:.1f}MB → {new_size:.1f}MB, -{reduction:.1f}%)")
            results.append({"file": filename, "orig_mb": round(orig_size, 2), "new_mb": round(new_size, 2), "reduction_percent": round(reduction, 1)})
            success_count += 1
        else:
            fail_count += 1
    
    # Summary
    print("\n" + "=" * 60)
    print(f"Summary: {success_count} succeeded, {fail_count} failed")
    print(f"Output: {output_dir.absolute()}")
    print("=" * 60)
    
    # Totals
    if results:
        total_orig = sum(r["orig_mb"] for r in results)
        total_new = sum(r["new_mb"] for r in results)
        total_saved = total_orig - total_new
        overall_reduction = (total_saved / total_orig) * 100 if total_orig > 0 else 0
        
        print(f"\nTotal original: {total_orig:.1f}MB")
        print(f"Total optimized: {total_new:.1f}MB")
        print(f"Space saved: {total_saved:.1f}MB ({overall_reduction:.1f}%)")
        
        # Save results to JSON
        results_file = output_dir / "optimization-summary.json"
        with open(results_file, "w") as f:
            json.dump({
                "total_orig_mb": round(total_orig, 2),
                "total_new_mb": round(total_new, 2),
                "total_saved_mb": round(total_saved, 2),
                "overall_reduction_percent": round(overall_reduction, 1),
                "files": results,
            }, f, indent=2)
        print(f"\nDetailed results: {results_file}")
    
    print("\n✓ Next step: Upload optimized files to Vercel Blob")
    print("  See upload-optimized-media.md for instructions")
    print()


if __name__ == "__main__":
    main()
