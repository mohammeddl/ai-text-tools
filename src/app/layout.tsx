import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Text Tools",
  description: "Digital Agency",
};

import Preloader from "@/layout/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Preloader />
      {children}
    </>
  );
}
