"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/data";
import CircuitBackground from "./CircuitBackground";

const AUTO_ADVANCE_MS = 6500;
const WHATSAPP_NUMBER = "5553999659818";

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex((i + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    timerRef.current = setTimeout(() => goTo(index + 1), AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, goTo]);

  const slide = heroSlides[index];

  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-border"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background photo per slide, art-directed for desktop vs mobile crops */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
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
        </AnimatePresence>
        {/* Gradient overlay: guarantees legible contrast for the text over any photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg/85 via-bg/65 sm:via-bg/50 to-bg/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/65 via-transparent to-transparent" />
        <CircuitBackground className="mix-blend-screen opacity-60" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-40 pb-28 sm:pt-48 sm:pb-36 min-h-[560px] flex flex-col justify-center">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
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

        {/* Controls */}
        <div className="mt-14 flex items-center gap-6">
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
