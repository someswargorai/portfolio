import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./Providers/ReduxProvider";
import { Analytics } from "@vercel/analytics/next"
import { title } from "process";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Someswar | Portfolio",
  description: "Developer focused on building clean, modern, and user-friendly web experiences.",
  icons: {
    icon: "/favicon.png",
  },

  openGraph: {
    title: "Someswar | Portfolio",
    description:
      "Clean, modern, and user-friendly web experiences. Explore my work and projects.",
    url: "https://portfolio-rho-pied-bftkib754x.vercel.app/",
    siteName: "Someswar Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/dpacclyw4/image/upload/v1771170835/favicon_x5cdi4.png",
        width: 1200,
        height: 630,
        alt: "Someswar Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Someswar | Portfolio",
    description:
      "Clean, modern, and user-friendly web experiences. Explore my work and projects.",
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
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
        <Analytics/>
        <ReduxProvider>
        {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
