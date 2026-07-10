import type { Metadata } from "next";
import Link from "next/link";
import CountUp from "@/shared/CountUp";
import MotionCard from "@/shared/MotionCard";
import DataPipeline from "./(components)/DataPipeline";
import FadeIn from "@/shared/FadeIn";
import Footer from "@/shared/Footer";
import Header from "@/shared/Header";
import Icon from "@/shared/Icon";
import Reveal from "@/shared/Reveal";
import T from "@/shared/T";
import { dataLayers } from "@/lib/content";
import { digitalHero, digitalStats } from "@/lib/digital";
import { tr, DEFAULT_LANG } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Цифровой регион — Smart Aqmola",
  description: tr(digitalHero.subtitle, DEFAULT_LANG),
};

export default function DigitalPage() {
  return (
    <>
      <Header />
      <main className="pb-4">
        <div className="container-content space-y-8 pb-4 pt-2">
          {/* Hero */}
          <section>
            <div className="relative overflow-hidden rounded-2xl2 border border-line bg-gradient-to-br from-white via-white to-primary-soft/50 px-5 py-8 shadow-card sm:px-9 sm:py-10">
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-float" />
              <div
                className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-purple/10 blur-3xl animate-float"
                style={{ animationDelay: "1.5s" }}
              />
              <div className="relative max-w-3xl">
                <FadeIn as="nav" className="flex items-center gap-1.5 text-[12px] font-semibold text-ink-faint">
                  <Link href="/" className="transition-colors hover:text-primary">
                    <T ru="Главная" kk="Басты бет" />
                  </Link>
                  <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
                  <span className="text-ink-soft"><T ru="Цифровой регион" kk="Цифрлық өңір" /></span>
                </FadeIn>

                <FadeIn delay={60} className="mt-5 flex items-start gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-btn">
                    <Icon name="cube" className="h-7 w-7" />
                  </span>
                  <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[42px]">
                    <T s={digitalHero.title} />
                  </h1>
                </FadeIn>

                <FadeIn as="p" delay={120} className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                  <T s={digitalHero.subtitle} />
                </FadeIn>

                <FadeIn delay={180} className="mt-7 flex flex-wrap gap-3">
                  {digitalHero.cta.map((b) => (
                    <a
                      key={b.label.ru}
                      href="#"
                      className={b.primary ? "btn-primary" : "btn-white"}
                    >
                      <Icon name={b.icon} className="h-5 w-5" />
                      <T s={b.label} />
                    </a>
                  ))}
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Поток данных */}
          <section>
            <div className="mb-4 flex items-center justify-between px-1">
              <h2 className="section-label"><T ru="Как работает платформа — поток данных" kk="Платформа қалай жұмыс істейді — деректер ағыны" /></h2>
              <span className="hidden items-center gap-1.5 text-[12px] font-semibold text-primary sm:flex">
                <span className="h-1.5 w-1.5 animate-pulse2 rounded-full bg-green" />
                <T ru="данные в реальном времени" kk="нақты уақыттағы деректер" />
              </span>
            </div>
            <DataPipeline />
          </section>

          {/* Слои данных */}
          <section>
            <h2 className="section-label mb-4 px-1"><T ru="Слои данных на платформе" kk="Платформадағы деректер қабаттары" /></h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {dataLayers.map((d, i) => (
                <Reveal key={d.label.ru} delay={i * 50}>
                  <div className="card flex h-full items-center gap-3 p-3 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-card">
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white"
                      style={{ backgroundColor: d.color }}
                    >
                      <Icon name={d.icon} className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[12px] font-semibold text-ink">
                        <T s={d.label} />
                      </div>
                      <div className="text-[15px] font-extrabold text-ink">
                        <CountUp value={d.value} />
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Статистика */}
          <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {digitalStats.map((s, i) => (
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

          {/* Назад */}
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
