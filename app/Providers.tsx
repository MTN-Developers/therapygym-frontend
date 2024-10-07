"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>{children}</AntdRegistry>
    </QueryClientProvider>
  );
};

export default Providers;
