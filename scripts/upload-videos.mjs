#!/usr/bin/env node
/**
 * Upload Optimized Videos to Vercel Blob
 */

import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error('ERROR: BLOB_READ_WRITE_TOKEN not set');
  process.exit(1);
}

const optimizedDir = path.join(process.cwd(), 'optimized-media');
const mappingFile = path.join(optimizedDir, 'video-mapping.json');

if (!fs.existsSync(mappingFile)) {
  console.error('ERROR: video-mapping.json not found - run compress_videos.py first');
  process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf-8'));

console.log('\n' + '='.repeat(60));
console.log('Upload Optimized Videos to Blob');
console.log('='.repeat(60) + '\n');

let uploaded = 0;
let failed = 0;

(async () => {
  const videos = Object.entries(mapping);
  
  for (let i = 0; i < videos.length; i++) {
    const [original, optimized] = videos[i];
    const filepath = path.join(optimizedDir, optimized);
    
    if (!fs.existsSync(filepath)) {
      console.log(`[${i + 1}/${videos.length}] ${original} → MISSING LOCAL FILE`);
      failed++;
      continue;
    }
    
    const fileSize = (fs.statSync(filepath).size / (1024 * 1024)).toFixed(2);
    
    process.stdout.write(`[${i + 1}/${videos.length}] ${original} (${fileSize}MB)... `);
    
    try {
      const fileBuffer = fs.readFileSync(filepath);
      
      // Determine path from original name
      let blobPath = 'portfolio/';
      if (original.includes('test.mp4') || original.includes('cooling') || original.includes('electron')) {
        blobPath += `cloud chamber/${optimized}`;
      } else if (original.includes('VID_')) {
        blobPath += `cloud chamber/${optimized}`;
      } else if (original.includes('fiber')) {
        blobPath += `fiber optic link/${optimized}`;
      } else if (original.includes('optical')) {
        blobPath += `optical trapping/${optimized}`;
      } else {
        blobPath += optimized;
      }
      
      const result = await put(blobPath, fileBuffer, {
        access: 'public',
        token: token,
      });
      
      console.log('✓');
      uploaded++;
    } catch (error) {
      console.log(`✗ ${error.message.substring(0, 40)}`);
      failed++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`Results: ${uploaded} uploaded, ${failed} failed`);
  console.log('='.repeat(60) + '\n');
  
  if (uploaded > 0) {
    console.log('✓ Videos uploaded!');
    console.log('Next: Update content.tsx video URLs\n');
  }
})().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
