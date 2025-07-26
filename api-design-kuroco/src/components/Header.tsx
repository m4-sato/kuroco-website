export default function Header({
  title = "AI活用ポータル",
  sub = "AIを活用してビジネスを変革させる",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <header className="w-full bg-white border-b border-slate-200">
      <div className="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-8 py-4">
        <h1 className="text-2xl font-extrabold">{title}</h1>
        {!!sub && <p className="mt-1 text-sm text-slate-600">{sub}</p>}
      </div>
    </header>
  );
}
