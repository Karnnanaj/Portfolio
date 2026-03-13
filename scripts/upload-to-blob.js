import { put } from "@vercel/blob";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

// Load .env.local
config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, "../public/images");

async function uploadFilesToBlob() {
  console.log("Starting media upload to Vercel Blob...");
  
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("❌ Error: BLOB_READ_WRITE_TOKEN not found in environment variables");
    console.error("Add BLOB_READ_WRITE_TOKEN to .env.local");
    process.exit(1);
  }

  // Set as env var that Vercel Blob expects
  process.env.VERCEL_BLOB_WRITE_TOKEN = token;

  const files = getFilesRecursive(imagesDir);
  const urls = {};
  let successCount = 0;
  let failCount = 0;

  console.log(`Found ${files.length} files to upload\n`);

  for (const file of files) {
    const relativePath = path.relative(imagesDir, file);
    const blobPath = `portfolio/${relativePath}`.replace(/\\/g, "/");
    
    try {
      const fileData = fs.readFileSync(file);
      const result = await put(blobPath, fileData, {
        access: 'public',
        allowOverwrite: true,
      });
      urls[relativePath.replace(/\\/g, "/")] = result.url;
      console.log(`✓ ${relativePath}`);
      successCount++;
    } catch (error) {
      console.error(`✗ ${relativePath}: ${error.message}`);
      failCount++;
    }
  }

  // Save mapping for reference
  fs.writeFileSync(
    path.join(__dirname, "../blob-urls.json"),
    JSON.stringify(urls, null, 2)
  );

  console.log(`\n✓ Upload complete! ${successCount} succeeded, ${failCount} failed`);
  console.log("URLs saved to: blob-urls.json");
  
  if (failCount > 0) {
    process.exit(1);
  }
}

function getFilesRecursive(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getFilesRecursive(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  
  return files;
}

uploadFilesToBlob().catch((error) => {
  console.error("Upload failed:", error.message);
  process.exit(1);
});
