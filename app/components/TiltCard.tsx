"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Максимальный угол наклона, градусы */
  max?: number;
  /** Показывать блик, следующий за курсором */
  glare?: boolean;
};

// 3D-наклон карточки за курсором (perspective tilt) + мягкий блик.
export default function TiltCard({
  children,
  className = "",
  max = 8,
  glare = true,
}: TiltCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const rotateX = useSpring(rx, { stiffness: 300, damping: 24 });
  const rotateY = useSpring(ry, { stiffness: 300, damping: 24 });

  const glareBg = useMotionTemplate`radial-gradient(220px circle at ${gx}% ${gy}%, rgba(255,255,255,0.35), transparent 60%)`;

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`group relative [transform-style:preserve-3d] ${className}`}
      style={{ rotateX, rotateY, perspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {children}
      {glare && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [transform:translateZ(1px)] group-hover:opacity-100"
          style={{ background: glareBg }}
          aria-hidden
        />
      )}
    </motion.div>
  );
}
