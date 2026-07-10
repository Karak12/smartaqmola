"use client";

import { MotionConfig } from "motion/react";
import ScrollProgress from "./ScrollProgress";
import { LangProvider } from "@/lib/i18n-context";
import { ContentProvider } from "@/lib/admin/store";

// Глобальные настройки Motion: уважать системную настройку «меньше движения».
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <ContentProvider>
        <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
          <ScrollProgress />
          {children}
        </MotionConfig>
      </ContentProvider>
    </LangProvider>
  );
}
