import type { Metadata, Viewport } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

const SITE_URL = "https://www.drivaholics.com";
const DESCRIPTION =
  "A driving community for people who genuinely love cars and driving. We bring drivers together to enjoy their cars, improve skills, and be part of real car culture. Based in Khobar, Saudi Arabia.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "DRIVAHOLICS — Making Everlasting Memories",
  description: DESCRIPTION,
  keywords: ["drivaholics", "car community", "drift", "gymkhana", "saudi arabia", "bahrain", "khobar"],
  openGraph: {
    title: "DRIVAHOLICS — Making Everlasting Memories",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "DRIVAHOLICS",
    images: [
      {
        url: "/media/dh/dh-hero.jpg",
        width: 1920,
        height: 1280,
        alt: "Drivaholics — GT3 RS and M3 at golden hour",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DRIVAHOLICS — Making Everlasting Memories",
    description: DESCRIPTION,
    images: ["/media/dh/dh-hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={bebas.variable}>
      <body className="antialiased">
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
