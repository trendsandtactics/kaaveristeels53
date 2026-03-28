import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

function resolveMetadataBase(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://lyfee.in";

  try {
    return new URL(configured);
  } catch {
    return new URL("https://lyfee.in");
  }
}

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: "Premium Steel & TMT Bar Manufacturing",
  description: "High-performance steel manufacturing company showcasing advanced dynamic modules and raw power.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-body antialiased bg-background text-foreground flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
