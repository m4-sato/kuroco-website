export default function Footer({ copy = "© 2025 All rights reserved." }) {
  return (
    <footer className="w-full bg-slate-100 text-center py-4 text-xs text-slate-500">
      {copy}
    </footer>
  );
}
