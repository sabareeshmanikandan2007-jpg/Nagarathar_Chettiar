import { notFound } from "next/navigation";
import { CeremonyView } from "@/components/CeremonyView";
import { PONNU_CEREMONIES } from "@/lib/content";

export function generateStaticParams() {
  return PONNU_CEREMONIES.map((c) => ({ slug: c.slug }));
}

export default async function Page({ params }: PageProps<"/ponnu/[slug]">) {
  const { slug } = await params;
  const ceremony = PONNU_CEREMONIES.find((c) => c.slug === slug);
  if (!ceremony) notFound();
  return <CeremonyView house="ponnu" ceremony={ceremony} />;
}
