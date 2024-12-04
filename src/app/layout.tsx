import "./globals.css";
import type { Metadata } from "next";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Lacquer } from 'next/font/google';
import { Space_Grotesk } from "next/font/google";

const lacquer = Lacquer({
  subsets: ['latin'],
  weight: ['400'],
  style: 'normal',
  variable: '--font-lacquer',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400'],
  style: 'normal',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "Music Library",
  description: "Create/Share your music library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lacquer.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-black text-white flex flex-col min-h-screen">
        <Navbar />
        <main id="mainContent" className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
