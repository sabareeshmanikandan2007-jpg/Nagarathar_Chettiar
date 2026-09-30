"use client";

import Link from "next/link";
import { Hero3D } from "@/components/Hero3DDynamic";

export default function SplashPage() {
  return (
    <main className="kolam-bg relative flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
      <div className="absolute inset-x-0 top-0 h-2 silk-shimmer" />
      <p className="font-[family-name:var(--font-tamil)] text-[#e4c96a]">நகரத்தார் கல்யாணம்</p>
      <h1 className="mt-2 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-tight text-[#f6efd9] md:text-6xl">
        Nagarathar Kalyanam
      </h1>
      <p className="mt-3 text-lg text-[#e4c96a]">Nattukottai Chettiar Wedding Preparation</p>
      <p className="mt-4 max-w-xl text-[#f6efd9]/90">
        Two families. One sacred journey. Walk the Chettiar marriage from A to Z — with calm, with elders, with
        Meyyappan beside you.
      </p>
      <div className="mt-8 w-full max-w-3xl">
        <Hero3D mode="welcome" fallbackLabel="A gold kolam for your welcome" />
      </div>
      <Link
        href="/choose"
        className="mt-10 rounded-full bg-[#c9a227] px-10 py-3 font-[family-name:var(--font-display)] text-lg text-[#1c1410] shadow-lg"
      >
        Enter
      </Link>
    </main>
  );
}
