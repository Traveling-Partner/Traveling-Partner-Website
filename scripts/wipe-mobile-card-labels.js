/**
 * Build blank mobile shells:
 * - taxi: yellow Taxi Stand content kept, photo cards wiped
 * - shell: yellow solid-wiped + photo cards wiped (Pool/Delivery HTML only)
 */
const sharp = require("sharp");
const path = require("path");

const dir = path.join(
  "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/services/mobile"
);

const CARDS = [
  {
    mask: "mask-logistics-crop.png",
    left: 0.03543,
    top: 0.29987,
    width: 0.44525,
    height: 0.36269,
  },
  {
    mask: "mask-pool-crop.png",
    left: 0.44767,
    top: 0.29261,
    width: 0.54106,
    height: 0.35669,
  },
  {
    mask: "mask-trip-crop.png",
    left: 0.0314,
    top: 0.64552,
    width: 0.48953,
    height: 0.33681,
  },
  {
    mask: "mask-delivery-crop.png",
    left: 0.5475,
    top: 0.64646,
    width: 0.44122,
    height: 0.33239,
  },
];

async function wipeYellowSolid(data, W, H) {
  const bodyMaxY = Math.round(H * 0.355);
  const tipMaxY = Math.round(H * 0.395);
  const tipLeft = Math.round(W * 0.38);
  const tipRight = Math.round(W * 0.62);

  const inShieldZone = (x, y) => {
    if (y < 0) return false;
    if (y <= bodyMaxY) return true;
    if (y <= tipMaxY && x >= tipLeft && x <= tipRight) return true;
    return false;
  };

  const isCream = (i) => {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    return r > 245 && g > 240 && b > 225 && Math.abs(r - g) < 14;
  };
  const isYellow = (i) => {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    return r > 185 && g > 145 && b < 140 && r - b > 55 && g - b > 30;
  };

  const maxP = W * tipMaxY;
  const visited = Buffer.alloc(maxP);
  const queue = [];

  for (let y = 0; y <= bodyMaxY; y++) {
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      const i = p * 4;
      if (!isYellow(i)) continue;
      visited[p] = 1;
      queue.push(p);
    }
  }

  let qi = 0;
  while (qi < queue.length) {
    const p = queue[qi++];
    const x = p % W;
    const y = (p / W) | 0;
    for (const [nx, ny] of [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ]) {
      if (!inShieldZone(nx, ny)) continue;
      const np = ny * W + nx;
      if (np >= maxP || visited[np]) continue;
      const ni = np * 4;
      if (isCream(ni)) continue;
      visited[np] = 1;
      queue.push(np);
    }
  }

  for (let pass = 0; pass < 16; pass++) {
    const next = Buffer.from(visited);
    for (let y = 0; y <= tipMaxY; y++) {
      for (let x = 0; x < W; x++) {
        if (!inShieldZone(x, y)) continue;
        const p = y * W + x;
        if (visited[p]) continue;
        const i = p * 4;
        if (isCream(i)) continue;
        let near = false;
        for (let dy = -1; dy <= 1 && !near; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (!inShieldZone(nx, ny)) continue;
            if (visited[ny * W + nx]) near = true;
          }
        }
        if (near) next[p] = 1;
      }
    }
    visited.set(next);
  }

  for (let p = 0; p < maxP; p++) {
    if (!visited[p]) continue;
    const i = p * 4;
    data[i] = 252;
    data[i + 1] = 224;
    data[i + 2] = 1;
    data[i + 3] = 255;
  }
}

async function cardComposites(W, H) {
  const composites = [];
  for (const card of CARDS) {
    const cw = Math.round(W * card.width);
    const ch = Math.round(H * card.height);
    const left = Math.round(W * card.left);
    const top = Math.round(H * card.top);

    const fill = await sharp({
      create: {
        width: cw,
        height: ch,
        channels: 4,
        background: { r: 18, g: 18, b: 18, alpha: 1 },
      },
    })
      .png()
      .toBuffer();

    const maskBuf = await sharp(path.join(dir, card.mask))
      .resize(cw, ch, { fit: "fill" })
      .ensureAlpha()
      .toBuffer();

    const shaped = await sharp(fill)
      .composite([{ input: maskBuf, blend: "dest-in" }])
      .png()
      .toBuffer();

    composites.push({ input: shaped, left, top });
  }
  return composites;
}

(async () => {
  const fullPath = path.join(dir, "services-mobile-full.png");
  const meta = await sharp(fullPath).metadata();
  const W = meta.width;
  const H = meta.height;
  const composites = await cardComposites(W, H);

  // Taxi blank: keep featured Taxi Stand art, wipe photo-card labels
  await sharp(fullPath)
    .composite(composites)
    .png()
    .toFile(path.join(dir, "services-mobile-taxi-blank.png"));
  console.log("→ services-mobile-taxi-blank.png");

  // Shell blank: solid yellow + wiped cards (Pool / Delivery HTML owns all text)
  const { data } = await sharp(fullPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  await wipeYellowSolid(data, W, H);
  const shellBase = await sharp(data, {
    raw: { width: W, height: H, channels: 4 },
  })
    .png()
    .toBuffer();

  await sharp(shellBase)
    .composite(composites)
    .png()
    .toFile(path.join(dir, "services-mobile-shell-blank.png"));
  console.log("→ services-mobile-shell-blank.png");
})();
