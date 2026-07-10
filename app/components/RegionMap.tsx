"use client";

import { motion } from "motion/react";
import Icon from "@/shared/Icon";
import { mapBadges } from "@/lib/content";
import { useLang } from "@/lib/i18n-context";

// Реальная граница Акмолинской области (OSM relation 215743, спроецирована
// в систему координат SVG и упрощена). Второй подпуть — анклав Астаны (вырез).
const REGION_PATH =
  "M79.8 227.6L81.3 236.6L88.3 236.6L91.2 241.2L85.3 256.7L89.6 259.7L81.6 266.0L86.3 272.9L83.5 276.2L94.0 286.1L92.6 306.8L102.0 304.9L105.7 295.9L110.1 296.3L117.1 303.5L118.2 309.5L124.9 307.1L128.7 318.8L134.7 316.7L149.5 324.9L163.0 321.1L169.0 324.0L166.7 331.5L170.1 343.6L192.1 334.6L205.8 334.3L211.0 329.3L208.6 321.2L216.6 320.8L221.6 324.3L240.3 309.0L254.9 309.4L254.5 329.1L248.5 355.1L263.2 360.7L272.8 360.6L274.4 353.8L280.5 355.0L278.5 345.7L283.9 343.3L295.5 352.0L295.5 359.0L319.4 354.1L320.1 358.6L324.6 358.9L323.2 372.0L342.6 364.3L339.9 355.9L347.6 351.5L352.9 356.2L354.9 338.9L369.8 333.5L373.1 325.1L383.4 321.6L383.6 315.8L393.3 309.9L399.7 310.3L409.1 319.0L405.1 323.7L408.0 326.7L402.6 339.9L418.0 336.8L423.6 341.5L423.3 338.6L427.7 337.8L426.0 330.8L430.9 326.4L440.0 328.7L441.7 325.2L437.6 319.4L441.8 314.3L443.7 316.7L451.0 313.5L457.6 302.2L467.1 304.3L476.7 299.4L476.8 293.4L488.4 290.9L497.5 283.0L490.4 278.2L484.4 283.0L476.1 270.1L488.1 268.0L490.0 271.9L492.3 267.4L502.1 269.9L509.3 256.8L518.2 251.7L532.2 249.8L531.7 246.6L520.8 243.6L519.3 240.0L507.7 241.2L509.3 226.7L520.3 219.5L518.9 165.9L514.9 165.9L514.9 161.8L495.0 161.0L488.0 153.1L471.4 149.0L463.6 151.9L464.7 134.7L461.4 126.8L440.2 130.1L427.6 127.3L427.7 137.2L413.1 140.3L405.8 135.4L406.1 129.8L400.6 132.8L397.4 124.9L403.1 122.1L404.1 110.8L395.8 93.6L379.0 103.3L367.2 101.1L369.8 93.6L345.4 92.9L345.4 100.8L338.5 101.8L338.9 109.1L332.0 109.7L327.4 98.1L315.6 98.5L319.5 86.5L307.6 85.6L305.7 73.3L297.8 72.0L287.3 76.1L284.3 79.1L286.3 84.9L280.5 86.5L277.2 79.2L271.8 79.2L271.9 72.6L266.5 72.6L266.5 77.7L251.3 75.5L252.9 82.8L247.3 82.9L247.2 86.8L238.6 90.4L243.6 105.9L250.1 106.4L252.4 112.2L249.8 118.8L254.0 120.8L245.7 129.6L248.5 145.2L234.7 151.6L231.4 160.8L213.7 165.8L216.8 172.7L207.1 188.1L190.7 175.5L178.6 175.4L178.5 193.6L168.3 189.6L159.0 190.6L140.2 187.4L140.1 180.3L124.9 183.3L116.6 173.4L113.0 174.9L112.6 193.8L106.0 199.0L100.5 221.1L88.2 227.4L79.8 227.6Z " +
  "M377.7 283.8L380.9 278.2L378.6 275.8L379.8 272.7L381.9 273.7L386.1 268.0L386.9 270.9L391.9 269.1L390.5 271.3L394.6 272.9L396.7 270.1L398.0 272.5L396.2 276.2L399.3 281.4L402.9 282.1L404.3 284.6L401.1 285.9L397.8 284.7L394.0 289.0L394.4 298.6L391.3 298.6L389.6 292.9L381.1 291.1L377.7 283.8Z";

// Узлы сети — сгенерированы внутри реального контура (в обход анклава Астаны).
const nodes: [number, number][] = [
  [475, 300], [420, 188], [264, 340], [375, 187], [138, 298],
  [263, 284], [211, 201], [433, 305], [304, 199], [203, 332],
  [107, 248], [209, 232], [489, 245], [209, 299], [418, 333],
  [319, 251], [425, 142], [263, 158],
];
const links: [number, number][] = [
  [0, 7], [0, 12], [0, 14], [1, 3], [1, 12], [1, 16],
  [2, 5], [2, 9], [2, 13], [3, 8], [3, 15], [3, 16],
  [4, 9], [4, 10], [4, 13], [5, 11], [5, 13], [5, 15],
  [6, 8], [6, 11], [6, 17], [7, 12], [7, 14], [8, 15],
  [8, 17], [9, 13], [10, 11], [10, 13], [11, 13], [11, 17],
  [12, 14], [12, 16],
];

export default function RegionMap() {
  const { lang } = useLang();
  return (
    <div className="relative mx-auto aspect-[600/430] w-full max-w-[620px]">
      <motion.svg
        viewBox="0 0 600 430"
        className="h-full w-full drop-shadow-[0_14px_20px_rgba(37,99,235,0.14)]"
        role="img"
        aria-label={lang === "kk" ? "Ақмола облысының картасы" : "Карта Акмолинской области"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
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

        {/* Реальный контур Акмолинской области (OSM, упрощён) с «вырезом»
            под Астану — город-анклав внутри области. */}
        <motion.path
          d={REGION_PATH}
          fillRule="evenodd"
          fill="url(#regionFill)"
          stroke="url(#regionEdge)"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
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
          {lang === "kk" ? (
            <>
              Ақмола
              <br />
              облысы
            </>
          ) : (
            <>
              Акмолинская
              <br />
              область
            </>
          )}
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
            whileHover={{ scale: 1.12 }}
          >
            <Icon name={b.icon} className="h-6 w-6" strokeWidth={1.9} />
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}
