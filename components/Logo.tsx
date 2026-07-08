"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Smart Aqmola">
      <motion.span
        className="grid h-11 w-11 place-items-center"
        whileHover={{ rotate: 8, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden="true">
          <circle cx="24" cy="24" r="21" fill="none" stroke="#2563EB" strokeWidth="1.2" opacity="0.35" />
          <ellipse cx="24" cy="24" rx="21" ry="9" fill="none" stroke="#2563EB" strokeWidth="1" opacity="0.4" />
          <ellipse cx="24" cy="24" rx="9" ry="21" fill="none" stroke="#2563EB" strokeWidth="1" opacity="0.4" />
          {[
            [24, 3], [40, 14], [40, 34], [24, 45], [8, 34], [8, 14],
            [24, 15], [33, 24], [24, 33], [15, 24],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i < 6 ? 2 : 1.6} fill="#2563EB" />
          ))}
          <path
            d="M24 15 33 24 24 33 15 24Z M24 3 24 15 M40 14 33 24 M40 34 24 33 M8 34 15 24 M8 14 24 15"
            fill="none"
            stroke="#2563EB"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle cx="24" cy="24" r="3" fill="#2563EB" />
        </svg>
      </motion.span>
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-extrabold tracking-tight text-ink">
          SMART AQMOLA
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase leading-tight tracking-[0.1em] text-ink-faint">
          Цифровая платформа
          <br />
          управления регионом
        </span>
      </span>
    </Link>
  );
}
