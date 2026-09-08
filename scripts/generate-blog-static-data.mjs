/**
 * Writes same-origin blog JSON for static hosting and local dev.
 * - After `next build`: writes to out/ + public/
 * - Before `next dev`: run with --public-only (no out/ required)
 */
import fs from "fs";
import path from "path";

const publicOnly = process.argv.includes("--public-only");

function toBlogApiBase(raw) {
  const normalized = String(raw || "https://api.traveling-partner.com/api")
    .replace(/\/$/, "");
  if (normalized.endsWith("/blog")) return normalized;
  if (normalized.endsWith("/website")) {
    return normalized.replace(/\/website$/, "/blog");
  }
  if (normalized.endsWith("/api")) return `${normalized}/blog`;
  return `${normalized}/api/blog`;
}

const BLOG_API = toBlogApiBase(process.env.NEXT_PUBLIC_API_BASE_URL);
const WEBSITE_API = BLOG_API.replace(/\/blog$/, "/website");
const LIST_PAGE_SIZE = 10;

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

function extractContent(listPayload) {
  const data = listPayload?.data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data)) return data;
  return [];
}

function isPublished(item) {
  const status = String(item?.status ?? "").trim().toUpperCase();
  return !status || status === "PUBLISHED";
}

function extractIds(listPayload) {
  return extractContent(listPayload)
    .filter(isPublished)
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

async function fetchPagedList(urlForPage) {
  const all = [];
  let page = 0;
  let totalPages = 1;
  const maxPages = 50;

  while (page < totalPages && page < maxPages) {
    const json = await fetchJson(urlForPage(page));
    const items = extractContent(json).filter(isPublished);
    all.push(...items);
    const reportedPages = Number(json?.data?.totalPages);
    if (Number.isFinite(reportedPages) && reportedPages > 0) {
      totalPages = reportedPages;
    } else if (items.length < LIST_PAGE_SIZE) {
      totalPages = page + 1;
    } else {
      totalPages = page + 2;
    }
    if (items.length === 0) break;
    page += 1;
  }

  return {
    success: true,
    message: "Blogs fetched successfully",
    data: {
      content: all,
      totalElements: all.length,
      totalPages: Math.max(1, page),
      number: 0,
      size: LIST_PAGE_SIZE,
    },
  };
}

async function fetchPublishedList() {
  try {
    const payload = await fetchPagedList(
      (page) =>
        `${BLOG_API}/getAll?page=${page}&size=${LIST_PAGE_SIZE}&search=&status=PUBLISHED`
    );
    console.log("[blog-static] fetched published list from /api/blog/getAll");
    return payload;
  } catch (err) {
    console.warn("[blog-static] getAll failed:", err.message);
    const payload = await fetchPagedList(
      (page) =>
        `${WEBSITE_API}/blog/list?page=${page}&size=${LIST_PAGE_SIZE}`
    );
    console.log(
      "[blog-static] fetched published list from /api/website/blog/list"
    );
    return payload;
  }
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
    listPayload = await fetchPublishedList();
    console.log("[blog-static] fetched published blog list from API");
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
        `${BLOG_API}/getById/${encodeURIComponent(id)}`
      );
    } catch {
      try {
        detailPayload = await fetchJson(
          `${WEBSITE_API}/blog/view/${encodeURIComponent(id)}`
        );
      } catch {
        const item = extractContent(listPayload).find(
          (row) => String(row?.id) === id
        );
        if (item) {
          detailPayload = { success: true, data: item };
        }
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
