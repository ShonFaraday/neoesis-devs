import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./neoesis.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Neoesis DEVS® — Páginas web que convierten",
  description:
    "Neoesis DEVS® diseña y publica páginas web rápidas, claras y hechas a medida para tu negocio. Escríbenos por WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
