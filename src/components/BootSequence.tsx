"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RING_DURATION = 1.1; // seconds
const HOLD_AFTER = 250; // ms pause after the ring completes, before fading out

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [skip] = useState(prefersReducedMotion);
  const [ringDone, setRingDone] = useState(false);

  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }
    if (ringDone) {
      const t = setTimeout(onDone, HOLD_AFTER);
      return () => clearTimeout(t);
    }
  }, [skip, ringDone, onDone]);

  if (skip) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="boot"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] bg-bg flex items-center justify-center"
        role="status"
        aria-label="Carregando"
      >
        <button
          type="button"
          onClick={onDone}
          className="absolute top-6 right-6 text-xs text-text-dim hover:text-text underline underline-offset-4"
        >
          pular
        </button>

        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="var(--color-orange)"
              strokeWidth="1.5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1 1"
              initial={{ strokeDashoffset: 1 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: RING_DURATION, ease: "easeInOut" }}
              onAnimationComplete={() => setRingDone(true)}
            />
          </svg>

          <motion.img
            src="/logo/logo-compact.svg"
            alt="Infobug Informática"
            className="h-8 w-auto relative"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
