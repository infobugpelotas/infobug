"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PrecisionShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax: the image drifts slower than the scroll, text stays put
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] min-h-[420px] max-h-[720px] overflow-hidden border-b border-border"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src="/images/showcase/precision-repair-desktop.webp"
          alt=""
          fill
          sizes="(max-width: 639px) 0px, 100vw"
          className="hidden sm:block object-cover"
        />
        <Image
          src="/images/showcase/precision-repair-mobile.webp"
          alt=""
          fill
          sizes="(min-width: 640px) 0px, 100vw"
          className="sm:hidden object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-bg/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/70 sm:from-bg/40 via-transparent to-transparent" />

      <div className="relative h-full mx-auto max-w-6xl px-6 flex items-end sm:items-center pb-12 sm:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-lg"
        >
          <p className="font-mono text-sm text-green mb-3">precisão, não improviso</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.02] tracking-tight">
            Cada reparo é uma cirurgia de precisão.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
