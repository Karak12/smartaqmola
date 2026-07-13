"use client";

import Link from "next/link";
import CountUp from "@/shared/CountUp";
import FadeIn from "@/shared/FadeIn";
import Icon from "@/shared/Icon";
import MotionCard from "@/shared/MotionCard";
import Reveal from "@/shared/Reveal";
import { Stagger, StaggerItem } from "@/shared/Stagger";
import {
  procurementGroupsMeta,
  procurementHero,
  procurementStats,
} from "@/lib/procurement";
import { useLang } from "@/lib/i18n-context";
import { useContent } from "@/lib/admin/store";
import { fileUrl } from "@/lib/api";

export default function ProcurementView() {
  const { t } = useLang();
  const { procurement } = useContent();
  // Группируем плоский список документов по groupKey, заголовки берём из меты.
  const groups = procurementGroupsMeta
    .map((meta) => ({
      ...meta,
      items: procurement.filter((d) => d.groupKey === meta.key),
    }))
    .filter((g) => g.items.length > 0);
  return (
    <div className="container-content space-y-8 pb-4 pt-2">
      {/* Hero */}
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
                {t({ ru: "Главная", kk: "Басты бет" })}
              </Link>
              <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
              <span className="text-ink-soft">{t(procurementHero.breadcrumb)}</span>
            </FadeIn>

            <FadeIn delay={60} className="mt-5 flex items-start gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-btn">
                <Icon name="doc" className="h-7 w-7" />
              </span>
              <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[42px]">
                {t(procurementHero.title)}
              </h1>
            </FadeIn>

            <FadeIn as="p" delay={120} className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              {t(procurementHero.subtitle)}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {procurementStats.map((s) => (
          <StaggerItem key={s.label.ru}>
            <MotionCard className="card h-full p-5 hover:shadow-card">
              <div className="text-3xl font-extrabold tracking-tight text-ink">
                <CountUp value={s.value} />
              </div>
              <div className="mt-1.5 text-[12px] font-medium text-ink-soft">
                {t(s.label)}
              </div>
            </MotionCard>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Группы документов */}
      {groups.map((group) => (
        <section key={group.key}>
          <Reveal className="card p-5 sm:p-6">
            <div className="mb-5 flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <Icon name={group.icon} className="h-6 w-6" />
              </span>
              <h2 className="text-[17px] font-extrabold leading-snug tracking-tight text-ink sm:text-[19px]">
                {t(group.title)}
              </h2>
            </div>
            <Stagger as="ul" className="divide-y divide-line">
              {group.items.map((item) => {
                const href = fileUrl(item.fileKey) ?? "#";
                const hasFile = Boolean(item.fileKey);
                return (
                <StaggerItem key={item.id} as="li">
                  <a
                    href={href}
                    target={hasFile ? "_blank" : undefined}
                    rel={hasFile ? "noreferrer" : undefined}
                    className="group flex items-center gap-3 py-3 transition-colors"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-page text-ink-soft transition-colors group-hover:bg-primary-soft group-hover:text-primary">
                      <Icon name="doc" className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-semibold text-ink transition-colors group-hover:text-primary">
                        {t(item.label)}
                      </div>
                      {item.meta && (
                        <div className="mt-0.5 text-[12px] text-ink-faint">
                          {t(item.meta)}
                        </div>
                      )}
                    </div>
                    {item.badge && (
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          item.badge.ru === "Активен"
                            ? "bg-green/10 text-green"
                            : "bg-ink-faint/10 text-ink-faint"
                        }`}
                      >
                        {t(item.badge)}
                      </span>
                    )}
                    <Icon
                      name="arrow-up-right"
                      className="h-4 w-4 shrink-0 text-ink-faint transition-colors group-hover:text-primary"
                      strokeWidth={2}
                    />
                  </a>
                </StaggerItem>
                );
              })}
            </Stagger>
          </Reveal>
        </section>
      ))}

      <div className="px-1">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition-colors hover:text-primary-deep"
        >
          <Icon name="arrow-right" className="h-4 w-4 rotate-180" strokeWidth={2} />
          {t({ ru: "На главную", kk: "Басты бетке" })}
        </Link>
      </div>
    </div>
  );
}
