import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3001'),
  title: "AfriCred - Africa's First Earn-to-Learn Platform",
  description: "Learn, earn, and grow with Africa's revolutionary educational platform. Complete missions, earn crypto rewards, and build your future.",
  keywords: ["Africa", "education", "blockchain", "earn-to-learn", "crypto", "learning platform"],
  authors: [{ name: "AfriCred Team" }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "AfriCred - Africa's First Earn-to-Learn Platform",
    description: "Learn, earn, and grow with Africa's revolutionary educational platform.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'AfriCred Logo',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AfriCred - Africa's First Earn-to-Learn Platform",
    description: "Learn, earn, and grow with Africa's revolutionary educational platform.",
    images: ['/logo.png'],
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
