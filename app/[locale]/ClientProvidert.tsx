"use client";
import FloatingButton from "../components/FloatingButton";

/* eslint-disable @next/next/no-page-custom-font */
export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <FloatingButton />
    </>
  );
}
