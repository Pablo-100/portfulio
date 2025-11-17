const fs = require('fs');
const path = require('path');

// Usage: node scripts/import-project-images.js "C:/path/to/your/external/projects" (windows)
// or: npm run import-images -- "C:\Users\...\public\projects"

const srcArg = process.argv[2];
const srcDir = srcArg ? path.resolve(srcArg) : path.resolve(process.cwd(), 'c:/Users/21626/Desktop/pic/portfolio/public/projects');
const destRoot = path.resolve(process.cwd(), 'src/assets/images/projects');

if (!fs.existsSync(srcDir)) {
  console.error('Source directory not found:', srcDir);
  process.exit(1);
}

if (!fs.existsSync(destRoot)) {
  fs.mkdirSync(destRoot, { recursive: true });
}

const imageExts = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg'];

const files = fs.readdirSync(srcDir).filter(f => imageExts.includes(path.extname(f).toLowerCase()));

if (!files.length) {
  console.log('No images found in', srcDir);
  process.exit(0);
}

console.log(`Found ${files.length} image(s).`);

files.forEach(file => {
  const name = path.basename(file, path.extname(file));

  // copy image as single fallback to /images/projects/<name>.<ext>
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destRoot, file); // keep extension

  fs.copyFileSync(srcFile, destFile);
  console.log(`Copied ${file} -> ${path.relative(process.cwd(), destFile)}`);
});

console.log('\nDone. Next steps:');
console.log("- If projects in src/app/consts/projects.js use the same 'id' as the filename, they will now pick up the image automatically (fallback single image: /images/projects/<id>.<ext>).\n- Otherwise you can create a subfolder and gallery, or add an 'images' array to the project entry in src/app/consts/projects.js.");

process.exit(0);
