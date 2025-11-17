import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import SmoothScroll from "@/components/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kAItech — Learn and apply AI in daily life",
  description: "Workshops and resources to help everyone, technical or not, use AI confidently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <SmoothScroll />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(0,226,195,0.12),transparent_40%),radial-gradient(ellipse_at_bottom,_rgba(0,217,255,0.12),transparent_40%)]" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
