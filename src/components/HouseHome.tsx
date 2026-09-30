"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Hero3D } from "@/components/Hero3DDynamic";
import { useApp } from "@/lib/app-context";
import { DISCLAIMER, ceremoniesFor, type HouseId } from "@/lib/content";

export function HouseHome({ house }: { house: HouseId }) {
  const { setHouse } = useApp();
  useEffect(() => {
    setHouse(house);
  }, [house, setHouse]);

  const list = ceremoniesFor(house);
  const isGroom = house === "mappillai";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <p className="text-sm text-[#c9a227]">{isGroom ? "மப்பிள்ளை வீடு" : "பொண்ணு வீடு"}</p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#a51c30]">
        {isGroom ? "Mappillai Veedu" : "Ponnu Veedu"}
      </h1>
      <p className="mt-2 max-w-2xl text-[#5c4e42]">
        {isGroom
          ? "From clan talks and the groom’s morai, chain and salavai, to azhaippu, muhurtham and welcoming the bride home."
          : "From preparing the bride and seer, to welcoming the mappillai, kaluthiru, hosting, and the send-off."}
      </p>
      <div className="mt-6">
        <Hero3D
          mode={isGroom ? "mappillai" : "ponnu"}
          fallbackLabel={
            isGroom ? "Chettiar morai · gold chain · salavai" : "Kaluthiru — Nagarathar marriage necklace"
          }
        />
      </div>
      <ol className="mt-10 space-y-3">
        {list.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${house}/${c.slug}`}
              className="gold-border flex items-start justify-between gap-4 rounded-2xl bg-white/60 p-4 hover:bg-white"
            >
              <span>
                <span className="text-xs text-[#c9a227]">
                  {c.order}. {c.tamil}
                </span>
                <span className="mt-1 block font-medium text-[#1c1410]">{c.title}</span>
                <span className="mt-1 block text-sm text-[#5c4e42]">{c.summary}</span>
              </span>
              <span className="shrink-0 text-[#a51c30]">Open</span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-xs leading-5 text-[#5c4e42]">{DISCLAIMER}</p>
    </div>
  );
}
