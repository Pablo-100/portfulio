const fs = require('fs');
const path = require('path');

const projectsJsPath = path.resolve(process.cwd(), 'src/app/consts/projects.js');
const imagesRoot = path.resolve(process.cwd(), 'src/assets/images/projects');

if (!fs.existsSync(projectsJsPath)) {
  console.error('projects.js not found:', projectsJsPath);
  process.exit(1);
}

if (!fs.existsSync(imagesRoot)) {
  console.error('images folder not found:', imagesRoot);
  process.exit(1);
}

const imageExts = new Set(['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg']);

const projectsContent = fs.readFileSync(projectsJsPath, 'utf8');

// list of project ids from src/app/consts/projects.js — we'll extract them with a regex to avoid parsing full JS
const idRegex = /id:\s*["']([A-Za-z0-9_\-]+)["']/g;
let match;
const projectIds = [];
while ((match = idRegex.exec(projectsContent)) !== null) {
  projectIds.push(match[1]);
}

if (!projectIds.length) {
  console.log('No project ids found in projects.js');
  process.exit(0);
}

console.log(`Found ${projectIds.length} projects in projects.js`);

// Build mapping: id -> images (relative names)
const mapping = {};

projectIds.forEach((id) => {
  const idFolder = path.join(imagesRoot, id);
  const files = [];

  if (fs.existsSync(idFolder) && fs.lstatSync(idFolder).isDirectory()) {
    fs.readdirSync(idFolder).forEach((f) => {
      if (imageExts.has(path.extname(f).toLowerCase())) files.push(f);
    });
  }

  // fallback: single image in root named <id>.<ext>
  if (!files.length) {
    const fallback = fs.readdirSync(imagesRoot).find((f) => {
      const name = path.basename(f, path.extname(f));
      return name === id && imageExts.has(path.extname(f).toLowerCase());
    });

    if (fallback) files.push(fallback);
  }

  if (files.length) mapping[id] = files;
});

if (!Object.keys(mapping).length) {
  console.log('No mapping found; no images were detected for projects');
  process.exit(0);
}

console.log('Mapping found for projects: ', Object.keys(mapping).join(', '));

// Modify projects.js: for each project with mapping add `images: ["a.web ..."]` if not present
let updated = projectsContent;

function findObjectRange(content, index) {
  // starting from index of the id key, find the curly braces around the object
  let start = content.lastIndexOf('{', index);
  if (start === -1) return null;

  let depth = 0;
  for (let i = start; i < content.length; i++) {
    if (content[i] === '{') depth++;
    if (content[i] === '}') {
      depth--;
      if (depth === 0) return { start, end: i };
    }
  }
  return null;
}

Object.entries(mapping).forEach(([id, images]) => {
  const regex = new RegExp(`id:\\s*['\"]${id}['\"]`);
  const res = regex.exec(updated);
  if (!res) {
    // shouldn't happen — we already extracted ids
    return;
  }

  const idIndex = res.index;
  const range = findObjectRange(updated, idIndex);
  if (!range) return;

  const objectText = updated.slice(range.start, range.end + 1);

  // if images key exists — skip
  if (/\bimages\s*:\s*\[/.test(objectText)) {
    console.log(`Project ${id} already has images array — skipping`);
    return;
  }

  // place images just before closing brace — keep format similar to existing file
  const prettyImages = images.map(img => `"${img}"`).join(', ');
  const insertion = `\n        images: [${prettyImages}],`;

  // insert right before the closing brace of the object
  const closingMatch = objectText.match(/\n(\s*)\}/);
  if (!closingMatch) return;

  const indent = closingMatch[1] || '    ';
  // ensure the last property before the closing brace ends with a comma
  const beforeClosing = objectText.slice(0, closingMatch.index);
  const trimmed = beforeClosing.replace(/\s+$/s, '');
  const lastChar = trimmed.charAt(trimmed.length - 1);
  const prefixed = lastChar === ',' ? beforeClosing : `${beforeClosing},`;

  const newObjectText = prefixed + insertion + `\n${indent}}`;

  updated = updated.slice(0, range.start) + newObjectText + updated.slice(range.end + 1);
  console.log(`Inserted images for ${id}: ${images.join(', ')}`);
});

if (updated !== projectsContent) {
  // backup original file
  fs.writeFileSync(projectsJsPath + '.bak', projectsContent, 'utf8');
  fs.writeFileSync(projectsJsPath, updated, 'utf8');
  console.log('projects.js updated, backup saved as projects.js.bak');
} else {
  console.log('No changes required');
}

process.exit(0);
