import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { HEADER_MENU_ITEMS } from "@/utils/constants";
import { RootProvider } from "@/context/RootContext";
import { PopupProvider } from "@/context/PopupContext";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Richa Sharma K",
  description: "A certified numerologist",
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
        <RootProvider>
          <PopupProvider>
            <Header
              title="Vagmi Richa Vishwajiet"
              menuItems={HEADER_MENU_ITEMS}
            />

            <Suspense>{children}</Suspense>
          </PopupProvider>
        </RootProvider>
      </body>
    </html>
  );
}
