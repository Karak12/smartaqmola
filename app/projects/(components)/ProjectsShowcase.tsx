"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Icon from "@/shared/Icon";
import FadeIn from "@/shared/FadeIn";
import { projectsHero } from "@/lib/projects";
import { easeOut, springSnappy } from "@/lib/motion";
import { useLang } from "@/lib/i18n-context";
import { useContent } from "@/lib/admin/store";

export default function ProjectsShowcase() {
  const { t } = useLang();
  const { projects } = useContent();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const cur = projects[Math.min(active, projects.length - 1)];

  const select = (i: number) => {
    const idx = Math.min(projects.length - 1, Math.max(0, i));
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };

  if (!cur) return null;

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40, filter: "blur(6px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40, filter: "blur(6px)" }),
  };

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="flex flex-col">
          <FadeIn as="nav" className="flex items-center gap-1.5 text-[12px] font-semibold text-ink-faint">
            <a href="/" className="transition-colors hover:text-primary">
              {t({ ru: "Главная", kk: "Басты бет" })}
            </a>
            <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="text-ink-soft">{t({ ru: "Проекты", kk: "Жобалар" })}</span>
          </FadeIn>

          <FadeIn delay={60}>
            <h1 className="mt-5 text-3xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[42px]">
              {t(projectsHero.title)}
            </h1>
          </FadeIn>
          <FadeIn as="p" delay={120} className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
            {t(projectsHero.subtitle)}
          </FadeIn>

          <FadeIn delay={180} className="mt-6 flex items-center justify-between lg:mt-auto lg:pt-8">
            <span className="section-label">{t({ ru: "Проекты региона", kk: "Өңір жобалары" })}</span>
            <div className="flex gap-2">
              <motion.button
                type="button"
                onClick={() => select(active - 1)}
                aria-label={t({ ru: "Предыдущий проект", kk: "Алдыңғы жоба" })}
                className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white text-ink-soft transition-colors hover:border-primary/40 hover:text-primary"
                whileHover={{ scale: 1.08, x: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={springSnappy}
              >
                <Icon name="arrow-right" className="h-4 w-4 rotate-180" strokeWidth={2} />
              </motion.button>
              <motion.button
                type="button"
                onClick={() => select(active + 1)}
                aria-label={t({ ru: "Следующий проект", kk: "Келесі жоба" })}
                className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white text-ink-soft transition-colors hover:border-primary/40 hover:text-primary"
                whileHover={{ scale: 1.08, x: 2 }}
                whileTap={{ scale: 0.92 }}
                transition={springSnappy}
              >
                <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
              </motion.button>
            </div>
          </FadeIn>
        </div>

        <div className="overflow-hidden rounded-2xl2 border border-line bg-card shadow-card">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: easeOut }}
              className="flex h-full flex-col"
            >
              <div
                className="relative h-48 shrink-0 sm:h-60"
                style={{ background: `linear-gradient(150deg, ${cur.color}, #101B33)` }}
              >
                <div className="map-net absolute inset-0 opacity-20" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <Icon
                    name={cur.icon}
                    className="absolute -right-4 -top-4 h-40 w-40 text-white/10"
                    strokeWidth={0.9}
                  />
                </motion.div>
                <motion.span
                  className="absolute left-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {t(cur.status)}
                </motion.span>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-12">
                  <div className="text-[12px] font-medium text-white/70">
                    {t(cur.tagline)}
                  </div>
                  <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                    {t(cur.name)}
                  </h2>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-[14px] leading-relaxed text-ink-soft">
                  {t(cur.description)}
                </p>

                <motion.div
                  className="mt-4 flex flex-wrap gap-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                  }}
                >
                  {cur.tags.map((tag, ti) => (
                    <motion.span
                      key={ti}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      className="rounded-full bg-primary-soft px-3 py-1 text-[12px] font-semibold text-primary"
                    >
                      {t(tag)}
                    </motion.span>
                  ))}
                </motion.div>

                <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4">
                  {[
                    { label: { ru: "Статус", kk: "Мәртебе" }, value: t(cur.status) },
                    { label: { ru: "Запуск", kk: "Іске қосу" }, value: cur.year },
                    { label: { ru: "Охват", kk: "Қамту" }, value: t(cur.area) },
                  ].map((row, i) => (
                    <motion.div
                      key={row.label.ru}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                    >
                      <dt className="text-[11px] text-ink-faint">{t(row.label)}</dt>
                      <dd className="mt-0.5 text-[13px] font-bold text-ink">
                        {row.value}
                      </dd>
                    </motion.div>
                  ))}
                </dl>

                <motion.a
                  href="#"
                  className="btn-primary mt-5 ml-auto w-full sm:w-auto sm:self-start"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springSnappy}
                >
                  {t({ ru: "Подробнее о проекте", kk: "Жоба туралы толығырақ" })}
                  <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
                </motion.a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative mt-6 flex justify-center gap-1.5">
        {projects.map((p, i) => (
          <button
            type="button"
            key={p.id}
            onClick={() => select(i)}
            aria-label={t(p.name)}
            className="relative grid h-4 w-4 place-items-center"
          >
            {i === active && (
              <motion.span
                layoutId="project-dot"
                className="absolute inset-y-1 inset-x-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span
              className={`h-1.5 rounded-full transition-colors ${
                i === active ? "w-6 bg-transparent" : "w-1.5 bg-line hover:bg-ink-faint"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
