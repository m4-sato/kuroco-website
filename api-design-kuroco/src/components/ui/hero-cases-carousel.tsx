"use client";

import { Case } from "@/types";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"; // ★ Embla の公式プラグイン
import { useRef } from "react";

type Props = { cases: Case[] };

export default function HeroCasesCarousel({ cases }: Props) {
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));

  if (!cases.length) return null;

  return (
    <Carousel
      plugins={[autoplay.current]}
      className="w-full max-w-3xl mx-auto"
      opts={{ loop: true }}
    >
      <CarouselContent>
        {cases.map((c) => (
          <CarouselItem key={c.topics_id} className="basis-1/2 md:basis-1/3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={c.ext_1.url}
                alt={c.subject}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                priority
              />
            </div>
            <p className="mt-2 text-sm font-medium truncate">{c.subject}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
