import type { Metadata } from "next";
import Link from "next/link";
import CountUp from "@/shared/CountUp";
import Footer from "@/shared/Footer";
import Header from "@/shared/Header";
import Icon from "@/shared/Icon";
import MotionCard from "@/shared/MotionCard";
import Reveal from "@/shared/Reveal";
import ResidentsFeatures from "./(components)/ResidentsFeatures";
import ResidentsFlow from "./(components)/ResidentsFlow";
import ResidentsShowcase from "./(components)/ResidentsShowcase";
import T from "@/shared/T";
import { residentsStats } from "@/lib/residents";

export const metadata: Metadata = {
  title: "Сервисы для жителей — Smart Aqmola",
  description:
    "Обращайтесь, отслеживайте статус заявок и находите готовые ответы — всё цифровое взаимодействие с акиматом Акмолинской области в одном месте.",
};

export default function ResidentsPage() {
  return (
    <>
      <Header />
      <main className="pb-4">
        <div className="container-content space-y-8 pb-4 pt-2">
          <section>
            <ResidentsShowcase />
          </section>

          <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {residentsStats.map((s, i) => (
              <Reveal key={s.label.ru} delay={i * 70}>
                <MotionCard className="card h-full p-5 hover:shadow-card">
                  <div className="text-3xl font-extrabold tracking-tight text-ink">
                    <CountUp value={s.value} />
                  </div>
                  <div className="mt-1.5 text-[12px] font-medium text-ink-soft">
                    <T s={s.label} />
                  </div>
                </MotionCard>
              </Reveal>
            ))}
          </section>

          <ResidentsFeatures />
          <ResidentsFlow />

          <section className="grid gap-6 lg:grid-cols-[3fr_2fr]">
            <Reveal className="relative overflow-hidden rounded-2xl2 border border-line bg-gradient-to-br from-[#050505] via-[#0D0D12] to-[#1A1033] p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#C4B5FD]/10 blur-3xl" />
              <div className="relative">
                <span className="font-mono text-[11px] tracking-widest text-[#C4B5FD]/60">
                  &gt; <T ru="КАРТА ПРОБЛЕМ" kk="МӘСЕЛЕЛЕР КАРТАСЫ" />
                </span>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  <T ru="Отметьте проблему на карте" kk="Мәселені картада белгілеңіз" />
                </h2>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/50">
                  <T
                    ru="ЖКХ, дороги, освещение, благоустройство — жители отмечают проблемы на интерактивной карте, а акимат видит их в реальном времени."
                    kk="ТКШ, жолдар, жарық, абаттандыру — тұрғындар мәселелерді интерактивті картада белгілейді, ал әкімдік оларды нақты уақытта көреді."
                  />
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    { ru: "ЖКХ", kk: "ТКШ" },
                    { ru: "Дороги", kk: "Жолдар" },
                    { ru: "Освещение", kk: "Жарық" },
                    { ru: "Благоустройство", kk: "Абаттандыру" },
                  ].map((tag) => (
                    <span
                      key={tag.ru}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] tracking-wide text-white/60"
                    >
                      <T s={tag} />
                    </span>
                  ))}
                </div>
                <a href="#" className="btn-primary mt-6 inline-flex">
                  <Icon name="map" className="h-5 w-5" />
                  <T ru="Открыть карту" kk="Картаны ашу" />
                </a>
              </div>
            </Reveal>

            <Reveal className="card flex flex-col p-5 sm:p-6" delay={120}>
              <h2 className="section-label mb-2"><T ru="Единый контакт-центр" kk="Бірыңғай байланыс орталығы" /></h2>
              <p className="text-[13px] leading-relaxed text-ink-soft">
                <T ru="Круглосуточная поддержка жителей Акмолинской области." kk="Ақмола облысы тұрғындарына тәулік бойы қолдау." />
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  { icon: "chat" as const, label: { ru: "iKomek", kk: "iKomek" }, value: { ru: "109", kk: "109" } },
                  { icon: "clock" as const, label: { ru: "Часы работы", kk: "Жұмыс уақыты" }, value: { ru: "24/7", kk: "24/7" } },
                  {
                    icon: "map" as const,
                    label: { ru: "Приёмная", kk: "Қабылдау бөлмесі" },
                    value: { ru: "г. Кокшетау, ул. Ч. Валиханова", kk: "Көкшетау қ., Ш. Уәлиханов к-сі" },
                  },
                ].map((c) => (
                  <li key={c.label.ru} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                      <Icon name={c.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium text-ink-faint">
                        <T s={c.label} />
                      </div>
                      <div className="truncate text-[13px] font-semibold text-ink">
                        <T s={c.value} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <a href="#" className="btn-primary mt-6 w-full">
                <T ru="Написать в поддержку" kk="Қолдауға жазу" />
                <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
              </a>
            </Reveal>
          </section>

          <div className="px-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition-colors hover:text-primary-deep"
            >
              <Icon name="arrow-right" className="h-4 w-4 rotate-180" strokeWidth={2} />
              <T ru="На главную" kk="Басты бетке" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
