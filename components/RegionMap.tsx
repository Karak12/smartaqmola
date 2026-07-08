"use client";

import { motion } from "motion/react";
import Icon from "./Icon";
import { mapBadges } from "@/lib/content";
import { floatAnimation } from "@/lib/motion";

const nodes: [number, number][] = [
  [140, 120], [230, 90], [330, 110], [430, 95], [510, 140],
  [180, 190], [280, 175], [380, 185], [470, 210],
  [150, 260], [250, 260], [350, 270], [440, 290],
  [220, 330], [330, 340], [410, 355], [300, 250], [360, 150],
];
const links: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [1, 6], [2, 7], [4, 8],
  [5, 9], [6, 10], [7, 11], [8, 12], [9, 13], [11, 14], [12, 15],
  [16, 6], [16, 10], [16, 11], [17, 2], [17, 3], [6, 7], [10, 11],
];

export default function RegionMap() {
  return (
    <div className="relative mx-auto aspect-[600/430] w-full max-w-[620px]">
      <motion.svg
        viewBox="0 0 600 430"
        className="h-full w-full drop-shadow-[0_30px_40px_rgba(37,99,235,0.18)]"
        role="img"
        aria-label="Карта Акмолинской области"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.1 }}
      >
        <defs>
          <linearGradient id="regionFill" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0" stopColor="#EAF2FF" />
            <stop offset="0.55" stopColor="#CFE0FA" />
            <stop offset="1" stopColor="#B7D0F4" />
          </linearGradient>
          <linearGradient id="regionEdge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8FB4EC" />
            <stop offset="1" stopColor="#6E9BE0" />
          </linearGradient>
        </defs>

        <motion.path
          d="M96 150
             C120 118 150 96 205 92
             C255 88 280 70 330 74
             C378 78 400 62 452 74
             C500 85 540 108 548 150
             C556 190 528 214 522 244
             C516 276 540 300 520 332
             C500 362 452 360 410 372
             C360 386 330 402 282 392
             C238 383 214 360 176 350
             C132 338 96 330 82 292
             C70 258 96 236 96 206
             C96 182 82 172 96 150 Z"
          fill="url(#regionFill)"
          stroke="url(#regionEdge)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
        <path
          d="M96 150 C120 118 150 96 205 92 C255 88 280 70 330 74 C378 78 400 62 452 74 C500 85 540 108 548 150 C520 150 470 150 400 160 C300 174 180 168 96 150 Z"
          fill="#ffffff"
          opacity="0.28"
        />

        <g stroke="#3B82F6" strokeWidth="1" opacity="0.4">
          {links.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={nodes[a][0]}
              y1={nodes[a][1]}
              x2={nodes[b][0]}
              y2={nodes[b][1]}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.03, ease: "easeOut" }}
            />
          ))}
        </g>
        <g fill="#2563EB">
          {nodes.map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={i % 4 === 0 ? 3.4 : 2.2}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: i % 4 === 0 ? 0.9 : 0.6,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 22,
                delay: 0.6 + i * 0.04,
              }}
            />
          ))}
        </g>
      </motion.svg>

      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center pl-16"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <span className="text-center text-lg font-extrabold uppercase leading-tight tracking-wide text-primary/85">
          Акмолинская
          <br />
          область
        </span>
      </motion.div>

      {mapBadges.map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: b.top, left: b.left }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 20,
            delay: 0.9 + i * 0.12,
          }}
        >
          <motion.span
            className="grid h-12 w-12 place-items-center rounded-full text-white shadow-lg ring-4 ring-white/70"
            style={{ backgroundColor: b.color }}
            animate={{
              ...floatAnimation,
              transition: {
                ...floatAnimation.transition,
                delay: parseFloat(b.delay) || i * 0.5,
              },
            }}
            whileHover={{ scale: 1.12 }}
          >
            <Icon name={b.icon} className="h-6 w-6" strokeWidth={1.9} />
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}
