/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/**",
      },
      {
        protocol: "https",
        hostname: "images.mubicdn.net",
        pathname: "/images/cast_member/**",
      },
    ],
  },
};

module.exports = nextConfig;
