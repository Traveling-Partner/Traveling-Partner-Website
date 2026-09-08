const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const src =
  "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/services/mobile/services-mobile-ref.png";
const destDir =
  "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/services/mobile";

fs.mkdirSync(destDir, { recursive: true });

(async () => {
  // Keep original screenshot intact for Taxi Stand (cream bg preserved)
  await sharp(src)
    .png()
    .toFile(path.join(destDir, "services-mobile-full.png"));

  const meta = await sharp(src).metadata();
  const w = meta.width;
  const h = meta.height;
  console.log("source", w, h);

  // Upscale original 6x with lanczos for sharper phone display (keeps cream)
  await sharp(src)
    .resize(w * 6, h * 6, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toFile(path.join(destDir, "services-mobile-full.png"));

  const m2 = await sharp(path.join(destDir, "services-mobile-full.png")).metadata();
  console.log("taxi composite", m2.width, m2.height, "cream preserved");
})();
