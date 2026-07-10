"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { easeOut } from "@/lib/motion";

type SplitTextProps = {
  /** Текст. Переносы строк (\n) сохраняются как отдельные строки. */
  text: string;
  className?: string;
  /** Задержка перед стартом, с */
  delay?: number;
  /** Интервал между словами, с */
  stagger?: number;
  /** Появление при монтировании (hero) или при попадании во вьюпорт */
  trigger?: "mount" | "view";
};

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  visible: {
    transition: { delayChildren: delay, staggerChildren: stagger },
  },
});

const word: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: easeOut },
  },
};

// Пословное появление заголовка (каждое слово «выезжает» снизу с размытием).
export default function SplitText({
  text,
  className = "",
  delay = 0.1,
  stagger = 0.06,
  trigger = "mount",
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const lines = text.split("\n");

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </span>
    );
  }

  const activation =
    trigger === "mount"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, amount: 0.4 },
        };

  return (
    <motion.span
      className={className}
      variants={container(delay, stagger)}
      {...activation}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((w, wi) => (
            <span
              key={wi}
              className="inline-block overflow-hidden align-bottom"
            >
              <motion.span className="inline-block" variants={word}>
                {w}
                {wi < line.split(" ").length - 1 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
