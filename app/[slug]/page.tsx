import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/shared/Footer";
import Header from "@/shared/Header";
import SectionPage from "./(components)/SectionPage";
import { getPage, pages } from "@/lib/pages";
import { tr, DEFAULT_LANG } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const data = getPage(params.slug);
  if (!data) return {};
  return {
    title: `${tr(data.title, DEFAULT_LANG)} — Smart Aqmola`,
    description: tr(data.subtitle, DEFAULT_LANG),
  };
}

export default function SectionRoute({
  params,
}: {
  params: { slug: string };
}) {
  const data = getPage(params.slug);
  if (!data) notFound();

  return (
    <>
      <Header />
      <main className="pb-4">
        <SectionPage data={data} />
      </main>
      <Footer />
    </>
  );
}
