import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Music Library",
  description: "Create/Share your music library",
};

export default function RootLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head className=''>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className='flex flex-col min-h-screen'>
        <Navbar />
        <main id="mainContent" className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
