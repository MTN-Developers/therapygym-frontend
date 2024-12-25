"use client";
import ProfileSidebar from "@/app/components/profile/ProfileSidebar";
import { useTranslationContext } from "@/contexts/TranslationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale } = useTranslationContext();
  return (
    <>
      <div className="flex gap-1 h-full">
        <ProfileSidebar />
        <div
          className={`relative w-full ${
            locale === "en" ? "lg:right-0 right-7" : " lg:left-0 left-7"
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
