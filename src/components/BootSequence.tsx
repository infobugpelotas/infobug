"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES = [
  "iniciando sistema...",
  "detectando hardware...",
  "carregando infobug_informatica.sys",
  "pronto.",
];

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [skip] = useState(prefersReducedMotion);

  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }
    if (lineIndex >= LINES.length) {
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 320);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIndex, skip]);

  if (skip) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="boot"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-[100] bg-bg flex items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <button
          type="button"
          onClick={onDone}
          className="absolute top-6 right-6 text-xs text-text-dim hover:text-text underline underline-offset-4"
        >
          pular
        </button>
        <div className="font-mono text-sm sm:text-base text-green space-y-2 px-6">
          {LINES.slice(0, lineIndex).map((line, i) => (
            <p key={i}>
              <span className="text-orange">$</span> {line}
            </p>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
