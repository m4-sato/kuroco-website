// src/app/layout.tsx
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="font-sans bg-slate-50 text-black flex flex-col min-h-screen">
        <Header />
        <main className="w-full max-w-screen-lg mx-auto px-4 md:px-6 lg:px-8 py-8 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
