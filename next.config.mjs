/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: false, // Set to true if you want a 308 Permanent Redirect
      },
    ];
  },
};

export default nextConfig;
