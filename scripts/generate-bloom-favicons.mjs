import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

const bloomLogoPath = path.join(rootDir, "public", "bloom-craft-logo.png");
if (!fs.existsSync(bloomLogoPath)) {
  console.error("bloom-craft-logo.png does not exist at", bloomLogoPath);
  process.exit(1);
}

const logoBuf = fs.readFileSync(bloomLogoPath);

// 1. Copy to app/icon.png (Next.js automatically serves and detects this)
const appIconPath = path.join(rootDir, "app", "icon.png");
fs.writeFileSync(appIconPath, logoBuf);
console.log("✅ Created app/icon.png");

// 2. Copy to app/apple-icon.png
const appAppleIconPath = path.join(rootDir, "app", "apple-icon.png");
fs.writeFileSync(appAppleIconPath, logoBuf);
console.log("✅ Created app/apple-icon.png");

// 3. Copy to public/icon.png & public/apple-touch-icon.png
fs.writeFileSync(path.join(rootDir, "public", "icon.png"), logoBuf);
fs.writeFileSync(path.join(rootDir, "public", "apple-touch-icon.png"), logoBuf);
console.log("✅ Created public/icon.png & public/apple-touch-icon.png");

// 4. Generate valid ICO file containing PNG payload
function makeIco(pngBuffer) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type (1 = icon)
  header.writeUInt16LE(1, 4); // 1 image

  const entry = Buffer.alloc(16);
  entry.writeUInt8(0, 0); // width (0 = 256 or more)
  entry.writeUInt8(0, 1); // height (0 = 256 or more)
  entry.writeUInt8(0, 2); // color count
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // image size
  entry.writeUInt32LE(22, 12); // offset (6 + 16 = 22)

  return Buffer.concat([header, entry, pngBuffer]);
}

const icoBuf = makeIco(logoBuf);
const faviconPath = path.join(rootDir, "public", "favicon.ico");
fs.writeFileSync(faviconPath, icoBuf);
console.log(`✅ Replaced public/favicon.ico with Bloom Craft ICO (${icoBuf.length} bytes)`);

// 5. Remove any old alnaya-logo.png files in public
const alnayaPublic1 = path.join(rootDir, "public", "alnaya-logo.png");
if (fs.existsSync(alnayaPublic1)) {
  fs.unlinkSync(alnayaPublic1);
  console.log("✅ Removed public/alnaya-logo.png");
}

const alnayaPublic2 = path.join(rootDir, "public", "images", "alnaya-logo.png");
if (fs.existsSync(alnayaPublic2)) {
  fs.unlinkSync(alnayaPublic2);
  console.log("✅ Removed public/images/alnaya-logo.png");
}

console.log("\nAll Bloom Craft logos and favicons successfully updated!");
