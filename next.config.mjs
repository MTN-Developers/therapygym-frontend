/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images configuration should be at the top level, not inside redirects
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mtnleadership.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Redirects as a separate configuration
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
