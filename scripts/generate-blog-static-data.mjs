/**
 * Writes same-origin blog JSON for static hosting and local dev.
 * - After `next build`: writes to out/ + public/
 * - Before `next dev`: run with --public-only (no out/ required)
 */
import fs from "fs";
import path from "path";

const publicOnly = process.argv.includes("--public-only");

const API_BASE =
  (process.env.NEXT_PUBLIC_API_BASE_URL || "https://staging.api.traveling-partner.com/api")
    .replace(/\/$/, "") + "/website";

const OUT_DIR = path.join(process.cwd(), "out");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const LIST_OUT = path.join(OUT_DIR, "blog-list.json");
const LIST_PUBLIC = path.join(PUBLIC_DIR, "blog-list.json");
const CACHE_LIST = path.join(process.cwd(), "data", "blog-list-cache.json");

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json();
}

function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function extractIds(listPayload) {
  const data = listPayload?.data;
  const content = data?.content ?? data;
  if (!Array.isArray(content)) return [];
  return content
    .map((item) =>
      String(
        item?.id ??
          item?.blog_id ??
          item?.blogId ??
          item?.website_blog_id ??
          ""
      ).trim()
    )
    .filter(Boolean);
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data), "utf8");
}

function syncBlogDataDir(sourceDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
  if (!fs.existsSync(sourceDir)) return 0;
  let count = 0;
  for (const file of fs.readdirSync(sourceDir)) {
    if (!file.endsWith(".json")) continue;
    fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
    count += 1;
  }
  return count;
}

async function main() {
  const hasOut = fs.existsSync(OUT_DIR);
  if (!hasOut && !publicOnly) {
    console.warn("[blog-static] out/ missing — writing public/ only (use after build for out/)");
  }

  let listPayload = null;

  try {
    listPayload = await fetchJson(`${API_BASE}/blog/list`);
    console.log("[blog-static] fetched blog list from API");
  } catch (err) {
    console.warn("[blog-static] API list fetch failed:", err.message);
    if (fs.existsSync(CACHE_LIST)) {
      listPayload = readJsonFile(CACHE_LIST);
      console.warn("[blog-static] using data/blog-list-cache.json");
    }
  }

  if (!listPayload) {
    console.warn("[blog-static] no list payload — nothing written");
    return;
  }

  writeJson(LIST_PUBLIC, listPayload);
  if (hasOut) {
    writeJson(LIST_OUT, listPayload);
  }

  const ids = extractIds(listPayload);
  const publicBlogDataDir = path.join(PUBLIC_DIR, "blog-data");
  const outBlogDataDir = path.join(OUT_DIR, "blog-data");
  fs.mkdirSync(publicBlogDataDir, { recursive: true });
  if (hasOut) fs.mkdirSync(outBlogDataDir, { recursive: true });

  let detailCount = 0;
  for (const id of ids) {
    let detailPayload = null;
    try {
      detailPayload = await fetchJson(
        `${API_BASE}/blog/view/${encodeURIComponent(id)}`
      );
    } catch {
      const item = (listPayload?.data?.content ?? []).find(
        (row) => String(row?.id) === id
      );
      if (item) {
        detailPayload = { success: true, data: item };
      }
    }

    if (!detailPayload) continue;

    writeJson(path.join(publicBlogDataDir, `${id}.json`), detailPayload);
    if (hasOut) {
      writeJson(path.join(outBlogDataDir, `${id}.json`), detailPayload);
    }
    detailCount += 1;
  }

  fs.mkdirSync(path.dirname(CACHE_LIST), { recursive: true });
  writeJson(CACHE_LIST, listPayload);
  writeJson(
    path.join(process.cwd(), "data", "blog-build-ids.json"),
    ids
  );

  const targets = hasOut ? "out/ + public/" : "public/";
  console.log(
    `[blog-static] wrote blog-list.json + ${detailCount} detail file(s) to ${targets}`
  );
}

main().catch((err) => {
  console.warn("[blog-static] failed:", err.message || err);
  process.exit(0);
});
