#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Batch download and optimize media from Vercel Blob storage
    
.DESCRIPTION
    Downloads all gallery media files, compresses them, and prepares for re-upload
    - Images: Resize to 800px width, quality 75
    - Videos: Re-encode to 2 Mbps H.264
#>

param(
    [string]$OutputPath = "$PSScriptRoot\..\optimized-media"
)

$ErrorActionPreference = "Stop"

# Gallery URLs from content.tsx
$galleryUrls = @(
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
    "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/optical trapping/optical trapping.png"
)

# Create output directory
if (-not (Test-Path $OutputPath)) {
    New-Item -ItemType Directory -Path $OutputPath | Out-Null
    Write-Host "Created output directory: $OutputPath" -ForegroundColor Green
}

# Check for required tools
Write-Host "Checking for required tools..." -ForegroundColor Cyan
$ffmpegPath = (Get-Command ffmpeg -ErrorAction SilentlyContinue).Source
$magickPath = (Get-Command magick -ErrorAction SilentlyContinue).Source

if (-not $ffmpegPath) {
    Write-Host "ERROR: FFmpeg not found. Install with: choco install ffmpeg" -ForegroundColor Red
    exit 1
}

Write-Host "✓ FFmpeg found: $ffmpegPath" -ForegroundColor Green

# Download and optimize each file
$successCount = 0
$failureCount = 0

foreach ($url in $galleryUrls) {
    $fileName = Split-Path $url -Leaf
    $fileExt = [System.IO.Path]::GetExtension($fileName).ToLower()
    $outputFile = Join-Path $OutputPath $fileName
    $tempFile = "$outputFile.tmp"
    
    try {
        Write-Host "Processing: $fileName" -ForegroundColor Yellow
        
        # Download file
        Write-Host "  Downloading..." -NoNewline
        Invoke-WebRequest -Uri $url -OutFile $tempFile -ErrorAction Stop
        Write-Host " ✓" -ForegroundColor Green
        
        # Process based on file type
        if ($fileExt -in @".mp4", ".mov", ".avi") {
            # Video optimization: 2 Mbps H.264, AAC audio
            Write-Host "  Compressing video (2 Mbps)..." -NoNewline
            & ffmpeg -i $tempFile -c:v libx264 -b:v 2000k -maxrate 2500k -bufsize 5000k -c:a aac -b:a 128k -preset fast -y $outputFile 2>&1 | Out-Null
            
            $origSize = (Get-Item $tempFile).Length / 1MB
            $newSize = (Get-Item $outputFile).Length / 1MB
            $reduction = [math]::Round((1 - $newSize / $origSize) * 100, 1)
            Write-Host " ✓ ($origSize MB → $newSize MB, -$reduction%)" -ForegroundColor Green
        }
        else {
            # Image optimization: max 800px width, quality 75
            Write-Host "  Compressing image (800px)..." -NoNewline
            if ($magickPath) {
                & magick $tempFile -resize "800x>" -quality 75 $outputFile 2>&1 | Out-Null
            }
            else {
                & ffmpeg -i $tempFile -vf "scale=800:-1" $outputFile 2>&1 | Out-Null
            }
            
            $origSize = (Get-Item $tempFile).Length / 1MB
            $newSize = (Get-Item $outputFile).Length / 1MB
            $reduction = [math]::Round((1 - $newSize / $origSize) * 100, 1)
            Write-Host " ✓ ($origSize MB → $newSize MB, -$reduction%)" -ForegroundColor Green
        }
        
        Remove-Item $tempFile -ErrorAction SilentlyContinue
        $successCount++
    }
    catch {
        Write-Host " ✗ FAILED: $_" -ForegroundColor Red
        Remove-Item $tempFile -ErrorAction SilentlyContinue
        $failureCount++
    }
}

# Summary
Write-Host "`n" + ("=" * 60) -ForegroundColor Cyan
Write-Host "Summary: $successCount succeeded, $failureCount failed" -ForegroundColor Cyan
Write-Host "Optimized files location: $OutputPath" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan

# Total size comparison
$totalOriginal = ($galleryUrls | ForEach-Object { 
    try { 
        $resp = Invoke-WebRequest -Uri $_ -Method Head
        $resp.Headers.'Content-Length' 
    } catch { 0 }
}) | Measure-Object -Sum | Select-Object -ExpandProperty Sum

$totalOptimized = (Get-ChildItem $OutputPath -File | Measure-Object -Property Length -Sum).Sum

Write-Host "Total original size: $([math]::Round($totalOriginal / 1MB, 1)) MB"
Write-Host "Total optimized size: $([math]::Round($totalOptimized / 1MB, 1)) MB"
Write-Host "Space saved: $([math]::Round(100 - ($totalOptimized / $totalOriginal) * 100, 1))%"
