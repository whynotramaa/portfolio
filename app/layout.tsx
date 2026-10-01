import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const description =
  "Products, interfaces, experiments, failed companies, sports, and difficult-to-explain things by a final-year computer science student.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ramaa.tech"),
  title: "ramaa, not the chosen one",
  description,
  openGraph: { title: "ramaa, not the chosen one", description, url: "/", siteName: "ramaa", type: "website" },
  twitter: { card: "summary_large_image", title: "ramaa, not the chosen one", description },
};

const sansFont =
  "https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@300..700&family=Plus+Jakarta+Sans:wght@300..700&display=swap";

const themeScript = `
try {
  var t = localStorage.getItem("ramaa-theme");
  if (!t) t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = t;
  if (sessionStorage.getItem("ramaa-seen")) document.documentElement.classList.add("seen");
  sessionStorage.setItem("ramaa-seen", "1");
} catch (e) {}
document.documentElement.classList.add("js");
`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/Zarathustra.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/GeistMono.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={sansFont} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
