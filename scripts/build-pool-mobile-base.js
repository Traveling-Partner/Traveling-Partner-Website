const sharp = require("sharp");

const src =
  "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/services/mobile/services-mobile-full.png";
const out =
  "d:/traveling-partnter/Traveling-Partner-Website/public/images/taxi-stand/services/mobile/services-mobile-pool.png";

(async () => {
  // Always start from the clean Taxi Stand screenshot
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;

  // Header body vs V tip — never touch photo card pixels outside the tip corridor
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

  // Seed only yellow in the header body (not photo cards)
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

  // Absorb interior holes inside the shield zone (text/pills)
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

  let count = 0;
  for (let p = 0; p < maxP; p++) {
    if (!visited[p]) continue;
    const i = p * 4;
    data[i] = 252;
    data[i + 1] = 224;
    data[i + 2] = 1;
    data[i + 3] = 255;
    count++;
  }

  await sharp(data, { raw: { width: W, height: H, channels: 4 } })
    .png()
    .toFile(out);

  console.log("safe yellow wipe", count, "pixels; photo cards untouched →", out);
})();
