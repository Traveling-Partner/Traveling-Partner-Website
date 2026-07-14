const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const src =
  "C:/Users/Ali Computers/AppData/Roaming/Cursor/User/workspaceStorage/06e352ab8d0c593d3cc7cc8a572c8924/images/image-48fa2e9e-8a80-4668-9594-2d4dd0d0be78.png";
const destDir = path.join(
  __dirname,
  "../public/images/taxi-stand/services/mobile"
);
fs.mkdirSync(destDir, { recursive: true });

(async () => {
  const scale = 4;
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r > 248 && g > 245 && b > 230 && Math.abs(r - g) < 12) {
      data[i + 3] = 0;
    }
  }

  const base = await sharp(Buffer.from(data), {
    raw: { width: w, height: h, channels: 4 },
  })
    .png()
    .toBuffer();

  await sharp(base)
    .resize(w * scale, h * scale, { kernel: "lanczos3" })
    .png()
    .toFile(path.join(destDir, "services-mobile-full.png"));

  const crops = [
    { name: "taxi", left: 0, top: 12, width: 181, height: 170 },
    { name: "logistics", left: 0, top: 178, width: 90, height: 120 },
    { name: "pool", left: 91, top: 178, width: 90, height: 120 },
    { name: "trip", left: 0, top: 298, width: 90, height: 145 },
    { name: "delivery", left: 91, top: 298, width: 90, height: 145 },
  ];

  for (const c of crops) {
    await sharp(base)
      .extract({
        left: c.left,
        top: c.top,
        width: c.width,
        height: c.height,
      })
      .resize(c.width * scale, c.height * scale, { kernel: "lanczos3" })
      .png()
      .toFile(path.join(destDir, `card-${c.name}.png`));
    console.log("wrote", c.name);
  }

  const meta = await sharp(
    path.join(destDir, "services-mobile-full.png")
  ).metadata();
  console.log("full", meta.width, meta.height);
})();
