// src/components/Header.tsx
export default function Header({ title, sub }: { title: string; sub: string }) {
  return (
    <header className="shadow">
      {/* ①タイトル行：黄色 */}
      <div className="bg-yellow-100 px-6 py-3">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      {/* ②サブタイトル行：ピンク */}
      <div className="bg-rose-100 px-6 py-2 text-sm">{sub}</div>
    </header>
  );
}
