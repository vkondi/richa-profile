import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { APP_TITLE, HEADER_MENU_ITEMS } from "@/utils/constants";
import { RootProvider } from "@/context/RootContext";
import { PopupProvider } from "@/context/PopupContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: APP_TITLE,
  description: "A certified numerologist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cloudflareToken = process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN;

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <RootProvider>
            <PopupProvider>
              <Header
                title="Vagmi Richa Vishwajiet"
                menuItems={HEADER_MENU_ITEMS}
              />
              <Suspense>{children}</Suspense>
              <ThemeToggle />
            </PopupProvider>
          </RootProvider>
        </ThemeProvider>

        {/* Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${cloudflareToken}"}`}
        ></script>
        {/* End Cloudflare Web Analytics */}
      </body>
    </html>
  );
}
