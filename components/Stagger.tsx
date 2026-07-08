"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { staggerContainer, staggerItem, viewport } from "@/lib/motion";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variants?: Variants;
};

export function Stagger({
  children,
  className = "",
  as = "div",
  variants = staggerContainer,
}: StaggerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const M: any = (motion as any)[as as string] ?? motion.div;
  return (
    <M
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </M>
  );
}

export function StaggerItem({
  children,
  className = "",
  as = "div",
  variants = staggerItem,
}: StaggerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const M: any = (motion as any)[as as string] ?? motion.div;
  return (
    <M className={className} variants={variants}>
      {children}
    </M>
  );
}
