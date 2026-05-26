import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sony α6100 — Precision, Distilled.",
  description:
    "Experience the Sony α6100 mirrorless camera through an immersive, scroll-driven cinematic journey. Engineered for absolute optical clarity and lightning-fast autofocus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@200;300;400;500&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* GSAP + ScrollTrigger */}
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
          async={false}
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
          async={false}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
