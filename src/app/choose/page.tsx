"use client";

import Link from "next/link";
import { useApp } from "@/lib/app-context";

export default function ChoosePage() {
  const { setHouse } = useApp();
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-5xl flex-col justify-center px-4 py-12">
      <h1 className="text-center font-[family-name:var(--font-display)] text-3xl text-[#a51c30] md:text-5xl">
        Whose house are you preparing?
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-center text-[#5c4e42]">
        Choose your path. Procedures, checklist, and Meyyappan’s next ideas follow that veedu — A to Z.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link
          href="/mappillai"
          onClick={() => setHouse("mappillai")}
          className="gold-border group rounded-3xl bg-[#a51c30] p-8 text-[#f6efd9] transition hover:scale-[1.02]"
        >
          <p className="text-sm text-[#e4c96a]">மப்பிள்ளை வீடு</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl">Mappillai Veedu</h2>
          <p className="mt-3 text-[#f6efd9]/90">
            Groom’s attire, morai, procession, nadaswaram, azhaippu, tying the kaluthiru, and welcoming the bride
            home.
          </p>
        </Link>
        <Link
          href="/ponnu"
          onClick={() => setHouse("ponnu")}
          className="gold-border group rounded-3xl bg-[#1c1410] p-8 text-[#f6efd9] transition hover:scale-[1.02]"
        >
          <p className="text-sm text-[#e4c96a]">பொண்ணு வீடு</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl">Ponnu Veedu</h2>
          <p className="mt-3 text-[#f6efd9]/90">
            Bride’s preparation, seer, kolam welcome, nalangu, kaluthiru heritage, hosting, and send-off.
          </p>
        </Link>
      </div>
    </main>
  );
}
