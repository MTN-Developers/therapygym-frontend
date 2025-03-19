/* eslint-disable @next/next/no-page-custom-font */
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { TranslationContextProvider } from "@/contexts/TranslationContext";
// import ClientProvider from "./ClientProvidert";

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <main
      lang={locale == "ar" ? "ar" : "en"}
      dir={locale == "ar" ? "rtl" : "ltr"}
    >
      <NextIntlClientProvider messages={messages}>
        <TranslationContextProvider locale={locale as "ar" | "en"}>
          {children}
        </TranslationContextProvider>
      </NextIntlClientProvider>
    </main>
  );
}
