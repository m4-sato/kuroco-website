import "@/app/globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI活用ポータル",
  description: "AI を活用してビジネスを変革させる",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
