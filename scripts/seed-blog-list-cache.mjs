/**
 * One-time helper: writes data/blog-list-cache.json from the live API response
 * when local SSL cannot reach api.traveling-partner.com.
 * Run: node scripts/seed-blog-list-cache.mjs
 */
import fs from "fs";
import path from "path";

// Snapshot from GET /api/website/blog/list (2026-05-24). Re-run after major blog changes.
const payload = {
  success: true,
  statusCode: 200,
  message: "Blogs fetched successfully",
  data: {
    content: [
      {
        id: 67,
        coverImage:
          "https://traveling-partner-storage.nyc3.digitaloceanspaces.com/banners/7b5fc2c6-da27-4786-a356-a396e581b7c0_2.png",
        mainTitle:
          "New Why Digital Booking Systems Are Important for Modern Businesses",
        description1:
          "Digital booking systems help businesses manage operations and customers more efficiently.",
        description2:
          " Businesses across many industries now rely on digital booking systems to improve customer experiences and automate operations.",
        date: "2026-05-12",
        author: "ADMIN ONE",
        readTime: "5 min",
        tags: ["travel", "growth", "solo travel", "guide", "travel tips"],
        status: "PUBLISHED",
        categoryId: 4,
        categoryName: "Raw Guide",
      },
      {
        id: 66,
        coverImage:
          "https://traveling-partner-storage.nyc3.digitaloceanspaces.com/banners/5149a491-92ab-47a9-944f-1cb29e844e29_pexels-mart-production-8869414.jpg",
        mainTitle:
          "Why Digital Booking Systems Are Important for Modern Businesses",
        description1:
          "Digital booking systems help businesses manage operations and customers more efficiently.",
        description2:
          " Businesses across many industries now rely on digital booking systems to improve customer experiences and automate operations.",
        date: "2026-05-11",
        author: "ADMIN ONE",
        readTime: "5 min",
        tags: ["solo travel", "guide", "travel tips"],
        status: "PUBLISHED",
        categoryId: 1,
        categoryName: "Travel Guide",
      },
      {
        id: 65,
        coverImage: "https://example.com/image5.jpg",
        mainTitle: "Budget Travel Tips",
        description1:
          "Digital booking systems help businesses manage operations and customers more efficiently.",
        description2:
          " Businesses across many industries now rely on digital booking systems.",
        date: "2026-04-15",
        author: "Admin",
        readTime: "4 min",
        tags: [],
        status: "PUBLISHED",
        categoryId: 3,
        categoryName: "Health Guide",
      },
      {
        id: 64,
        coverImage:
          "https://traveling-partner-storage.nyc3.digitaloceanspaces.com/banners/5149a491-92ab-47a9-944f-1cb29e844e29_pexels-mart-production-8869414.jpg",
        mainTitle:
          "Why Digital Booking Systems Are Important for Modern Businesses",
        description1:
          "Digital booking systems help businesses manage operations and customers more efficiently.",
        description2:
          " Businesses across many industries now rely on digital booking systems.",
        date: "2026-05-11",
        author: "ADMIN ONE",
        readTime: "5 min",
        tags: ["solo travel", "guide", "travel tips"],
        status: "PUBLISHED",
        categoryId: 1,
        categoryName: "Travel Guide",
      },
      {
        id: 63,
        coverImage:
          "https://traveling-partner-storage.nyc3.digitaloceanspaces.com/banners/fc8bbf4d-8c72-4f8d-879c-e25d4f7245ce_pexels-pixabay-52526.jpg",
        mainTitle: "Travel App Safety Features",
        description1: "Important safety features every travel app should include.",
        description2:
          " Safety is important for both passengers and drivers.",
        date: "2026-05-11",
        author: "ADMIN ONE",
        readTime: "5 min",
        tags: ["travel", "rideshare", "safety", "booking", "guide"],
        status: "PUBLISHED",
        categoryId: 1,
        categoryName: "Travel Guide",
      },
      {
        id: 62,
        coverImage:
          "https://traveling-partner-storage.nyc3.digitaloceanspaces.com/banners/e62b5eda-3680-4acd-bb8d-d0da7ab706a8_pexels-nurseryart-346768.jpg",
        mainTitle: "Improving Customer Experience for Drivers",
        description1: "Tips for drivers to provide better service.",
        description2:
          " Professional drivers create better customer experiences.",
        date: "2026-05-11",
        author: "ADMIN ONE",
        readTime: "5 min",
        tags: ["solo travel", "guide", "travel tips"],
        status: "PUBLISHED",
        categoryId: 1,
        categoryName: "Travel Guide",
      },
      {
        id: 61,
        coverImage:
          "https://traveling-partner-storage.nyc3.digitaloceanspaces.com/banners/4a54d37e-b18f-4378-8d94-b9b57a68412f_mohamed_hassan-travel-9855574_1280.png",
        mainTitle: "Smart Ride Sharing Tips",
        description1: "Simple tips for safer and smarter ride sharing.",
        description2: " Ride-sharing apps make travel easier and faster for daily users.",
        date: "2026-05-11",
        author: "ADMIN ONE",
        readTime: "5 min",
        tags: ["solo travel", "guide", "travel tips"],
        status: "PUBLISHED",
        categoryId: 1,
        categoryName: "Travel Guide",
      },
      {
        id: 60,
        coverImage:
          "https://traveling-partner-storage.nyc3.digitaloceanspaces.com/banners/3dc4000e-e0c6-433d-90e5-17d466e82ca0_pexels-efrem-efre-2786187-24837089.jpg",
        mainTitle: "Benefits of Modern Transportation Apps",
        description1: "How transportation apps improve daily travel.",
        description2:
          " Modern transportation apps help users travel more efficiently.",
        date: "2026-05-11",
        author: "ADMIN ONE",
        readTime: "5 min",
        tags: ["travel", "rideshare", "safety", "booking", "guide"],
        status: "PUBLISHED",
        categoryId: 1,
        categoryName: "Travel Guide",
      },
    ],
    totalElements: 8,
    totalPages: 1,
  },
};

const out = path.join(process.cwd(), "data", "blog-list-cache.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(payload), "utf8");
console.log("[seed-blog-list-cache] wrote", out);
