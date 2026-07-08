"use client";

import { MotionConfig } from "motion/react";
import ScrollProgress from "./ScrollProgress";

// Глобальные настройки Motion: уважать системную настройку «меньше движения».
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <ScrollProgress />
      {children}
    </MotionConfig>
  );
}
