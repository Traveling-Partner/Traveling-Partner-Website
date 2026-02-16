/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for static export
  output: "export",

  // Allow build even with TS errors (as you already had)
  typescript: {
    ignoreBuildErrors: true,
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
