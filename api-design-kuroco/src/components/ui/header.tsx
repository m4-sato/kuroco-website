import { getSettings } from "@/lib/kuroco";

export default async function Header() {
  const s = await getSettings();
  return (
    <header>
      <div className="bg-yellow-100 text-center py-2 text-lg font-bold">
        {s.header_title}
      </div>
      <div className="bg-pink-100 text-center py-1 text-sm">{s.sub_title}</div>
    </header>
  );
}
