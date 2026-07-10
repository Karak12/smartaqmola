import type { Metadata } from "next";
import Footer from "@/shared/Footer";
import Header from "@/shared/Header";
import ProcurementView from "./(components)/ProcurementView";
import { procurementHero } from "@/lib/procurement";
import { tr, DEFAULT_LANG } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `${tr(procurementHero.title, DEFAULT_LANG)} — Smart Aqmola`,
  description: tr(procurementHero.subtitle, DEFAULT_LANG),
};

export default function ProcurementPage() {
  return (
    <>
      <Header />
      <main className="pb-4">
        <ProcurementView />
      </main>
      <Footer />
    </>
  );
}
