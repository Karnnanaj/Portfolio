#!/usr/bin/env node
/**
 * Upload Optimized Images to Vercel Blob
 * Uses @vercel/blob SDK for proper authentication and upload
 */

import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error('ERROR: BLOB_READ_WRITE_TOKEN environment variable not set');
  process.exit(1);
}

const optimizedDir = path.join(process.cwd(), 'optimized-media');
const files = fs
  .readdirSync(optimizedDir)
  .filter(f => ['.jpg', '.png'].includes(path.extname(f).toLowerCase()) && !f.includes('summary') && !f.includes('.tmp'));

console.log('\n' + '='.repeat(60));
console.log('Upload Optimized Images to Vercel Blob');
console.log('='.repeat(60) + '\n');

let uploaded = 0;
let failed = 0;

(async () => {
  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const filepath = path.join(optimizedDir, filename);
    const fileSize = (fs.statSync(filepath).size / (1024 * 1024)).toFixed(2);
    
    // Create -optimized filename
    const ext = path.extname(filename);
    const name = path.basename(filename, ext);
    const optimizedName = `${name}-optimized${ext}`;
    const blobPath = `portfolio/${optimizedName}`;
    
    process.stdout.write(`[${i + 1}/${files.length}] ${filename} → ${optimizedName} (${fileSize}MB)... `);
    
    try {
      const fileBuffer = fs.readFileSync(filepath);
      
      const result = await put(blobPath, fileBuffer, {
        access: 'public',
        token: token,
      });
      
      console.log('✓');
      uploaded++;
    } catch (error) {
      console.log(`✗ ${error.message.substring(0, 50)}`);
      failed++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`Results: ${uploaded} uploaded, ${failed} failed`);
  console.log('='.repeat(60) + '\n');
  
  if (uploaded > 0) {
    console.log('✓ Images uploaded to Blob!');
    console.log('\nNext: Run: npm run build && npm run deploy\n');
  } else {
    console.log('✗ Upload failed - check token and permissions\n');
    process.exit(1);
  }
})().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
