const sharp = require("sharp");
const path = require("path");

const src =
  "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/services/mobile/services-mobile-full.png";
const outMask =
  "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/services/mobile/yellow-mask.png";
const outYellowOnly =
  "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/services/mobile/yellow-shape.png";

(async () => {
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  // Yellow region = top ~39%; yellow pixels only
  const cutH = Math.round(h * 0.4);
  const mask = Buffer.alloc(w * cutH * 4);

  for (let y = 0; y < cutH; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const o = (y * w + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // bright yellow / gold
      const isYellow =
        r > 200 && g > 160 && b < 120 && r - b > 80 && g - b > 60;
      mask[o] = 252;
      mask[o + 1] = 224;
      mask[o + 2] = 1;
      mask[o + 3] = isYellow ? 255 : 0;
    }
  }

  await sharp(mask, { raw: { width: w, height: cutH, channels: 4 } })
    .png()
    .toFile(outYellowOnly);

  // Pure alpha mask (white = yellow shape)
  const alphaOnly = Buffer.alloc(w * cutH * 4);
  for (let i = 0; i < mask.length; i += 4) {
    const a = mask[i + 3];
    alphaOnly[i] = 255;
    alphaOnly[i + 1] = 255;
    alphaOnly[i + 2] = 255;
    alphaOnly[i + 3] = a;
  }
  await sharp(alphaOnly, { raw: { width: w, height: cutH, channels: 4 } })
    .png()
    .toFile(outMask);

  console.log("wrote yellow shape", w, cutH);
})();
