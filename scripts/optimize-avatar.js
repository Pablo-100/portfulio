const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const src = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(process.cwd(), 'src/assets/images/about-me.png');
const destWebp = path.resolve(process.cwd(), 'src/assets/images/about-me.webp');
const destPng = path.resolve(process.cwd(), 'src/assets/images/about-me.png');

if (!fs.existsSync(src)) {
  console.error('Source about-me image not found:', src);
  process.exit(1);
}

(async () => {
  try {
    await sharp(src)
      .resize(1000, 800, { fit: 'cover', position: 'centre' })
      .sharpen(1.2)
      .modulate({ brightness: 1.18, saturation: 1.15, contrast: 1.06 })
      .webp({ quality: 88 })
      .toFile(destWebp);

    // make a small fallback png as well
    await sharp(src)
      .resize(800, 640, { fit: 'cover', position: 'centre' })
      .sharpen(1.1)
      .modulate({ brightness: 1.12, saturation: 1.12, contrast: 1.04 })
      .png({ quality: 90 })
      .toFile(destPng);

    console.log('Avatar optimized:');
    console.log(' - ' + path.relative(process.cwd(), destWebp));
    console.log(' - ' + path.relative(process.cwd(), destPng));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
