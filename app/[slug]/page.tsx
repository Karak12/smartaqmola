import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionPage from "@/components/SectionPage";
import { getPage, pages } from "@/lib/pages";

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
    title: `${data.title} — Smart Aqmola`,
    description: data.subtitle,
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
