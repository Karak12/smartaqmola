import Link from "next/link";
import CountUp from "./CountUp";
import FadeIn from "./FadeIn";
import Icon from "./Icon";
import MotionCard from "./MotionCard";
import Reveal from "./Reveal";
import { Stagger, StaggerItem } from "./Stagger";
import type { PageData } from "@/lib/pages";

export default function SectionPage({ data }: { data: PageData }) {
  return (
    <div className="container-content space-y-8 pb-4 pt-2">
      <section>
        <div className="relative overflow-hidden rounded-2xl2 border border-line bg-gradient-to-br from-white via-white to-primary-soft/50 px-5 py-8 shadow-card sm:px-9 sm:py-10">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-float" />
          <div
            className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-teal/10 blur-3xl animate-float"
            style={{ animationDelay: "1.5s" }}
          />
          <div className="relative max-w-3xl">
            <FadeIn as="nav" className="flex items-center gap-1.5 text-[12px] font-semibold text-ink-faint">
              <Link href="/" className="transition-colors hover:text-primary">
                Главная
              </Link>
              <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
              <span className="text-ink-soft">{data.breadcrumb}</span>
            </FadeIn>

            <FadeIn delay={60} className="mt-5 flex items-start gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-btn">
                <Icon name={data.icon} className="h-7 w-7" />
              </span>
              <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[42px]">
                {data.title}
              </h1>
            </FadeIn>

            <FadeIn as="p" delay={120} className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              {data.subtitle}
            </FadeIn>

            <FadeIn delay={180} className="mt-7 flex flex-wrap gap-3">
              {data.cta.map((b) => (
                <a
                  key={b.label}
                  href="#"
                  className={b.primary ? "btn-primary" : "btn-white"}
                >
                  <Icon name={b.icon} className="h-5 w-5" />
                  {b.label}
                </a>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {data.stats.map((s) => (
          <StaggerItem key={s.label}>
            <MotionCard className="card h-full p-5 hover:shadow-card">
              <div className="text-3xl font-extrabold tracking-tight text-ink">
                <CountUp value={s.value} />
              </div>
              <div className="mt-1.5 text-[12px] font-medium text-ink-soft">
                {s.label}
              </div>
            </MotionCard>
          </StaggerItem>
        ))}
      </Stagger>

      <section>
        <Reveal as="h2" className="section-label mb-4 px-1">
          {data.featuresLabel}
        </Reveal>
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.features.map((f) => (
            <StaggerItem key={f.title}>
              <MotionCard className="card group flex h-full flex-col p-5 hover:shadow-card">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon name={f.icon} className="h-6 w-6" />
                </span>
                <h3 className="text-[15px] font-bold text-ink">{f.title}</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-ink-soft">
                  {f.text}
                </p>
              </MotionCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <Reveal className="card p-5 sm:p-6">
          <h2 className="section-label mb-5">{data.stepsLabel}</h2>
          <Stagger as="ol" className="space-y-4">
            {data.steps.map((st, i) => (
              <StaggerItem key={st.title} as="li" className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-extrabold text-primary">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[14px] font-bold text-ink">{st.title}</h3>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">
                    {st.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal className="card flex flex-col p-5 sm:p-6" delay={120}>
          <h2 className="section-label mb-2">{data.aside.title}</h2>
          <p className="text-[13px] leading-relaxed text-ink-soft">
            {data.aside.text}
          </p>
          <ul className="mt-5 space-y-3">
            {data.aside.contacts.map((c) => (
              <li key={c.label} className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-ink-faint">
                    {c.label}
                  </div>
                  <div className="truncate text-[13px] font-semibold text-ink">
                    {c.value}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <a href="#" className="btn-primary mt-6 w-full">
            {data.aside.button}
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
          На главную
        </Link>
      </div>
    </div>
  );
}
