/**
 * Download About Us section images from Figma (file HHMDRv9fQv9Bc08OCyuWg9).
 * Requires FIGMA_ACCESS_TOKEN in environment (Figma → Settings → Personal access tokens).
 *
 * Usage: FIGMA_ACCESS_TOKEN=xxx node scripts/download-about-us-figma.mjs
 */
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE_KEY = process.env.FIGMA_FILE_KEY || "cs4Wta4vBEackbXZw6JvrM";
const OUT_DIR = path.join(__dirname, "..", "public", "images", "about-us");

/** Figma node id → local filename (About Us — node 166:4983 / legacy 124:3696 tree) */
const NODES = {
  "124:3699": "profile-top-left.png",
  "124:3706": "profile-top-right.png",
  "124:3713": "profile-bottom-left.png",
  "124:3720": "profile-bottom-right.png",
  "124:3727": "stat-card.png",
  "124:3697": "bg-line.png",
  "124:3740": "total-rides-tag.png",
  "124:3747": "report-badge.png",
  "124:3759": "community-pill.png",
  "124:3756": "chat-bubble.png",
};

function getJson(url, headers) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Invalid JSON (${res.statusCode}): ${data.slice(0, 200)}`));
          }
        });
      })
      .on("error", reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", reject);
  });
}

const token = process.env.FIGMA_ACCESS_TOKEN;
if (!token) {
  console.error("Missing FIGMA_ACCESS_TOKEN. Create a token at https://www.figma.com/developers/api#access-tokens");
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const ids = Object.keys(NODES).join(",");
const apiUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=png&scale=2`;

const json = await getJson(apiUrl, { "X-Figma-Token": token });
if (json.err) {
  console.error("Figma API error:", json.err);
  process.exit(1);
}

const images = json.images ?? {};
for (const [nodeId, filename] of Object.entries(NODES)) {
  const url = images[nodeId];
  if (!url) {
    console.warn(`No URL for node ${nodeId}`);
    continue;
  }
  const dest = path.join(OUT_DIR, filename);
  await download(url, dest);
  const size = fs.statSync(dest).size;
  console.log(`Saved ${filename} (${size} bytes)`);
}

console.log("Done.");
