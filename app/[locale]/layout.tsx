/* eslint-disable @next/next/no-page-custom-font */
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { TranslationContextProvider } from "@/contexts/TranslationContext";
export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
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
        <NextIntlClientProvider messages={messages}>
          <TranslationContextProvider locale={locale as "ar" | "en"}>
            {children}
          </TranslationContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
