"use client";

import { useEffect, useRef, useState } from "react";

// Разбор строки вида "24 531", "1,8 дня", "85%" на префикс/число/суффикс.
function parse(value: string) {
  const m = value.match(/^(\D*?)([\d][\d\s.,]*\d|\d)(.*)$/);
  if (!m) return null;
  const [, prefix, numStr, suffix] = m;
  const hasComma = numStr.includes(",");
  const decimals = hasComma ? numStr.split(",")[1]?.length ?? 0 : 0;
  const grouped = /\d\s\d/.test(numStr);
  const target = parseFloat(numStr.replace(/\s/g, "").replace(",", "."));
  if (Number.isNaN(target)) return null;
  return { prefix, suffix, target, decimals, grouped };
}

function format(n: number, decimals: number, grouped: boolean) {
  let s = n.toFixed(decimals);
  if (decimals > 0) s = s.replace(".", ",");
  if (grouped) {
    const [int, dec] = s.split(",");
    const g = int.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    s = dec ? `${g},${dec}` : g;
  }
  return s;
}

// Плавно «докручивает» число от 0 до значения при появлении на экране.
export default function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(
    parsed ? format(0, parsed.decimals, parsed.grouped) : value
  );

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setDisplay(format(parsed.target, parsed.decimals, parsed.grouped));
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(
            format(parsed.target * eased, parsed.decimals, parsed.grouped)
          );
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {parsed ? `${parsed.prefix}${display}${parsed.suffix}` : value}
    </span>
  );
}
