"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Icon from "@/shared/Icon";
import FadeIn from "@/shared/FadeIn";
import {
  residentTabs,
  residentsCta,
  residentsHero,
  type ResidentTab,
} from "@/lib/residents";
import { easeOut, springSnappy } from "@/lib/motion";
import { useLang } from "@/lib/i18n-context";

export default function ResidentsShowcase() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const cur = residentTabs[active];

  const select = (i: number) => {
    const idx = Math.min(residentTabs.length - 1, Math.max(0, i));
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };

  const slideVariants = {
    enter: (d: number) => ({
      opacity: 0,
      y: d > 0 ? 48 : -48,
      filter: "blur(8px)",
    }),
    center: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: (d: number) => ({
      opacity: 0,
      y: d > 0 ? -48 : 48,
      filter: "blur(8px)",
    }),
  };

  return (
    <div>
      <FadeIn as="nav" className="mb-4 flex items-center gap-1.5 px-1 text-[12px] font-semibold text-ink-faint">
        <Link href="/" className="transition-colors hover:text-primary">
          {t({ ru: "Главная", kk: "Басты бет" })}
        </Link>
        <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
        <span className="text-ink-soft">{t({ ru: "Для жителей", kk: "Тұрғындарға" })}</span>
      </FadeIn>

      <div className="relative overflow-hidden rounded-2xl2 border border-line bg-gradient-to-br from-white via-white to-primary-soft/40 shadow-card">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3 sm:px-7">
          <span className="font-mono text-[11px] tracking-wide text-ink-faint">
            &gt; {t(residentsHero.badge).toUpperCase()}
          </span>
          <div className="flex items-center gap-2">
            <motion.a
              href="#services"
              className="hidden items-center gap-1.5 rounded-md border border-line bg-white px-3 py-1.5 font-mono text-[10px] font-medium tracking-wide text-ink-soft transition-colors hover:border-primary/40 hover:text-primary sm:inline-flex"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springSnappy}
            >
              <Icon name="doc" className="h-3 w-3" strokeWidth={2} />
              {t({ ru: "ВСЕ СЕРВИСЫ", kk: "БАРЛЫҚ СЕРВИСТЕР" })}
            </motion.a>
            <motion.a
              href="#"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 font-mono text-[10px] font-semibold tracking-wide text-white transition-opacity hover:opacity-90"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springSnappy}
            >
              <Icon name="plus-circle" className="h-3 w-3" strokeWidth={2.5} />
              {t({ ru: "ПОДАТЬ ОБРАЩЕНИЕ", kk: "ӨТІНІШ БЕРУ" })}
            </motion.a>
          </div>
        </div>

        {/* Main stage */}
        <div className="relative min-h-[480px] sm:min-h-[620px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: easeOut }}
              className="absolute inset-0 flex flex-col px-5 pb-28 pt-12 sm:px-9 sm:pb-32 sm:pt-20"
            >
              <span
                className="font-mono text-[11px] font-semibold tracking-widest"
                style={{ color: cur.color }}
              >
                &gt; {t({ ru: "РАЗДЕЛ", kk: "БӨЛІМ" })} {cur.page}
              </span>

              <h1
                className="mt-3 select-none text-[clamp(3.75rem,13vw,8.5rem)] font-extrabold leading-[0.92] tracking-[-0.04em]"
                style={{ color: cur.color }}
              >
                {t(cur.title)}
              </h1>

              <motion.p
                className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {t(cur.subtitle)}
              </motion.p>

              <motion.ul
                className="mt-8 hidden max-w-lg space-y-2.5 sm:block"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                }}
              >
                {cur.items.map((item) => (
                  <motion.li
                    key={item.text.ru}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-center gap-3 text-[14px] text-ink-soft"
                  >
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-md"
                      style={{ backgroundColor: `${cur.color}1A`, color: cur.color }}
                    >
                      <Icon name={item.icon} className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    {t(item.text)}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </AnimatePresence>

          {/* Page counter */}
          <div className="pointer-events-none absolute bottom-28 right-5 font-mono text-[11px] tracking-widest text-ink-faint sm:bottom-32 sm:right-9">
            {cur.page} / 0{residentTabs.length}
          </div>

          {/* Tab navigation */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-6 sm:pb-8">
            <div className="flex gap-1 rounded-lg border border-line bg-white/70 p-1 shadow-soft backdrop-blur-sm">
              {residentTabs.map((tab, i) => (
                <TabButton
                  key={tab.id}
                  tab={tab}
                  active={i === active}
                  onClick={() => select(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA row below hero */}
      <FadeIn delay={120} className="mt-5 flex flex-wrap gap-3 px-1">
        {residentsCta.map((b) => (
          <motion.a
            key={b.label.ru}
            href="#"
            className={b.primary ? "btn-primary" : "btn-white"}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={springSnappy}
          >
            <Icon name={b.icon} className="h-5 w-5" />
            {t(b.label)}
          </motion.a>
        ))}
      </FadeIn>
    </div>
  );
}

function TabButton({
  tab,
  active,
  onClick,
}: {
  tab: ResidentTab;
  active: boolean;
  onClick: () => void;
}) {
  const { t } = useLang();
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="relative overflow-hidden rounded-md px-5 py-2.5 font-mono text-[11px] font-bold tracking-[0.15em] transition-colors sm:px-7 sm:text-[12px]"
      style={{
        backgroundColor: active ? tab.tabBg : "transparent",
        color: active ? tab.tabText : "#98A1B5",
      }}
      whileHover={!active ? { color: "#182238" } : {}}
      whileTap={{ scale: 0.97 }}
      transition={springSnappy}
    >
      {active && (
        <motion.span
          layoutId="resident-tab-bg"
          className="absolute inset-0 rounded-md"
          style={{ backgroundColor: tab.tabBg }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <span className="relative">{t(tab.label).toUpperCase()}</span>
    </motion.button>
  );
}
