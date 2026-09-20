import type { Metadata } from "next";
import "./globals.css";
import "./armaso.css";

export const metadata: Metadata = {
  title: "ARMASO 2027 | Classic & Majestic Egyptian Olympiad & Sport Competition",
  description: "Website Resmi ARMASO 2027 (Ar-Rahmat Mathematic, Science, Social Olympiad, and Sport Competition). Ajang kompetisi bergengsi tingkat SD/MI se-Jawa Bali dengan tema Classic & Majestic Egyptian. Total hadiah pembinaan jutaan rupiah.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
