"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { VendorFields } from "@/components/VendorFields";
import { useApp } from "@/lib/app-context";
import { CHECKLIST, VENDORS, checklistFor } from "@/lib/content";

export default function ChecklistPage() {
  const { progress, setHouse, setItemStatus, openCount } = useApp();
  const [view, setView] = useState<"current" | "both">("current");
  const house = progress.house;

  const items = useMemo(() => {
    if (view === "both") return CHECKLIST;
    if (!house) return CHECKLIST;
    return checklistFor(house);
  }, [house, view]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[#a51c30]">Wedding checklist</h1>
      <p className="mt-2 text-[#5c4e42]">
        Tick when a work is finished. Skip if you must move on — Meyyappan will alert you. Fill vendor boxes so
        bookings do not stay empty.
      </p>
      {!house && (
        <p className="mt-4 text-sm">
          Choose a house first:{" "}
          <Link className="text-[#a51c30] underline" href="/choose">
            Mappillai or Ponnu Veedu
          </Link>
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-full border border-[#c9a227] px-3 py-1 text-sm"
          onClick={() => {
            setView("current");
            if (house) setHouse(house);
          }}
        >
          This veedu {house ? `(${openCount(house)} open)` : ""}
        </button>
        <button type="button" className="rounded-full border border-[#c9a227] px-3 py-1 text-sm" onClick={() => setView("both")}>
          Full wedding (both houses)
        </button>
        <button
          type="button"
          className="rounded-full bg-[#a51c30] px-3 py-1 text-sm text-[#f6efd9]"
          onClick={() => window.print()}
        >
          Print / save list
        </button>
      </div>
      <ol className="mt-6 space-y-3">
        {items.map((item, index) => {
          const status = progress.items[item.id] || "open";
          const href = item.ceremonySlug ? `/${item.house === "both" ? house || "mappillai" : item.house}/${item.ceremonySlug}` : undefined;
          return (
            <li key={item.id} className="gold-border rounded-2xl bg-white/60 p-4">
              <div className="flex flex-wrap items-start gap-3">
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={status === "done"}
                    onChange={(e) => setItemStatus(item.id, e.target.checked ? "done" : "open", item.label)}
                  />
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-[#c9a227]">
                      {index + 1}. {item.house === "mappillai" ? "Mappillai" : item.house === "ponnu" ? "Ponnu" : "Both"}
                      {status === "skipped" ? " · skipped" : ""}
                    </span>
                    <span className={status === "done" ? "text-[#5c4e42] line-through" : ""}>{item.label}</span>
                  </span>
                </label>
                <div className="ml-auto flex gap-2">
                  {href && (
                    <Link href={href} className="text-sm text-[#a51c30] underline">
                      Guide
                    </Link>
                  )}
                  <button
                    type="button"
                    className="text-sm text-[#a51c30]"
                    onClick={() => setItemStatus(item.id, "skipped", item.label)}
                  >
                    Skip
                  </button>
                </div>
              </div>
              {item.vendorId && status !== "done" && <VendorFields vendorId={item.vendorId} />}
            </li>
          );
        })}
      </ol>
      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#a51c30]">All vendor boxes</h2>
        {VENDORS.map((v) => (
          <VendorFields key={v.id} vendorId={v.id} />
        ))}
      </section>
    </main>
  );
}