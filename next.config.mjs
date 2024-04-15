/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.resci.pro",
      },
    ],
  },
};

export default nextConfig;
