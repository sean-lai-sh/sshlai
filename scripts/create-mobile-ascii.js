const fs = require('fs');
const path = require('path');

// Read the original essay_hero.json
const inputPath = path.join(__dirname, '../public/essay_hero.json');
const outputPath = path.join(__dirname, '../public/essay_hero_mobile.json');

const originalData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

console.log(`Original dimensions: ${originalData.width}x${originalData.height}`);

// Target dimensions: 120x81 (half width, half height minus 10 rows)
const targetWidth = 120;
const targetHeight = 81; // 91 - 10 = 81

const scaleX = originalData.width / targetWidth;
const scaleY = originalData.height / (targetHeight + 10); // Sample from 91 rows worth

const mobileData = {
  width: targetWidth,
  height: targetHeight,
  data: []
};

// Downsample the image
for (let y = 0; y < targetHeight; y++) {
  for (let x = 0; x < targetWidth; x++) {
    // Calculate source position
    const srcX = Math.floor(x * scaleX);
    const srcY = Math.floor(y * scaleY);

    // Get pixel from original data
    const srcIndex = srcY * originalData.width + srcX;
    const pixel = originalData.data[srcIndex];

    mobileData.data.push({
      c: pixel.c,
      h: pixel.h
    });
  }
}

// Write the mobile version
fs.writeFileSync(outputPath, JSON.stringify(mobileData, null, 2));

console.log(`Mobile version created: ${targetWidth}x${targetHeight}`);
console.log(`Original size: ${JSON.stringify(originalData).length} bytes`);
console.log(`Mobile size: ${JSON.stringify(mobileData).length} bytes`);
console.log(`Reduction: ${Math.round((1 - JSON.stringify(mobileData).length / JSON.stringify(originalData).length) * 100)}%`);
