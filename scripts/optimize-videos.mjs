#!/usr/bin/env node
/**
 * Video Optimization Script
 * Re-encodes MP4 to H.264 2Mbps for faster loading
 * Estimated: 19MB → 2-3MB per video
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const videoUrls = [
  { name: 'Americium test.mp4', file: 'cloud chamber/Americium test.mp4' },
  { name: 'cooling test.mp4', file: 'cloud chamber/cooling test.mp4' },
  { name: 'operation(electron flood).mp4', file: 'cloud chamber/operation(electron flood).mp4' },
  { name: 'VID_20250124_141833022.mp4', file: 'cloud chamber/VID_20250124_141833022.mp4' },
  { name: 'videofeedviafiber.mp4', file: 'fiber optic link/videofeedviafiber.mp4' },
  { name: 'optical trapping.mp4', file: 'optical trapping/optical trapping.mp4' },
];

const outputDir = path.join(process.cwd(), 'optimized-media');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

console.log('\n' + '='.repeat(60));
console.log('Video Optimization (H.264 2Mbps)');
console.log('='.repeat(60) + '\n');

let optimized = 0;
let failed = 0;

videoUrls.forEach((video, idx) => {
  const fullPath = path.join(outputDir, video.name);
  
  // Skip if already exists
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).size > 1000000) {
    console.log(`[${idx + 1}/${videoUrls.length}] ${video.name} (already optimized)`);
    return;
  }
  
  const tempFile = `${fullPath}.tmp`;
  const origFile = `${fullPath}.original`;
  
  process.stdout.write(`[${idx + 1}/${videoUrls.length}] ${video.name}... `);
  
  try {
    // Download original if needed
    if (!fs.existsSync(origFile)) {
      const blobUrl = `https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/${video.file}`;
      execSync(`curl -L -o "${origFile}" "${blobUrl}"`, { stdio: 'pipe' });
    }
    
    const origSize = fs.statSync(origFile).size / (1024 * 1024);
    
    // Skip if already small
    if (origSize < 2) {
      console.log(`(${origSize.toFixed(1)}MB - already small)`);
      fs.copyFileSync(origFile, fullPath);
      return;
    }
    
    // Re-encode to 2 Mbps
    execSync(`ffmpeg -i "${origFile}" -c:v libx264 -b:v 2000k -maxrate 2500k -bufsize 5000k -c:a aac -b:a 128k -preset fast -y "${tempFile}"`, { stdio: 'pipe' });
    
    const newSize = fs.statSync(tempFile).size / (1024 * 1024);
    const reduction = ((origSize - newSize) / origSize) * 100;
    
    fs.renameSync(tempFile, fullPath);
    console.log(`✓ (${origSize.toFixed(1)}MB → ${newSize.toFixed(1)}MB, -${reduction.toFixed(1)}%)`);
    optimized++;
  } catch (err) {
    console.log(`✗ ${err.message.substring(0, 40)}`);
    failed++;
  }
});

console.log('\n' + '='.repeat(60));
console.log(`Results: ${optimized} optimized, ${failed} failed`);
console.log('='.repeat(60) + '\n');

if (optimized > 0) {
  console.log('✓ Videos optimized and ready to upload');
  console.log('Next: node scripts/upload.mjs\n');
}
