"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Logo from "./Logo";
import Icon from "./Icon";
import AiReportDialog from "./AiReportDialog";
import SearchButton from "./SearchButton";
import MagneticButton from "./MagneticButton";
import LangSwitcher from "./LangSwitcher";
import { nav } from "@/lib/content";
import { menuItem } from "@/lib/motion";
import { useLang } from "@/lib/i18n-context";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLang();

  return (
    <motion.header
      className="sticky top-0 z-50 bg-page/90 backdrop-blur-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container-content flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 xl:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative rounded-lg px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-primary-soft"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{t(item.label)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <SearchButton />
          <LangSwitcher className="hidden sm:inline-flex" />
          <MagneticButton
            type="button"
            onClick={() => setAiOpen(true)}
            className="btn-primary !rounded-xl px-4 py-2.5"
            strength={0.4}
          >
            {t({ ru: "Сообщить AI", kk: "AI-ға хабарлау" })}
            <Icon name="robot" className="h-4 w-4" />
          </MagneticButton>
          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white text-ink xl:hidden"
            aria-label="Меню"
            whileTap={{ scale: 0.92 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-5 w-5">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-line bg-white xl:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="container-content flex flex-col py-2">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  custom={i}
                  variants={menuItem}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-page"
                  >
                    {t(item.label)}
                  </Link>
                </motion.div>
              ))}
              <div className="px-3 pb-1 pt-2">
                <LangSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AiReportDialog open={aiOpen} onClose={() => setAiOpen(false)} />
    </motion.header>
  );
}
