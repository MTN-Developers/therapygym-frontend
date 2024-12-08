import CustomLayout from "./CustomLayout";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CustomLayout>{children}</CustomLayout>;
}
