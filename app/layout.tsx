import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Provision of Knowledge",
  description: "This is a my provision of knowledge for job search.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
