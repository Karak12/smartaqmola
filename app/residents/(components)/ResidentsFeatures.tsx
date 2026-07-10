"use client";

import { motion, type Variants } from "motion/react";
import Icon from "@/shared/Icon";
import { residentsFeatures } from "@/lib/residents";
import { springSnappy, staggerContainer, staggerItem } from "@/lib/motion";
import { useLang } from "@/lib/i18n-context";

const item: Variants = {
  ...staggerItem,
  visible: {
    ...staggerItem.visible,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ResidentsFeatures() {
  const { t } = useLang();
  return (
    <section id="services">
      <h2 className="section-label mb-4 px-1">{t({ ru: "Что доступно жителям", kk: "Тұрғындарға не қолжетімді" })}</h2>
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      >
        {residentsFeatures.map((f) => (
          <motion.a
            key={f.title.ru}
            href="#"
            variants={item}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={springSnappy}
            className="group relative overflow-hidden rounded-xl2 border border-line bg-card p-5 shadow-soft transition-shadow hover:shadow-card"
          >
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-[0.08] blur-2xl transition-opacity group-hover:opacity-[0.16]"
              style={{ backgroundColor: f.color }}
            />
            <span
              className="mb-4 grid h-11 w-11 place-items-center rounded-xl text-white shadow-btn transition-transform group-hover:scale-110"
              style={{ backgroundColor: f.color }}
            >
              <Icon name={f.icon} className="h-6 w-6" />
            </span>
            <h3 className="text-[15px] font-bold text-ink">{t(f.title)}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
              {t(f.text)}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
              {t({ ru: "Открыть", kk: "Ашу" })}
              <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
