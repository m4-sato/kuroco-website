"use client";

import { Case } from "@/types";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

export default function HeroCasesCarousel({ cases }: { cases: Case[] }) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
  });

  return (
    <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden">
      {cases.map((c) => (
        <div key={c.topics_id} className="keen-slider__slide relative h-64">
          <Image
            src={c.thumbnail_img?.public_path ?? "/file.svg"}
            alt={c.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-end p-4">
            <h3 className="text-white text-lg font-semibold">{c.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
