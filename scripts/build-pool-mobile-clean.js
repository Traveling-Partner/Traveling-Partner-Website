const sharp = require("sharp");

const src =
  "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/services/mobile/services-mobile-full.png";
const outFull =
  "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/services/mobile/services-mobile-pool.png";
const poolIcon =
  "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/services/icon-pool.png";

function dilate(src, W, H, r) {
  const o = Buffer.alloc(src.length);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let v = 0;
      for (let dy = -r; dy <= r && !v; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < W && ny < H && src[ny * W + nx]) v = 1;
        }
      }
      o[y * W + x] = v;
    }
  }
  return o;
}

function erode(src, W, H, r) {
  const o = Buffer.alloc(src.length);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let v = 1;
      for (let dy = -r; dy <= r && v; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H || !src[ny * W + nx]) v = 0;
        }
      }
      o[y * W + x] = v;
    }
  }
  return o;
}

(async () => {
  const meta = await sharp(src).metadata();
  const W = meta.width;
  const H = meta.height;
  const cutH = Math.round(H * 0.42);

  const { data } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const yellowOnly = Buffer.alloc(W * cutH);
  for (let y = 0; y < cutH; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      yellowOnly[y * W + x] =
        r > 175 && g > 135 && b < 155 && r - b > 45 && g - b > 25 ? 1 : 0;
    }
  }

  // Grow then close — solid shield interior
  let mask = dilate(yellowOnly, W, cutH, 22);
  mask = erode(dilate(mask, W, cutH, 10), W, cutH, 6);

  // BBox of mask
  let minX = W;
  let minY = cutH;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < cutH; y++) {
    for (let x = 0; x < W; x++) {
      if (!mask[y * W + x]) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  // Nuke everything in bbox: cream outside shape, yellow inside shape
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const i = (y * W + x) * 4;
      if (mask[y * W + x]) {
        data[i] = 252;
        data[i + 1] = 224;
        data[i + 2] = 1;
        data[i + 3] = 255;
      } else {
        // restore cream gutter between yellow + photo cards
        data[i] = 254;
        data[i + 1] = 251;
        data[i + 2] = 246;
        data[i + 3] = 255;
      }
    }
  }

  const iconSize = Math.round(W * 0.1);
  const iconBuf = await sharp(poolIcon).resize(iconSize).png().toBuffer();

  const pill = (x, y, w, label) => {
    const cy = y + W * 0.029;
    return `
      <rect x="${x}" y="${y}" width="${w}" height="${W * 0.058}" rx="${W * 0.03}" fill="#111"/>
      <circle cx="${x + W * 0.035}" cy="${cy}" r="${W * 0.018}" fill="#FFD400"/>
      <path d="M ${x + W * 0.026} ${cy} l ${W * 0.009} ${W * 0.009} l ${W * 0.015} ${-W * 0.015}" fill="none" stroke="#000" stroke-width="${Math.max(2, W * 0.004)}" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="${x + W * 0.065}" y="${y + W * 0.038}" font-family="Arial, Helvetica, sans-serif" font-size="${W * 0.026}" font-weight="600" fill="#fff">${label}</text>
    `;
  };

  const svg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${cutH}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${W * 0.42}" y="${cutH * 0.11}" width="${W * 0.28}" height="${W * 0.055}" rx="${W * 0.03}" fill="#111"/>
  <text x="${W * 0.56}" y="${cutH * 0.148}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${W * 0.022}" font-weight="700" fill="#FCE001" letter-spacing="1.6">YOU ARE HERE</text>

  <text x="${W * 0.5}" y="${cutH * 0.30}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${W * 0.078}" font-weight="800" fill="#111">Pool Ride.</text>
  <text x="${W * 0.5}" y="${cutH * 0.38}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${W * 0.028}" font-weight="500" fill="#2f2f2f">Share your ride with others going the same way.</text>
  <text x="${W * 0.5}" y="${cutH * 0.435}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${W * 0.028}" font-weight="500" fill="#2f2f2f">Split costs and travel greener.</text>

  ${pill(W * 0.14, cutH * 0.50, W * 0.34, "Verified drivers")}
  ${pill(W * 0.52, cutH * 0.50, W * 0.30, "Fixed fares")}
  ${pill(W * 0.34, cutH * 0.60, W * 0.32, "0% commission")}
</svg>`);

  const base = await sharp(data, {
    raw: { width: W, height: H, channels: 4 },
  })
    .png()
    .toBuffer();

  const labelPng = await sharp(svg).png().toBuffer();

  await sharp(base)
    .composite([
      { input: labelPng, left: 0, top: 0 },
      {
        input: iconBuf,
        left: Math.round(W * 0.3),
        top: Math.round(cutH * 0.095),
      },
    ])
    .png()
    .toFile(outFull);

  console.log("nuked bbox", minX, minY, maxX, maxY, "→ clean pool image");
})();
