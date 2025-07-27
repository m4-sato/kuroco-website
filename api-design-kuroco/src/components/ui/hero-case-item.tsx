import Image from "next/image";
import { Case } from "@/types";

export default function HeroCaseItem({ data }: { data: Case }) {
  return (
    <div className="relative flex-shrink-0 w-72 h-40 mr-6 rounded-lg overflow-hidden bg-panelBg">
      <Image
        src={data.thumbnail?.url ?? "/file.svg"}
        alt={data.subject}
        fill
        sizes="288px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-end p-2">
        <p className="text-white text-xs font-medium line-clamp-2 leading-tight">
          {data.subject}
        </p>
      </div>
    </div>
  );
}
