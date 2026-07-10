"use client";

import { motion } from "motion/react";
import Icon from "@/shared/Icon";
import Reveal from "@/shared/Reveal";
import { Stagger, StaggerItem } from "@/shared/Stagger";
import { services } from "@/lib/content";
import { springSnappy } from "@/lib/motion";
import { useLang } from "@/lib/i18n-context";
import { useContent } from "@/lib/admin/store";

export default function NewsAndServices() {
  const { t } = useLang();
  const { news } = useContent();
  return (
    <section id="news" className="container-content grid scroll-mt-24 gap-6 pt-4 lg:grid-cols-[3fr_2fr]">
      <Reveal className="card p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="section-label">{t({ ru: "Новости", kk: "Жаңалықтар" })}</h2>
          <motion.a
            href="#"
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary"
            whileHover={{ x: 3 }}
            transition={springSnappy}
          >
            {t({ ru: "Все новости", kk: "Барлық жаңалықтар" })}
            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
          </motion.a>
        </div>
        <Stagger className="grid gap-5 sm:grid-cols-3">
          {news.map((n) => (
            <StaggerItem key={n.id} as="article" className="flex gap-3 sm:flex-col">
              <motion.div
                className="group h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-full"
                style={{
                  background: `linear-gradient(135deg, ${n.tone}, #12203D)`,
                }}
                whileHover={{ scale: 1.04 }}
                transition={springSnappy}
              >
                <motion.div
                  className="map-net h-full w-full opacity-40"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
              <div>
                <div className="text-[11px] font-medium text-ink-faint">
                  {t(n.date)}
                </div>
                <h3 className="mt-1 text-[13px] font-bold leading-snug text-ink">
                  {t(n.title)}
                </h3>
                <motion.a
                  href="#"
                  className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-primary"
                  whileHover={{ x: 3 }}
                  transition={springSnappy}
                >
                  {t({ ru: "Читать далее", kk: "Толығырақ" })}
                  <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
                </motion.a>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>

      <Reveal className="card p-5 sm:p-6" delay={120}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="section-label">{t({ ru: "Популярные сервисы", kk: "Танымал сервистер" })}</h2>
          <motion.a
            href="#"
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary"
            whileHover={{ x: 3 }}
            transition={springSnappy}
          >
            {t({ ru: "Все сервисы", kk: "Барлық сервистер" })}
            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
          </motion.a>
        </div>
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.label.ru}>
              <motion.a
                href="#"
                className="group flex items-center gap-3 rounded-xl border border-line bg-white p-3"
                whileHover={{
                  y: -4,
                  borderColor: "rgba(37,99,235,0.4)",
                  backgroundColor: "rgba(234,241,254,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={springSnappy}
              >
                <motion.span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white"
                  whileHover={{ rotate: -6, scale: 1.05 }}
                >
                  <Icon name={s.icon} className="h-5 w-5" />
                </motion.span>
                <span className="text-[12px] font-semibold leading-tight text-ink">
                  {t(s.label)}
                </span>
              </motion.a>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>
    </section>
  );
}
