import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shivaratnakumar Patil - Full Stack Developer Portfolio",
  description: "Portfolio website showcasing my work as a full-stack developer. View my projects, skills, and get in touch for collaborations.",
  keywords: "portfolio, developer, full-stack, web development, react, next.js, typescript",
  authors: [{ name: "Shivaratnakumar Patil" }],
  openGraph: {
    title: "Shivaratnakumar Patil - Full Stack Developer Portfolio",
    description: "Portfolio website showcasing my work as a full-stack developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
