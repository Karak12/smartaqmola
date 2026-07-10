"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Icon from "@/shared/Icon";
import TiltCard from "./TiltCard";
import { Stagger, StaggerItem } from "@/shared/Stagger";
import { navCards } from "@/lib/content";
import { springSnappy } from "@/lib/motion";
import { useLang } from "@/lib/i18n-context";

const MotionLink = motion.create(Link);

export default function NavCards() {
  const { t } = useLang();
  return (
    <section className="container-content pt-4">
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {navCards.map((c) => (
          <StaggerItem key={c.slug} className="h-full">
            <TiltCard className="h-full" max={7}>
            <MotionLink
              href={`/${c.slug}`}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              transition={springSnappy}
              className="card group flex h-full flex-col p-5 transition-shadow duration-200 hover:shadow-card"
            >
              <motion.span
                className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white"
                whileHover={{ rotate: 5, scale: 1.08 }}
                transition={springSnappy}
              >
                <Icon name={c.icon} className="h-6 w-6" />
              </motion.span>
              <h3 className="text-[15px] font-bold text-ink">{t(c.title)}</h3>
              <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-ink-soft">
                {t(c.text)}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                {t({ ru: "Перейти", kk: "Өту" })}
                <motion.span
                  className="inline-flex"
                  initial={false}
                  whileHover={{ x: 4 }}
                  transition={springSnappy}
                >
                  <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
                </motion.span>
              </span>
            </MotionLink>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
