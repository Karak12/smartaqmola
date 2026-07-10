"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /**
   * Скорость параллакса. Положительное — элемент отстаёт (двигается медленнее),
   * отрицательное — обгоняет. Типичные значения: -0.3…0.3
   */
  speed?: number;
};

// Сдвигает элемент по Y в зависимости от прокрутки (parallax по вьюпорту).
export default function Parallax({
  children,
  className = "",
  speed = 0.2,
}: ParallaxProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = 120 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
