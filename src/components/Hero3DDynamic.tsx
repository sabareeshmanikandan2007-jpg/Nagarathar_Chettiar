"use client";

import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("@/components/Hero3D").then((m) => m.Hero3D), {
  ssr: false,
  loading: () => (
    <div className="gold-border mx-auto flex h-64 max-w-3xl items-center justify-center rounded-3xl silk-shimmer md:h-80">
      <p className="font-[family-name:var(--font-display)] text-xl text-[#f6efd9]">Opening the ceremonial hall…</p>
    </div>
  ),
});

export { Hero3D };
