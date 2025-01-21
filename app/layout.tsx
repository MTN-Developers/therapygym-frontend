/* eslint-disable @next/next/no-page-custom-font */
import Providers from "./Providers";
import "./globals.css";
import { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

export const metadata: Metadata = {
  title: "MTN Live System",
  description: "Developed By MTN Software Team 2024",
  keywords:
    "MTN, Live, Live System, 2024, Live Stream, live, stream, mtn-live, managethenow.net, mtnlive, livestream, videos, therapy gym, Therapy",
  applicationName: "MTN Live",
  creator: "MTN Software Team 2024",
};

//fonts

const smooch = localFont({
  src: "./fonts/SmoochSans[wght].ttf",
  variable: "--font-smooch",
  style: "normal",
});

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html
      dir={`${locale === "ar" ? "rtl" : "ltr"}`}
      lang={locale}
      className={`${smooch.variable}`}
    >
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
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '637335831936469');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=637335831936469&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </body>
    </html>
  );
}
