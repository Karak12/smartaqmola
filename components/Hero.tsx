"use client";

import { motion } from "motion/react";
import Icon from "./Icon";
import RegionMap from "./RegionMap";
import { Stagger, StaggerItem } from "./Stagger";
import { dataLayers, heroButtons } from "@/lib/content";
import { floatAnimation, springSnappy } from "@/lib/motion";

export default function Hero() {
  return (
    <section id="top" className="container-content pt-2">
      <div className="relative overflow-hidden rounded-2xl2 border border-line bg-gradient-to-br from-white via-white to-primary-soft/50 px-5 py-8 shadow-card sm:px-9 sm:py-10">
        <motion.div
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          animate={floatAnimation}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-teal/10 blur-3xl"
          animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 1.5 } }}
        />

        <div className="relative grid items-center gap-8 lg:grid-cols-12">
          <Stagger className="lg:col-span-5">
            <StaggerItem>
              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Цифровой штаб
                <br />
                Акмолинской области
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
                Объединяем данные, обращения, карты, ИИ-аналитику и мониторинг
                поручений для принятия управленческих решений в режиме реального
                времени.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {heroButtons.map((b) => (
                  <motion.a
                    key={b.label}
                    href="#"
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={springSnappy}
                    className={
                      b.primary
                        ? "btn-primary justify-start px-4 py-3.5 text-left"
                        : "btn-white justify-start px-4 py-3.5 text-left"
                    }
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                        b.primary ? "bg-white/20" : "bg-primary-soft text-primary"
                      }`}
                    >
                      <Icon name={b.icon} className="h-5 w-5" />
                    </span>
                    <span className="leading-tight">
                      {b.label}
                      {"sub" in b && b.sub && (
                        <span className="block text-xs font-medium opacity-80">
                          {b.sub}
                        </span>
                      )}
                    </span>
                  </motion.a>
                ))}
              </div>
            </StaggerItem>
          </Stagger>

          <motion.div
            className="relative lg:col-span-7"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 28, delay: 0.15 }}
          >
            <div className="lg:pr-[220px]">
              <RegionMap />
            </div>

            <motion.div
              className="mt-6 w-full lg:absolute lg:right-0 lg:top-2 lg:mt-0 lg:w-[210px]"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.35 }}
            >
              <div className="card p-4">
                <h3 className="mb-3 text-sm font-bold text-ink">Карта данных</h3>
                <ul className="space-y-2.5">
                  {dataLayers.map((d, i) => (
                    <motion.li
                      key={d.label}
                      className="flex items-center gap-2.5"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + i * 0.06, duration: 0.4 }}
                    >
                      <span
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-white"
                        style={{ backgroundColor: d.color }}
                      >
                        <Icon name={d.icon} className="h-3.5 w-3.5" strokeWidth={2} />
                      </span>
                      <span className="flex-1 text-[12px] leading-tight text-ink-soft">
                        {d.label}
                      </span>
                      <span className="text-[12px] font-bold text-ink">
                        {d.value}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <motion.a
                  href="#"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-3 flex items-center justify-between rounded-lg border border-line px-3 py-2 text-[12px] font-semibold text-primary transition-colors hover:bg-primary-soft/50"
                >
                  Все слои на карте
                  <Icon name="arrow-up-right" className="h-3.5 w-3.5" strokeWidth={2} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
