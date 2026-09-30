import Link from "next/link";
import { DISCLAIMER } from "@/lib/content";

const LETTERS: { letter: string; title: string; note: string; href?: string }[] = [
  { letter: "A", title: "Arrival & Azhaippu", note: "Welcoming the groom and his family.", href: "/ponnu/mappillai-azhaippu" },
  { letter: "B", title: "Blessings", note: "Elders’ blessings and family prayers.", href: "/ponnu/send-off" },
  { letter: "C", title: "Clan & Temple", note: "Lineage and kuladeivam context before dates are locked.", href: "/mappillai/clan-temple" },
  { letter: "D", title: "Seer tradition", note: "Explain ceremonial gifts as blessing, never as a fixed demand.", href: "/ponnu/seer-display" },
  { letter: "E", title: "Elders", note: "Parents and pankalis guide decisions and the welcome.", href: "/mappillai/clan-temple" },
  { letter: "F", title: "Family", note: "The wedding joins two houses, not only two people.", href: "/choose" },
  { letter: "G", title: "Garlands", note: "Maalai maatral — public acceptance.", href: "/ponnu/maalai-maatral" },
  { letter: "H", title: "Homam", note: "Sacred fire when your priest includes it.", href: "/ponnu/muhurtham" },
  { letter: "I", title: "Invitation", note: "Tamil and English wording; invite elders in person.", href: "/mappillai/invitation" },
  { letter: "J", title: "Jewellery", note: "Chain, salavai gold, and the ceremonial set.", href: "/mappillai/prepare-mappillai" },
  { letter: "K", title: "Kaluthiru", note: "The Nattukottai Chettiar marriage necklace.", href: "/ponnu/kaluthiru" },
  { letter: "L", title: "Ladies’ ceremonies", note: "Songs, nalangu, and women’s ritual work.", href: "/ponnu/nalangu" },
  { letter: "M", title: "Mappillai, Muhurtham, Moi", note: "Groom welcome, the sacred hour, and guest gifts.", href: "/mappillai/muhurtham" },
  { letter: "N", title: "Nalangu", note: "Pre-wedding turmeric, play, and blessing.", href: "/ponnu/nalangu" },
  { letter: "O", title: "Oonjal", note: "The couple on a decorated swing.", href: "/ponnu/oonjal" },
  { letter: "P", title: "Pillayar worship", note: "Prayer before the procession, where the family follows it.", href: "/mappillai/temple-procession" },
  { letter: "Q", title: "Questions & family customs", note: "Practices vary. Ask your elders and priest.", href: "/checklist" },
  { letter: "R", title: "Reception", note: "A modern gathering after the sacred ceremony.", href: "/mappillai/feast-blessings" },
  { letter: "S", title: "Seer / Sir varisai", note: "Trays of clothing, jewellery, and household articles.", href: "/mappillai/seer-gifts" },
  { letter: "T", title: "Temple traditions", note: "Clan temple and family religious custom.", href: "/ponnu/clan-temple" },
  { letter: "U", title: "Uppu eduththal", note: "Historical salt-carrying ceremony, often symbolic today.", href: "/mappillai/uppu-eduththal" },
  { letter: "V", title: "Veththilai / betel", note: "Historical ceremonial gifting with auspicious leaves.", href: "/mappillai/uppu-eduththal" },
  { letter: "W", title: "Wedding feast", note: "Shared food and hospitality.", href: "/ponnu/moi-feast" },
  { letter: "X", title: "Heritage look", note: "Chettinad architecture, jewellery, music, and crimson-gold colour.", href: "/mappillai" },
  { letter: "Y", title: "Young couple", note: "Blessings, rest, and the new household.", href: "/mappillai/grihapravesham" },
  { letter: "Z", title: "Zero to finish", note: "From alliance talks to post-wedding family rituals.", href: "/checklist" },
];

export default function AzPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#a51c30]">A to Z</h1>
      <p className="mt-3 max-w-2xl text-[#5c4e42]">
        A cultural map of a Nattukottai Nagarathar wedding. Open a letter to reach the matching Mappillai or Ponnu
        procedure. This is a guide, not a rule every family follows.
      </p>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2">
        {LETTERS.map((item) => (
          <li key={item.letter}>
            <Link href={item.href || "/choose"} className="gold-border block rounded-2xl bg-white/70 p-4 hover:bg-white">
              <span className="font-[family-name:var(--font-display)] text-2xl text-[#c9a227]">{item.letter}</span>
              <span className="mt-1 block font-medium">{item.title}</span>
              <span className="mt-1 block text-sm text-[#5c4e42]">{item.note}</span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-xs leading-5 text-[#5c4e42]">{DISCLAIMER}</p>
    </main>
  );
}
