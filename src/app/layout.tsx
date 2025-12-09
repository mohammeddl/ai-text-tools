import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import ClientLayout from "@/components/Layout/ClientLayout";
export const metadata: Metadata = {
  title: "AI Text Tools - Transform and Generate Text with AI Power",
  description:
    "AI Text Tools allows users to transform and generate text quickly and efficiently with manual utilities and AI-powered features.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <ClientLayout>{children}</ClientLayout>
    </ViewTransitions>
  );
}
