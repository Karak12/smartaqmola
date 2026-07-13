"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Icon from "@/shared/Icon";
import { directions, galleryPhotos, unsplash } from "@/lib/gallery";
import { useLang } from "@/lib/i18n-context";
import { springSnappy } from "@/lib/motion";

export default function Gallery() {
  const { t } = useLang();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const move = useCallback(
    (dir: number) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + galleryPhotos.length) % galleryPhotos.length,
      ),
    [],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, move]);

  return (
    <section id="gallery" className="container-content scroll-mt-24 pt-8">
      {/* Направления региона — фото-band */}
      <motion.h2
        className="section-label mb-4 px-1"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t({ ru: "Направления развития региона", kk: "Өңірді дамыту бағыттары" })}
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {directions.map((d, i) => (
          <motion.div
            key={d.title.ru}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl2 border border-line"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
          >
            <Image
              src={unsplash(d.id, 600)}
              alt=""
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <span className="mb-2 inline-grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                <Icon name={d.icon} className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <h3 className="text-[15px] font-extrabold leading-tight text-white">
                {t(d.title)}
              </h3>
              <p className="mt-1 text-[12px] leading-snug text-white/75">{t(d.text)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Фотогалерея с лайтбоксом */}
      <div className="mb-4 mt-10 flex items-end justify-between px-1">
        <h2 className="section-label">
          {t({ ru: "Акмолинская область в фотографиях", kk: "Ақмола облысы фотоларда" })}
        </h2>
        <span className="text-[12px] text-ink-faint">
          {t({ ru: "нажмите на фото", kk: "фотоны басыңыз" })}
        </span>
      </div>

      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {galleryPhotos.map((p, i) => (
          <motion.button
            key={p.id}
            type="button"
            onClick={() => setLightbox(i)}
            className="group relative block w-full overflow-hidden rounded-xl2 border border-line"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -20px 0px" }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
          >
            <Image
              src={unsplash(p.id, 500)}
              alt={t(p.caption)}
              width={500}
              height={i % 3 === 0 ? 640 : 380}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="p-3 text-[12px] font-semibold text-white">{t(p.caption)}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label={t({ ru: "Закрыть", kk: "Жабу" })}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => move(-1)}
              className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
              aria-label={t({ ru: "Назад", kk: "Артқа" })}
            >
              <Icon name="arrow-right" className="h-5 w-5 rotate-180" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
              aria-label={t({ ru: "Вперёд", kk: "Алға" })}
            >
              <Icon name="arrow-right" className="h-5 w-5" strokeWidth={2} />
            </button>

            <motion.figure
              key={galleryPhotos[lightbox].id}
              className="relative max-h-[85vh] w-full max-w-4xl"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={springSnappy}
            >
              <Image
                src={unsplash(galleryPhotos[lightbox].id, 1400)}
                alt={t(galleryPhotos[lightbox].caption)}
                width={1400}
                height={933}
                className="max-h-[85vh] w-full rounded-2xl2 object-contain"
                priority
              />
              <figcaption className="mt-3 text-center text-[14px] font-semibold text-white/90">
                {t(galleryPhotos[lightbox].caption)}
                <span className="ml-2 text-white/50">
                  {lightbox + 1} / {galleryPhotos.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
