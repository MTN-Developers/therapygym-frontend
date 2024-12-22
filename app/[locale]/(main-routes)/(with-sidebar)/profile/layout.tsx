import ProfileSidebar from "@/app/components/profile/ProfileSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex gap-1 mt-8">
        <ProfileSidebar />
        {children}
      </div>
    </>
  );
}
