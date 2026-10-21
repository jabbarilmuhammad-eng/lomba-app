import type { Metadata } from "next";
import { Jaro, Jomhuria, Poppins } from "next/font/google";
import "./globals.css";
import "./armaso.css";

const jaro = Jaro({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-home-jaro",
  display: "swap",
});

const jomhuria = Jomhuria({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-home-jomhuria",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-home-poppins",
  display: "swap",
});

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
      <body className={`${jaro.variable} ${jomhuria.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
