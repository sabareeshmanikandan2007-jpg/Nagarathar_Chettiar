import { notFound } from "next/navigation";
import { CeremonyView } from "@/components/CeremonyView";
import { MAPPILLAI_CEREMONIES } from "@/lib/content";

export function generateStaticParams() {
  return MAPPILLAI_CEREMONIES.map((c) => ({ slug: c.slug }));
}

export default async function Page({ params }: PageProps<"/mappillai/[slug]">) {
  const { slug } = await params;
  const ceremony = MAPPILLAI_CEREMONIES.find((c) => c.slug === slug);
  if (!ceremony) notFound();
  return <CeremonyView house="mappillai" ceremony={ceremony} />;
}
