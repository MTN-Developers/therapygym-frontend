"use client";
import StripeProvider from "@/app/StripeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StripeProvider>{children}</StripeProvider>;
}
