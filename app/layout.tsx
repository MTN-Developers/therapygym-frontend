/* eslint-disable @next/next/no-page-custom-font */
import Providers from "./Providers";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MTN Live System",
  description: "Developed By MTN Software Team 2024",
  keywords:
    "MTN, Live, Live System, 2024, Live Stream, live, stream, mtn-live, managethenow.net, mtnlive, livestream, videos, therapy gym, Therapy",
  applicationName: "MTN Live",
  creator: "MTN Software Team 2024",
};
export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html dir={`${locale === "ar" ? "rtl" : "ltr"}`} lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap"
          rel="stylesheet"
        />

        <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
      </head>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
