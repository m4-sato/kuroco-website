// src/components/Footer.tsx
export default function Footer({ copy }: { copy: string }) {
  return (
    <footer className="bg-gray-200 text-center py-3 text-xs">{copy}</footer>
  );
}
