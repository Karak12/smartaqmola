"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import Icon from "@/shared/Icon";
import { springSnappy, staggerContainer, staggerItem } from "@/lib/motion";
import { useLang } from "@/lib/i18n-context";
import type { LS } from "@/lib/i18n";

const steps: {
  step: string;
  icon: "chat" | "doc" | "refresh" | "check-circle";
  color: string;
  title: LS;
  text: LS;
}[] = [
  {
    step: "01",
    icon: "chat",
    color: "#C4B5FD",
    title: { ru: "Опишите проблему", kk: "Мәселені сипаттаңыз" },
    text: {
      ru: "Выберите категорию и укажите адрес или отметку на карте.",
      kk: "Санатты таңдап, мекенжайды немесе картадағы белгіні көрсетіңіз.",
    },
  },
  {
    step: "02",
    icon: "doc",
    color: "#D4A853",
    title: { ru: "Приложите фото", kk: "Фото тіркеңіз" },
    text: {
      ru: "Добавьте снимки и детали — так заявку рассмотрят быстрее.",
      kk: "Суреттер мен мәліметтерді қосыңыз — сонда өтінім тезірек қаралады.",
    },
  },
  {
    step: "03",
    icon: "refresh",
    color: "#2563EB",
    title: { ru: "Отслеживайте статус", kk: "Мәртебені қадағалаңыз" },
    text: {
      ru: "Этапы: принято → в работе → решено.",
      kk: "Кезеңдер: қабылданды → жұмыста → шешілді.",
    },
  },
  {
    step: "04",
    icon: "check-circle",
    color: "#2FAE77",
    title: { ru: "Получите ответ", kk: "Жауап алыңыз" },
    text: {
      ru: "Уведомление придёт на телефон, в бот и личный кабинет.",
      kk: "Хабарлама телефонға, ботқа және жеке кабинетке келеді.",
    },
  },
];

const item: Variants = {
  ...staggerItem,
  visible: {
    ...staggerItem.visible,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ResidentsFlow() {
  const { t } = useLang();
  return (
    <section>
      <div className="mb-4 flex items-center justify-between px-1">
        <h2 className="section-label">{t({ ru: "Как подать обращение", kk: "Өтінішті қалай беруге болады" })}</h2>
        <span className="hidden items-center gap-1.5 font-mono text-[11px] tracking-wide text-ink-faint sm:flex">
          <span className="h-1.5 w-1.5 animate-pulse2 rounded-full bg-green" />
          {t({ ru: "iKomek 109 онлайн", kk: "iKomek 109 онлайн" })}
        </span>
      </div>
      <motion.div
        className="flex flex-col gap-2 md:flex-row md:items-stretch"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      >
        {steps.map((s, i) => (
          <Fragment key={s.step}>
            <motion.div
              variants={item}
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={springSnappy}
              className="card flex w-full flex-col p-5 md:flex-1"
            >
              <div className="mb-4 flex items-center justify-between">
                <motion.span
                  className="grid h-12 w-12 place-items-center rounded-xl text-white shadow-btn"
                  style={{ backgroundColor: s.color }}
                  whileHover={{ rotate: [0, -6, 6, 0], scale: 1.08 }}
                  transition={{ duration: 0.35 }}
                >
                  <Icon name={s.icon} className="h-6 w-6" />
                </motion.span>
                <span className="font-mono text-[32px] font-extrabold leading-none text-ink-faint/30">
                  {s.step}
                </span>
              </div>
              <h3 className="text-[16px] font-bold text-ink">{t(s.title)}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
                {t(s.text)}
              </p>
            </motion.div>

            {i < steps.length - 1 && (
              <motion.div
                className="flex items-center justify-center md:w-12"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 300, damping: 24 }}
              >
                <Icon
                  name="chevron-down"
                  className="h-5 w-5 text-primary/50 md:hidden"
                  strokeWidth={2}
                />
                <div className="hidden items-center md:flex">
                  <span className="relative h-[3px] w-8 overflow-hidden rounded-full bg-line">
                    <motion.span
                      className="flow-track absolute inset-0 text-primary/60"
                      animate={{ backgroundPosition: ["0 0", "22px 0"] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    />
                  </span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon
                      name="arrow-right"
                      className="-ml-1 h-4 w-4 text-primary/70"
                      strokeWidth={2}
                    />
                  </motion.span>
                </div>
              </motion.div>
            )}
          </Fragment>
        ))}
      </motion.div>
    </section>
  );
}
