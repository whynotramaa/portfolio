import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ramaa, not the chosen one",
  description:
    "Products, interfaces, experiments, failed companies, sports, and difficult-to-explain things by a final-year computer science student.",
};

const jpFont = `https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500&display=swap&text=${encodeURIComponent(
  "ラマーものづくり、ときどき冗談。私作品道具世界今縁ありがとう言語画面基盤",
)}`;

const themeScript = `
try {
  var t = localStorage.getItem("ramaa-theme");
  if (!t) t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = t;
} catch (e) {}
document.documentElement.classList.add("js");
`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/AppleGaramond-Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Archivo.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={jpFont} />
        <link rel="preload" href="/fonts/Peehu-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
