import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'public/assets/images');
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(assetsDir)) {
  console.error(`Directory not found: ${assetsDir}`);
  process.exit(1);
}

/**
 * Optimizes the global Open Graph image (jpg) to < 200KB for social performance.
 */
async function optimizeOgImage() {
  const ogPath = path.join(publicDir, 'og-image.jpg');
  if (fs.existsSync(ogPath)) {
    const tempPath = path.join(publicDir, 'og-image-temp.jpg');
    try {
      await sharp(ogPath)
        .jpeg({ quality: 75, mozjpeg: true })
        .toFile(tempPath);
      
      const oldSize = fs.statSync(ogPath).size;
      const newSize = fs.statSync(tempPath).size;
      
      if (newSize < oldSize) {
        fs.renameSync(tempPath, ogPath);
        console.log(`Optimized og-image.jpg: ${(oldSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB`);
      } else {
        fs.unlinkSync(tempPath);
        console.log('og-image.jpg is already optimized.');
      }
    } catch (err) {
      console.error('Error optimizing og-image.jpg:', err);
    }
  }
}

/**
 * Generates a WebP version of the logo for UI performance.
 */
async function generateLogoWebp() {
  const logoPath = path.join(publicDir, 'logo.png');
  const logoWebpPath = path.join(publicDir, 'logo.webp');
  if (fs.existsSync(logoPath)) {
    try {
      await sharp(logoPath)
        .webp({ quality: 90 })
        .toFile(logoWebpPath);
      console.log('Generated logo.webp');
    } catch (err) {
      console.error('Error generating logo.webp:', err);
    }
  }
}

async function convertFiles() {
  const files = fs.readdirSync(assetsDir);
  const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));
  
  if (pngFiles.length === 0) {
    console.log('No PNG files found in assets directory.');
  } else {
    for (const file of pngFiles) {
      const inputPath = path.join(assetsDir, file);
      const outputPath = path.join(assetsDir, file.replace(/\.png$/i, '.webp'));
      
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Converted ${file} to WebP`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
        throw err;
      }
    }
  }

  await optimizeOgImage();
  await generateLogoWebp();
}

convertFiles().catch(err => {
  console.error('Fatal error during production asset optimization:', err);
  process.exitCode = 1;
});
