"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useApp } from "@/lib/app-context";
import { ceremoniesFor, checklistFor, type HouseId } from "@/lib/content";

const REPLIES: { match: RegExp; text: string; href?: string }[] = [
  { match: /price|pay|plan|package/i, text: "Open Pricing. Family Guide is free. Veedu Plan covers one house. Full Kalyanam covers both houses plus vendor boxes.", href: "/pricing" },
  { match: /login|gmail|account/i, text: "Sign in with Gmail or email so your ticks travel with you on phone, tablet, and laptop.", href: "/login" },
  { match: /kaluthiru|thali|necklace/i, text: "Kaluthiru is the Nagarathar marriage necklace. Keep it ready with the priest the day before muhurtham.", href: "/ponnu/kaluthiru" },
  { match: /band|nadaswaram|music|thavil/i, text: "Book nadaswaram and thavil in the Band set box. Empty music details will delay azhaippu.", href: "/checklist" },
  { match: /seer|varisai/i, text: "Seer is blessing and family participation — not a fixed rate card. Sit with elders and write trays, not rumours.", href: "/checklist" },
  { match: /skip|forgot|left|close/i, text: "If you skip a task or close this site, I send a reminder when notifications are allowed. Finish open items before muhurtham." },
];

export function Meyyappan() {
  const path = usePathname();
  const router = useRouter();
  const { progress, nextOpenItem, openCount } = useApp();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [log, setLog] = useState<{ from: "ai" | "you"; text: string }[]>([]);

  const house = progress.house;
  const idea = useMemo(() => {
    if (!house) return "Choose Mappillai Veedu or Ponnu Veedu. I will walk the A-to-Z with you.";
    const upcoming = checklistFor(house)
      .filter((item) => progress.items[item.id] !== "done")
      .slice(0, 3);
    const left = openCount(house);
    if (!upcoming.length) return "All listed work is ticked. Rest, then confirm last details with your priest.";
    return `Next you can plan: ${upcoming.map((item) => item.label).join(" · ")}. ${left} item(s) still open on this veedu.`;
  }, [house, openCount, progress.items]);

  if (path === "/") return null;

  const jumpLinks = () => {
    const links: { href: string; label: string }[] = [
      { href: "/choose", label: "Choose veedu" },
      { href: "/az", label: "A to Z" },
      { href: "/checklist", label: "Checklist" },
      { href: "/pricing", label: "Pricing" },
      { href: "/login", label: "Login" },
    ];
    if (house) {
      links.unshift({ href: `/${house}`, label: house === "mappillai" ? "Mappillai home" : "Ponnu home" });
      const next = nextOpenItem(house);
      const cer = ceremoniesFor(house).find((c) => next && next.label.includes(c.title.slice(0, 12)));
      if (cer) links.unshift({ href: `/${house}/${cer.slug}`, label: "Next ceremony" });
    }
    return links;
  };

  function answer(q: string) {
    const houseId: HouseId | null = house;
    const hit = REPLIES.find((r) => r.match.test(q));
    if (hit) {
      setLog((l) => [...l, { from: "you", text: q }, { from: "ai", text: hit.text }]);
      if (hit.href) router.push(hit.href);
      return;
    }
    if (houseId) {
      const cer = ceremoniesFor(houseId).find(
        (c) => c.title.toLowerCase().includes(q.toLowerCase()) || c.slug.includes(q.toLowerCase().replace(/\s+/g, "-")),
      );
      if (cer) {
        setLog((l) => [...l, { from: "you", text: q }, { from: "ai", text: cer.meyyappanTip }]);
        router.push(`/${houseId}/${cer.slug}`);
        return;
      }
    }
    setLog((l) => [
      ...l,
      { from: "you", text: q },
      { from: "ai", text: `${idea} You can also ask me about kaluthiru, seer, nadaswaram, pricing, or login.` },
    ]);
  }

  const links = jumpLinks();

  return (
    <div className="fixed bottom-4 right-4 z-40 w-[min(100%-2rem,22rem)]">
      {open && (
        <div className="gold-border mb-3 max-h-[70vh] overflow-hidden rounded-2xl bg-[#1c1410] text-[#f6efd9] shadow-2xl">
          <div className="border-b border-[#c9a227]/40 px-4 py-3">
            <p className="font-[family-name:var(--font-display)] text-lg text-[#c9a227]">Meyyappan</p>
            <p className="text-xs text-[#e8dcb8]">Nagarathar wedding guide · not a priest or lawyer</p>
          </div>
          <div className="max-h-56 space-y-2 overflow-y-auto px-4 py-3 text-sm">
            <p className="rounded-xl bg-[#a51c30]/40 p-3">{idea}</p>
            {log.map((m, i) => (
              <p key={i} className={m.from === "ai" ? "rounded-xl bg-[#a51c30]/40 p-3" : "text-right text-[#e4c96a]"}>
                {m.text}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-full border border-[#c9a227] px-2 py-1 text-xs">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <form
            className="flex gap-2 border-t border-[#c9a227]/40 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              const q = input.trim();
              if (!q) return;
              setInput("");
              answer(q);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Meyyappan…"
              className="flex-1 rounded-full bg-[#f6efd9] px-3 py-2 text-sm text-[#1c1410]"
            />
            <button type="submit" className="rounded-full bg-[#c9a227] px-3 text-sm font-semibold text-[#1c1410]">
              Go
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#c9a227] bg-[#a51c30] text-lg font-semibold text-[#f6efd9] shadow-lg"
        aria-label="Open Meyyappan"
      >
        மெய்
      </button>
    </div>
  );
}
