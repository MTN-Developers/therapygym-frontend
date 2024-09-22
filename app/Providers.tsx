"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AntdRegistry>{children}</AntdRegistry>;
};

export default Providers;
