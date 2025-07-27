import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI活用ポータル",
  description: "AI を活用してビジネスを変革させる",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-background font-sans">
        <Header />
        <main className="max-w-[1280px] mx-auto px-6 py-8 md:py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
