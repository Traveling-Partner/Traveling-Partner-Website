import sharp from "sharp";

const dir = "public/images/about/your-trust";

// Trim the black margin around the light card
const trimmed = await sharp(`${dir}/bg-phone-van.png`)
  .trim({ background: "#000000", threshold: 40 })
  .toBuffer();
const tm = await sharp(trimmed).metadata();
console.log("trimmed:", tm.width, "x", tm.height);

// Round corners with alpha mask so nothing dark shows at the corners
const mask = Buffer.from(
  `<svg width="${tm.width}" height="${tm.height}"><rect x="0" y="0" width="${tm.width}" height="${tm.height}" rx="28" ry="28" fill="#fff"/></svg>`
);
await sharp(trimmed)
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toFile(`${dir}/bg-phone-van-rounded.png`);

// Sample edge colors of the result
const { data, info } = await sharp(`${dir}/bg-phone-van-rounded.png`)
  .raw()
  .ensureAlpha()
  .toBuffer({ resolveWithObject: true });
const s = (x, y) => {
  const i = (y * info.width + x) * 4;
  return (
    "#" +
    [data[i], data[i + 1], data[i + 2]]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
};
console.log(
  "midleft:",
  s(3, Math.floor(info.height / 2)),
  "topmid:",
  s(Math.floor(info.width / 2), 3)
);
