"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DISCLAIMER, checklistFor, nextCeremony, type Ceremony, type HouseId } from "@/lib/content";
import { useApp } from "@/lib/app-context";
import { VendorFields } from "@/components/VendorFields";

export function CeremonyView({ house, ceremony }: { house: HouseId; ceremony: Ceremony }) {
  const router = useRouter();
  const { progress, setItemStatus, warnIfVendorIncomplete } = useApp();
  const item = checklistFor(house).find((c) => c.ceremonySlug === ceremony.slug);
  const status = item ? progress.items[item.id] : undefined;
  const nxt = nextCeremony(house, ceremony.slug);

  function goNext() {
    if (ceremony.vendorId) {
      const vendorKeys =
        ceremony.vendorId === "band"
          ? ["troupe", "phone"]
          : ceremony.vendorId === "jewellery"
            ? ["jeweller"]
            : ceremony.vendorId === "catering"
              ? ["caterer"]
              : ["venue"];
      warnIfVendorIncomplete(
        ceremony.vendorId,
        ceremony.vendorId === "band" ? "Nadaswaram & Thavil (Band set)" : "Vendor details",
        vendorKeys,
      );
    }
    if (nxt) router.push(`/${house}/${nxt.slug}`);
    else router.push("/checklist");
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <p className="text-sm tracking-wide text-[#c9a227]">{ceremony.tamil}</p>
      <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl text-[#a51c30] md:text-4xl">{ceremony.title}</h1>
      <p className="mt-3 text-lg text-[#5c4e42]">{ceremony.summary}</p>
      <div className="gold-border relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
        <Image src={ceremony.image} alt={ceremony.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
      </div>
      <section className="mt-6 space-y-4 leading-7">
        <p>{ceremony.meaning}</p>
        <p>
          <strong>Who:</strong> {ceremony.who}
        </p>
        <div>
          <strong>Prepare:</strong>
          <ul className="mt-1 list-disc pl-5">
            {ceremony.materials.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <p className="rounded-xl bg-[#a51c30]/10 p-3 text-sm">
          <strong>Historical / modern note:</strong> {ceremony.historicalNote}
        </p>
        <p className="border-l-4 border-[#c9a227] pl-3 text-sm italic">Meyyappan: {ceremony.meyyappanTip}</p>
        <p className="text-xs text-[#5c4e42]">{DISCLAIMER}</p>
      </section>
      {ceremony.vendorId && <VendorFields vendorId={ceremony.vendorId} />}
      {item && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 rounded-full border border-[#c9a227] bg-white/70 px-4 py-2">
            <input
              type="checkbox"
              checked={status === "done"}
              onChange={(e) => setItemStatus(item.id, e.target.checked ? "done" : "open", item.label)}
            />
            <span>Tick — this work is done</span>
          </label>
          <button
            type="button"
            className="rounded-full border border-[#a51c30] px-4 py-2 text-[#a51c30]"
            onClick={() => {
              setItemStatus(item.id, "skipped", item.label);
              goNext();
            }}
          >
            Skip & go next
          </button>
          <button type="button" className="rounded-full bg-[#a51c30] px-4 py-2 text-[#f6efd9]" onClick={goNext}>
            {nxt ? "Next work" : "Open full checklist"}
          </button>
        </div>
      )}
      <p className="mt-6 text-sm">
        <Link className="text-[#a51c30] underline" href={`/${house}`}>
          Back to {house === "mappillai" ? "Mappillai Veedu" : "Ponnu Veedu"}
        </Link>
      </p>
    </article>
  );
}
