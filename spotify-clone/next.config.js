/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pdpxzujbybgrlrqgpacm.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
