/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Enable static export
  images: {
    // unoptimized: true, // Disable image optimization for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mtnleadership.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/dashboard",
  //       permanent: false, // Set to true if you want a 308 Permanent Redirect
  //     },
  //   ];
  // },
};

export default nextConfig;
