import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yousun Agri360",
  description: "AI-powered 10-in-1 smart farming platform for small farmers.",
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


