/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18/request.ts");
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
