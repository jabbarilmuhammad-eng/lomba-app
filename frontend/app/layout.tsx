import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lomba App",
  description: "Sistem pendaftaran lomba",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}