import type { Metadata } from "next";
import StripeProvider from "@/app/StripeProvider";

export const metadata: Metadata = {
  title: "Estro Gym - Payment",
  description: "Developed By MTN Software Team 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StripeProvider>{children}</StripeProvider>;
}
