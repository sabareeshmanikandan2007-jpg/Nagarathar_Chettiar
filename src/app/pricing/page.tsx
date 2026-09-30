import Link from "next/link";

const TIERS = [
  {
    name: "Family Guide",
    price: "Free",
    points: [
      "Welcome, both-house overview, and cultural A-to-Z reading",
      "Limited checklist on this device",
      "Meyyappan tips on each ceremony page",
    ],
  },
  {
    name: "Veedu Plan",
    price: "₹4,999",
    points: [
      "Full A-to-Z for one house (Mappillai or Ponnu)",
      "Ordered tick / skip checklist",
      "Skip and leave reminders (when notifications are allowed)",
      "Meyyappan next-task ideas",
    ],
  },
  {
    name: "Full Kalyanam",
    price: "₹9,999",
    points: [
      "Both houses, combined checklist, print / save list",
      "Vendor boxes: nadaswaram, catering, jewellery, mandapam",
      "Progress alerts if details stay empty",
      "Planning support — not a claim that we conduct the marriage",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#a51c30]">Pricing</h1>
      <p className="mt-3 max-w-2xl text-[#5c4e42]">
        Pay for guided preparation: checklists, vendor notes, and Meyyappan’s next steps. Elders and the priest still
        run the sacred ceremony. Amounts can be updated when you start collecting payments.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {TIERS.map((t) => (
          <article key={t.name} className="gold-border flex flex-col rounded-3xl bg-white/70 p-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#a51c30]">{t.name}</h2>
            <p className="mt-2 text-3xl text-[#1c1410]">{t.price}</p>
            <ul className="mt-4 flex-1 list-disc space-y-2 pl-5 text-sm">
              {t.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <Link href="/login" className="mt-6 rounded-full bg-[#a51c30] py-2 text-center text-[#f6efd9]">
              Start with login
            </Link>
          </article>
        ))}
      </div>
      <section className="gold-border mt-10 rounded-3xl p-6">
        <h3 className="font-[family-name:var(--font-display)] text-xl text-[#a51c30]">Elders consult (add-on idea)</h3>
        <p className="mt-2 text-sm text-[#5c4e42]">
          Later you can offer a booked conversation with a Nagarathar elder or family priest for clan-specific
          questions. This site remains a guide, not a substitute for that conversation.
        </p>
      </section>
    </main>
  );
}
