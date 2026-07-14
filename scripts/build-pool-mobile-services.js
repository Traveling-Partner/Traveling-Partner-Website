const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const destDir =
  "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/services/mobile";
const taxiFull = path.join(destDir, "services-mobile-full.png");
const poolFull = path.join(destDir, "services-mobile-pool.png");

(async () => {
  const meta = await sharp(taxiFull).metadata();
  const W = meta.width;
  const H = meta.height;

  // Approximate regions from the Figma mobile screenshot (percent of full image)
  // Yellow header ~ top 39%
  // Pool card ~ right half, ~40% to 64% height
  const yellowH = Math.round(H * 0.395);
  const poolTop = Math.round(H * 0.395);
  const poolH = Math.round(H * 0.25);
  const poolLeft = Math.round(W * 0.505);
  const poolW = Math.round(W * 0.48);

  // Yellow shield SVG matching screenshot (centered content = Pool Ride)
  const yellowSvg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${yellowH}" viewBox="0 0 ${W} ${yellowH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFEE5C"/>
      <stop offset="55%" stop-color="#FCE001"/>
      <stop offset="100%" stop-color="#F5C400"/>
    </linearGradient>
  </defs>
  <!-- cream fill behind so no taxi text peeks -->
  <rect width="${W}" height="${yellowH}" fill="#FEFBF6"/>
  <path fill="url(#g)" d="
    M ${W * 0.04} ${H * 0.01}
    H ${W * 0.96}
    Q ${W} ${H * 0.01} ${W} ${H * 0.04}
    V ${yellowH * 0.62}
    Q ${W} ${yellowH * 0.72} ${W * 0.92} ${yellowH * 0.78}
    L ${W * 0.55} ${yellowH * 0.97}
    Q ${W * 0.5} ${yellowH} ${W * 0.45} ${yellowH * 0.97}
    L ${W * 0.08} ${yellowH * 0.78}
    Q 0 ${yellowH * 0.72} 0 ${yellowH * 0.62}
    V ${H * 0.04}
    Q 0 ${H * 0.01} ${W * 0.04} ${H * 0.01}
    Z"/>

  <!-- icon circle placeholder -->
  <rect x="${W * 0.28}" y="${yellowH * 0.08}" width="${W * 0.09}" height="${W * 0.09}" rx="${W * 0.02}" fill="#111"/>
  
  <!-- YOU ARE HERE pill -->
  <rect x="${W * 0.40}" y="${yellowH * 0.105}" width="${W * 0.32}" height="${W * 0.055}" rx="${W * 0.03}" fill="#111"/>
  <text x="${W * 0.56}" y="${yellowH * 0.14}" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="${W * 0.022}" font-weight="700" fill="#FCE001" letter-spacing="1.5">YOU ARE HERE</text>

  <text x="${W * 0.5}" y="${yellowH * 0.28}" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="${W * 0.085}" font-weight="800" fill="#111">Pool Ride.</text>
  <text x="${W * 0.5}" y="${yellowH * 0.36}" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="${W * 0.028}" font-weight="500" fill="#2f2f2f">Share your ride with others going the same way.</text>
  <text x="${W * 0.5}" y="${yellowH * 0.41}" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="${W * 0.028}" font-weight="500" fill="#2f2f2f">Split costs and travel greener.</text>

  <!-- feature pills -->
  ${[
    { t: "Verified drivers", x: W * 0.18 },
    { t: "Fixed fares", x: W * 0.55 },
  ]
    .map(
      (p, i) => `
    <rect x="${p.x}" y="${yellowH * 0.48}" width="${W * 0.28}" height="${W * 0.055}" rx="${W * 0.03}" fill="#111"/>
    <circle cx="${p.x + W * 0.03}" cy="${yellowH * 0.48 + W * 0.0275}" r="${W * 0.018}" fill="#FFD400"/>
    <text x="${p.x + W * 0.055}" y="${yellowH * 0.48 + W * 0.035}" font-family="Poppins, Arial, sans-serif" font-size="${W * 0.024}" font-weight="600" fill="#fff">${p.t}</text>
  `
    )
    .join("")}
  <rect x="${W * 0.34}" y="${yellowH * 0.58}" width="${W * 0.32}" height="${W * 0.055}" rx="${W * 0.03}" fill="#111"/>
  <circle cx="${W * 0.37}" cy="${yellowH * 0.58 + W * 0.0275}" r="${W * 0.018}" fill="#FFD400"/>
  <text x="${W * 0.395}" y="${yellowH * 0.58 + W * 0.035}" font-family="Poppins, Arial, sans-serif" font-size="${W * 0.024}" font-weight="600" fill="#fff">0% commission</text>
</svg>`);

  // Taxi Stand replacement tile for the Pool slot (photo + labels)
  const taxiBg = "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/drive-earn-bg.png";
  const taxiIcon = "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/services/icon-taxi.png";

  // Extract pool region from original to get exact organic alpha mask
  const poolRegion = await sharp(taxiFull)
    .extract({ left: poolLeft, top: poolTop, width: poolW, height: poolH })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Build alpha: keep non-cream pixels as the shape mask
  const mask = Buffer.alloc(poolW * poolH);
  for (let i = 0, p = 0; i < poolRegion.data.length; i += 4, p++) {
    const r = poolRegion.data[i];
    const g = poolRegion.data[i + 1];
    const b = poolRegion.data[i + 2];
    const isCream = r > 245 && g > 240 && b > 230 && Math.abs(r - g) < 12;
    mask[p] = isCream ? 0 : 255;
  }

  const fill = await sharp(taxiBg)
    .resize(poolW, poolH, { fit: "cover", position: "centre" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const outTile = Buffer.alloc(poolW * poolH * 4);
  for (let p = 0, i = 0; p < poolW * poolH; p++, i += 4) {
    outTile[i] = fill.data[i];
    outTile[i + 1] = fill.data[i + 1];
    outTile[i + 2] = fill.data[i + 2];
    outTile[i + 3] = mask[p];
  }

  // Darken left side slightly + overlay label SVG
  const labelSvg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${poolW}" height="${poolH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="d" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0.45"/>
      <stop offset="55%" stop-color="#000" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#d)"/>
  <text x="${poolW * 0.28}" y="${poolH * 0.28}" font-family="Poppins, Arial, sans-serif" font-size="${poolW * 0.09}" font-weight="700" fill="#fff">Taxi Stand</text>
  <text x="${poolW * 0.28}" y="${poolH * 0.40}" font-family="Poppins, Arial, sans-serif" font-size="${poolW * 0.065}" font-weight="500" font-style="italic" fill="rgba(255,255,255,0.9)">City rides</text>
</svg>`);

  const taxiTile = await sharp(outTile, {
    raw: { width: poolW, height: poolH, channels: 4 },
  })
    .composite([
      { input: await sharp(taxiIcon).resize(Math.round(poolW * 0.18)).png().toBuffer(), left: Math.round(poolW * 0.08), top: Math.round(poolH * 0.16) },
      { input: await sharp(labelSvg).png().toBuffer(), left: 0, top: 0 },
    ])
    .png()
    .toBuffer();

  const yellowPng = await sharp(yellowSvg).png().toBuffer();

  // Also paste pool icon onto yellow
  const poolIcon = "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/services/icon-pool.png";
  const iconSize = Math.round(W * 0.09);
  const yellowWithIcon = await sharp(yellowPng)
    .composite([
      {
        input: await sharp(poolIcon).resize(iconSize).png().toBuffer(),
        left: Math.round(W * 0.28),
        top: Math.round(yellowH * 0.08),
      },
    ])
    .png()
    .toBuffer();

  await sharp(taxiFull)
    .composite([
      { input: yellowWithIcon, left: 0, top: 0 },
      { input: taxiTile, left: poolLeft, top: poolTop },
    ])
    .png()
    .toFile(poolFull);

  console.log("wrote pool composite", poolFull);
  const m = await sharp(poolFull).metadata();
  console.log(m.width, m.height);
})();
