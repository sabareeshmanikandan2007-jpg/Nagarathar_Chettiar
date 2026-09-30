import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Noto_Sans_Tamil } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const display = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const tamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Nagarathar Kalyanam — Chettiar Wedding Preparation",
  description:
    "A-to-Z Nattukottai Nagarathar / Chettiar wedding guide for Mappillai Veedu and Ponnu Veedu, with Meyyappan as your family guide.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, title: "Nagarathar Kalyanam" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#A51C30",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${tamil.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
