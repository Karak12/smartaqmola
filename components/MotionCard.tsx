"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { springSnappy } from "@/lib/motion";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
};

export default function MotionCard({ children, className = "" }: MotionCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -4, transition: springSnappy }}
      whileTap={{ scale: 0.985 }}
    >
      {children}
    </motion.div>
  );
}
