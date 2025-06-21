import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Interactive Conic Sections | Mathematical Visualization Tool",
  description:
    "Explore parabolas, circles, ellipses, and hyperbolas with interactive 3D visualizations and real-time parameter controls.",
  keywords:
    "conic sections, parabola, ellipse, hyperbola, circle, mathematics, visualization, interactive, education",
  authors: [{ name: "Interactive Conic Sections Team" }],
  creator: "Interactive Conic Sections Tool",
  publisher: "Educational Mathematics Tools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://conic-sections.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Interactive Conic Sections Tool",
    description:
      "Explore and visualize conic sections with interactive 3D demonstrations and real-time parameter controls",
    siteName: "Interactive Conic Sections",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Interactive Conic Sections Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Conic Sections Tool",
    description:
      "Educational tool for exploring parabolas, circles, ellipses, and hyperbolas",
    images: ["/twitter-image.png"],
    creator: "@conicSections",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <main role="main">{children}</main>
      </body>
    </html>
  );
}
