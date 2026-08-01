"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/data";
import CircuitBackground from "./CircuitBackground";
import { trackEvent } from "@/lib/analytics";

const AUTO_ADVANCE_MS = 6500;
const WHATSAPP_NUMBER = "5553999659818";

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(
    () => typeof document !== "undefined" && document.readyState === "complete"
  );
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex((i + heroSlides.length) % heroSlides.length);
  }, []);

  // Only start swapping the background image after the page has fully
  // loaded — swapping earlier makes Chrome treat each new slide image as a
  // fresh LCP candidate, which can massively inflate LCP on slow mobile
  // connections (each swap "resets" the largest-paint measurement).
  useEffect(() => {
    if (pageLoaded) return;
    const onLoad = () => setPageLoaded(true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [pageLoaded]);

  useEffect(() => {
    if (paused || !pageLoaded || reducedMotion) return;
    timerRef.current = setTimeout(() => goTo(index + 1), AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, pageLoaded, reducedMotion, goTo]);

  const slide = heroSlides[index];

  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-border"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background photo per slide, art-directed for desktop vs mobile crops.
          Pure crossfade between slides + a slow continuous zoom while each
          slide is visible (Ken Burns) — deliberately not a horizontal slide,
          which reads as generic e-commerce carousel. */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ scale: reducedMotion ? 1 : 1.08 }}
              transition={{ duration: (AUTO_ADVANCE_MS + 800) / 1000, ease: "linear" }}
            >
              <Image
                src={slide.imageDesktop}
                alt=""
                fill
                priority={index === 0}
                sizes="(max-width: 639px) 0px, 100vw"
                className="hidden sm:block object-cover"
              />
              <Image
                src={slide.imageMobile}
                alt=""
                fill
                priority={index === 0}
                sizes="(min-width: 640px) 0px, 100vw"
                className="sm:hidden object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        {/* Gradient overlay: guarantees legible contrast for the text over any photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg/85 via-bg/65 sm:via-bg/50 to-bg/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/65 via-transparent to-transparent" />
        <CircuitBackground className="mix-blend-screen opacity-60" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-40 pb-28 sm:pt-48 sm:pb-36 min-h-[560px] flex flex-col justify-center">
        <div className="relative max-w-2xl">
          {/* Invisible sizer: stacks every slide's text so the block always
              reserves the height of the tallest one — pure CSS, no JS
              measuring, so the real content below never shifts size on swap. */}
          <div aria-hidden="true" className="invisible grid">
            {heroSlides.map((s) => (
              <div key={s.slug} className="col-start-1 row-start-1">
                <p className="font-mono text-sm mb-4">{s.eyebrow}</p>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.98] tracking-tight">
                  {s.title}
                </h2>
                <p className="mt-6 text-lg max-w-xl">{s.description}</p>
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <span className="inline-flex items-center rounded-md px-6 py-3.5 font-semibold">
                    {s.cta}
                  </span>
                  <span className="text-sm">Conheça nossos serviços →</span>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute inset-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <p className="font-mono text-sm text-orange tracking-wide mb-4">
                  {slide.eyebrow}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.98] tracking-tight">
                  {slide.title}
                </h1>
                <p className="mt-6 text-lg text-text-dim max-w-xl">
                  {slide.description}
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <a
                    href={buildWhatsAppLink(`Olá! Vim pelo site e tenho interesse em: ${slide.cta}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", { location: `hero_${slide.slug}` })}
                    className="inline-flex items-center rounded-md bg-orange px-6 py-3.5 font-semibold text-bg hover:bg-orange-dim transition-colors"
                  >
                    {slide.cta}
                  </a>
                  <a
                    href="#servicos"
                    className="text-sm text-text-dim hover:text-text transition-colors underline underline-offset-4 decoration-border"
                  >
                    Conheça nossos serviços →
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-14 flex items-center gap-6 relative">
          <div className="flex gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                aria-label={`Ir para o slide ${i + 1}: ${s.eyebrow}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-orange" : "w-3 bg-border hover:bg-text-dim"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Slide anterior"
              onClick={() => goTo(index - 1)}
              className="p-2 rounded-full border border-border text-text-dim hover:text-text hover:border-text-dim transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Próximo slide"
              onClick={() => goTo(index + 1)}
              className="p-2 rounded-full border border-border text-text-dim hover:text-text hover:border-text-dim transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
