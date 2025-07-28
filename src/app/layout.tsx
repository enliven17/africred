import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AfriCred - Africa's First Earn-to-Learn Platform",
  description: "Learn, earn, and grow with Africa's revolutionary educational platform. Complete missions, earn crypto rewards, and build your future.",
  keywords: ["Africa", "education", "blockchain", "earn-to-learn", "crypto", "learning platform"],
  authors: [{ name: "AfriCred Team" }],
  openGraph: {
    title: "AfriCred - Africa's First Earn-to-Learn Platform",
    description: "Learn, earn, and grow with Africa's revolutionary educational platform.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AfriCred - Africa's First Earn-to-Learn Platform",
    description: "Learn, earn, and grow with Africa's revolutionary educational platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
