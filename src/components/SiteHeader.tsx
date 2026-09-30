"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/app-context";

export function SiteHeader() {
  const path = usePathname();
  const { user, progress, openCount } = useApp();
  if (path === "/") return null;
  const house = progress.house;
  const open = house ? openCount(house) : 0;

  return (
    <header className="sticky top-0 z-30 border-b border-[#c9a227]/50 bg-[#f6efd9]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/choose" className="font-[family-name:var(--font-display)] text-lg tracking-wide text-[#a51c30]">
          Nagarathar Kalyanam
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-3 text-sm font-medium text-[#5c4e42]">
          {house === "mappillai" && (
            <Link className="hover:text-[#a51c30]" href="/mappillai">
              Mappillai Veedu
            </Link>
          )}
          {house === "ponnu" && (
            <Link className="hover:text-[#a51c30]" href="/ponnu">
              Ponnu Veedu
            </Link>
          )}
          <Link className="hover:text-[#a51c30]" href="/choose">
            Veedu
          </Link>
          <Link className="hover:text-[#a51c30]" href="/az">
            A–Z
          </Link>
          <Link className="hover:text-[#a51c30]" href="/checklist">
            Checklist{open ? ` (${open})` : ""}
          </Link>
          <Link className="hover:text-[#a51c30]" href="/pricing">
            Pricing
          </Link>
          <Link className="rounded-full border border-[#c9a227] px-3 py-1 text-[#a51c30]" href="/login">
            {user ? user.name : "Login"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
