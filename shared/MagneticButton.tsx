"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { springSnappy } from "@/lib/motion";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  /** Сила притяжения к курсору (доля смещения), 0.2–0.5 */
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  /** Показывать световой блик, пробегающий при наведении */
  shine?: boolean;
} & Record<string, unknown>;

// Кнопка «притягивается» к курсору (магнитный эффект) + опциональный блик.
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as = "button",
  shine = true,
  ...rest
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const M = as === "a" ? motion.a : motion.button;

  return (
    <M
      ref={ref as never}
      className={`group/mag relative overflow-hidden ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={springSnappy}
      {...rest}
    >
      {shine && !reduce && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover/mag:translate-x-full" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </M>
  );
}
