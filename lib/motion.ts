import type { Variants } from "motion/react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const springSnappy = {
  type: "spring" as const,
  stiffness: 420,
  damping: 32,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
};

export const springBouncy = {
  type: "spring" as const,
  stiffness: 300,
  damping: 22,
};

export const viewport = {
  once: true,
  margin: "0px 0px -48px 0px" as const,
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springSoft,
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springSoft,
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export const menuItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, ...springSnappy },
  }),
};

export const floatAnimation = {
  y: [0, -10, 0] as number[],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};
