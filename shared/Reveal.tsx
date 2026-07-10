"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType } from "react";
import { easeOut, viewport } from "@/lib/motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** задержка появления, мс — для стаггера */
  delay?: number;
  /** какой тег анимировать (div по умолчанию) */
  as?: ElementType;
} & Record<string, unknown>;

// Появление при попадании во вьюпорт (Motion whileInView, срабатывает один раз).
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  ...rest
}: RevealProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const M: any = (motion as any)[as as string] ?? motion.div;
  return (
    <M
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ duration: 0.65, ease: easeOut, delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </M>
  );
}
