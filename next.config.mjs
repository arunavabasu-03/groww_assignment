/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["fakestoreapi.com", "groww.in"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
