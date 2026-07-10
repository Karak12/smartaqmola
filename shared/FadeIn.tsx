"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";
import { easeOut, springSoft } from "@/lib/motion";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  /** задержка, мс */
  delay?: number;
  /** смещение по Y на старте, px */
  y?: number;
  as?: ElementType;
} & Record<string, unknown>;

// Входная анимация при монтировании (для hero-блоков).
export default function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 14,
  as = "div",
  ...rest
}: FadeInProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const M: any = (motion as any)[as as string] ?? motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ ...springSoft, delay: delay / 1000, opacity: { duration: 0.5, ease: easeOut } }}
      {...rest}
    >
      {children}
    </M>
  );
}
