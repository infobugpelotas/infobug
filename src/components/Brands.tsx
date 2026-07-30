"use client";

import { motion } from "framer-motion";
import { brands } from "@/lib/data";

export default function Brands() {
  return (
    <section className="py-16 border-b border-border overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-mono text-text-dim tracking-widest uppercase mb-8"
        >
          Atendemos equipamentos de todas as marcas, incluindo
        </motion.p>
      </div>

      {/* Full-bleed marquee: fades at the edges, pauses on hover, respects reduced motion */}
      <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max items-center gap-16 sm:gap-24 animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${brand.name}-${i}`}
              src={brand.logo}
              alt={brand.name}
              className={`w-auto shrink-0 object-contain brightness-0 invert opacity-50 hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-300 ${
                brand.size === "sm" ? "h-8 sm:h-10" : "h-24 sm:h-32"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
