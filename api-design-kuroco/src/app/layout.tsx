import { getHeaderTitle, getSubTitle, getCopyright } from "@/lib/kuroco";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [title, sub, copy] = await Promise.all([
    getHeaderTitle(),
    getSubTitle(),
    getCopyright(),
  ]);

  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col">
        <Header title={title} sub={sub} />
        <main className="flex-1">{children}</main>
        <Footer copy={copy} />
      </body>
    </html>
  );
}
