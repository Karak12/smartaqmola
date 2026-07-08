"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import Icon from "./Icon";
import { pipeline } from "@/lib/digital";
import { springSnappy, staggerContainer, staggerItem } from "@/lib/motion";

const item: Variants = {
  ...staggerItem,
  visible: {
    ...staggerItem.visible,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DataPipeline() {
  return (
    <motion.div
      className="flex flex-col gap-2 md:flex-row md:items-stretch"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      {pipeline.map((s, i) => (
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
              <motion.span
                className="text-[32px] font-extrabold leading-none text-ink-faint/30"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 + i * 0.1 }}
              >
                {s.step}
              </motion.span>
            </div>
            <h3 className="text-[16px] font-bold text-ink">{s.title}</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
              {s.text}
            </p>
            <motion.ul
              className="mt-4 space-y-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
              }}
            >
              {s.items.map((it) => (
                <motion.li
                  key={it}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex items-center gap-2 text-[12.5px] text-ink-soft"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  {it}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {i < pipeline.length - 1 && (
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
  );
}
