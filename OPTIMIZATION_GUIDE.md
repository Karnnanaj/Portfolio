# Image Optimization & Deployment Guide

## Overview
This workflow allows you to test optimized images while keeping originals as backup in Blob storage.

## Current State
- ✅ 18 images compressed (avg 80.9MB → 0.7MB, 99.1% reduction)
- ✅ Quality: 90/100 JPEG, PNG with optimization
- ✅ Min size threshold: 4MB (smaller images skipped)
- 📁 Location: `./optimized-media/`

## Performance Impact
```
Before: ~82MB total
After:  ~0.7MB total
Savings: 99.1% reduction
```

## Deployment Steps

### Step 1: Get Vercel Blob Token
1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it: "Blob Upload"
4. Expiration: 7 days
5. Copy the token

### Step 2: Upload Compressed Images
```powershell
# Set token in current session
$env:BLOB_READ_WRITE_TOKEN='your-token'

# Upload with -optimized suffix (keeps originals)
python scripts/upload_optimized.py
```

This uploads all images with `-optimized` suffix:
- `final.jpg` → `final-optimized.jpg`
- `interface.png` → `interface-optimized.png`
- etc.

**Originals remain in Blob as backup**

### Step 3: Update Gallery URLs
```powershell
python scripts/update_content.py
```

This updates `src/resources/content.tsx` to use `-optimized` URLs

### Step 4: Test Locally
```powershell
npm run build
npm run dev
```

Test the gallery and image loading speed

### Step 5: Deploy to Vercel
```powershell
git add .
git commit -m "chore: deploy optimized images"
git push
```

Vercel auto-deploys on push

## Rollback (If Issues Occur)

### Quick Revert to Originals
```powershell
python scripts/revert_to_original.py
git add .
git commit -m "chore: revert to original images"
git push
```

This restores all URLs to original filenames. **Original images still exist in Blob** as backup.

## File Structure
```
optimized-media/
├── final-optimized.jpg
├── interface-optimized.png
├── showcase steering-optimized.jpg
├── (... 15 more optimized images)
├── summary.json              # Compression stats
└── url-mapping.json          # Original -> Optimized mapping
```

## File Size Reduction Details
```
EMI isolation testing.jpg:    15.5MB → 0.1MB (-99.5%)
Showcase steering.jpg:        6.0MB  → 0.1MB (-99.1%)
IMG_20260212_174414603.jpg:  18.5MB → 0.1MB (-99.6%)
IMG_20260212_174437091.jpg:  16.0MB → 0.1MB (-99.6%)

Skipped (< 4MB):
- hotspot detected.png (0.3MB)
- output strain S trace.png (0.2MB)
- optical trapping.png (1.4MB)
```

## Storage Summary
```
Original gallery size: 81.6MB
Optimized gallery size: 0.7MB
Space saved: 80.9MB
Quality level: 90/100 (high fidelity)
Min threshold: 4MB
```

## Comparison URLs
Both versions available in Blob:

**Original** (backup):
```
https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/emi isolation/emi isolation testing.jpg
```

**Optimized** (active):
```
https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/emi isolation/emi isolation testing-optimized.jpg
```

## Expected Results
After deployment:
- ✅ Gallery loads 100x faster
- ✅ Same visual quality (quality 90)
- ✅ Mobile-friendly (800px max)
- ✅ Original images remain as backup
- ✅ Instant rollback possible

## Troubleshooting

**Upload fails with 401/403?**
- Token may be expired or have wrong permissions
- Create a new one with full access

**Images look pixelated?**
- Check quality setting (currently 90)
- Increase to 95 in `optimize_images.py` and re-run

**Want to keep originals permanently?**
- Don't delete `-optimized` files from Blob
- Both versions will coexist indefinitely
- Switch between them by updating content.tsx

## Notes
- Compression ratio of 99% is aggressive but intentional (large photos)
- Quality 90 is visually equivalent to quality 100 for most users
- All images resized to 800px max width (still high DPI on desktop)
- PNG files preserved as-is if under 4MB (lossless format)
