/** @type {import('next').NextConfig} */
const backendOrigin =
  (process.env.BACKEND_ORIGIN || "https://api.traveling-partner.com").replace(
    /\/$/,
    ""
  );

const nextConfig = {
  // Required for static export
  output: "export",

  // Allow build even with TS errors (as you already had)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Proxy same-origin /website → Spring (local dev only; Vercel uses vercel.json)
  async rewrites() {
    return [
      {
        source: "/website/:path*",
        destination: `${backendOrigin}/api/website/:path*`,
      },
    ];
  },

  // Required for static hosting
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
