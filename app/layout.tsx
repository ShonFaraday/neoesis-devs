import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./neoesis.css";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { GOOGLE_SITE_VERIFICATION, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Neoesis DEVS®",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Neoesis DEVS®",
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Neoesis DEVS®",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  ...(GOOGLE_SITE_VERIFICATION ? { verification: { google: GOOGLE_SITE_VERIFICATION } } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={poppins.variable} data-scroll-behavior="smooth">
      <body className={poppins.className}>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
