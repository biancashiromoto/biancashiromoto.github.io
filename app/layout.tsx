import CommonLayout from "./CommonLayout";
import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/src/context/LanguageContext";
import { WindowResizeProvider } from "@/src/context/WindowResizeProvider";

export const metadata: Metadata = {
  title: "Bianca Shiromoto",
  description: "Portfolio website for Bianca Shiromoto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WindowResizeProvider>
          <LanguageProvider>
            <CommonLayout>{children}</CommonLayout>
          </LanguageProvider>
        </WindowResizeProvider>
      </body>
    </html>
  );
}
