"use client";

import { motion } from "motion/react";
import CountUp from "@/shared/CountUp";
import Icon from "@/shared/Icon";
import { Stagger, StaggerItem } from "@/shared/Stagger";
import { springSnappy } from "@/lib/motion";
import { useLang } from "@/lib/i18n-context";
import { useContent } from "@/lib/admin/store";

export default function Kpis() {
  const { t } = useLang();
  const { kpis } = useContent();
  return (
    <section id="panel" className="container-content scroll-mt-24 pt-8">
      <motion.h2
        className="section-label mb-4 px-1"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t({ ru: "Панель региона — ключевые показатели", kk: "Өңір панелі — негізгі көрсеткіштер" })}
      </motion.h2>
      <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <StaggerItem key={k.id}>
            <motion.div
              className="card h-full p-4"
              whileHover={{ y: -5, boxShadow: "0 12px 32px -12px rgba(24,34,56,0.18)" }}
              whileTap={{ scale: 0.98 }}
              transition={springSnappy}
            >
              <motion.span
                className="mb-4 grid h-9 w-9 place-items-center rounded-full"
                style={{ backgroundColor: `${k.color}1A`, color: k.color }}
                whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
              >
                <Icon name={k.icon} className="h-5 w-5" strokeWidth={1.9} />
              </motion.span>
              <div className="text-xs font-medium text-ink-soft">{t(k.label)}</div>
              <div className="mt-1 text-2xl font-extrabold tracking-tight text-ink">
                <CountUp value={k.value} />
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[11px] text-ink-faint">{t(k.sub)}</span>
                {k.delta && (
                  <motion.span
                    className="text-[11px] font-bold text-green"
                    initial={{ opacity: 0, x: 6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    {k.delta}
                  </motion.span>
                )}
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
