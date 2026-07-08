"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Logo from "./Logo";
import { Stagger, StaggerItem } from "./Stagger";
import { nav } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <motion.footer
      className="container-content pb-8 pt-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="card flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center">
        <Logo />
        <Stagger className="flex flex-wrap gap-x-5 gap-y-2">
          {nav.map((item) => (
            <StaggerItem key={item.href}>
              <motion.div whileHover={{ y: -2 }}>
                <Link
                  href={item.href}
                  className="text-[13px] font-semibold text-ink-soft transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
        <motion.span
          className="text-[12px] text-ink-faint"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          © {year} КГУ «Smart Aqmola»
        </motion.span>
      </div>
    </motion.footer>
  );
}
