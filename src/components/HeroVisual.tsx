"use client";

import { motion } from "framer-motion";

// Original SVG illustration (no stock photography / third-party assets),
// avoids licensing concerns and keeps the hero lightweight + animatable.
export default function HeroVisual() {
  const traces = [
    "M20,220 H140 V120 H260",
    "M20,260 H100 V300 H320",
    "M400,40 V140 H300 V220",
    "M20,340 H180 V380 H360",
    "M400,340 V260 H340",
  ];

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <svg
        viewBox="0 0 420 420"
        fill="none"
        className="w-full h-full"
        role="img"
        aria-label="Ilustração de placa de circuito com chip central"
      >
        <rect
          x="4"
          y="4"
          width="412"
          height="412"
          rx="24"
          stroke="var(--color-border)"
          strokeWidth="1.5"
        />

        {traces.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="var(--color-green)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.4, delay: 0.3 + i * 0.18, ease: "easeInOut" }}
          />
        ))}

        {[
          [20, 220], [140, 120], [260, 120], [20, 260], [100, 300],
          [320, 300], [400, 40], [300, 140], [300, 220], [20, 340],
          [180, 340], [360, 380], [400, 340], [340, 260],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="3"
            fill="var(--color-green)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.4, delay: 1 + i * 0.05 }}
          />
        ))}

        <motion.rect
          x="150"
          y="150"
          width="120"
          height="120"
          rx="8"
          fill="var(--color-bg-card)"
          stroke="var(--color-orange)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
        />
        <motion.rect
          x="172"
          y="172"
          width="76"
          height="76"
          rx="4"
          fill="none"
          stroke="var(--color-orange)"
          strokeWidth="1"
          strokeOpacity="0.6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.5, delay: 1.7 }}
        />

        <motion.text
          x="210"
          y="215"
          textAnchor="middle"
          fill="var(--color-orange)"
          fontSize="11"
          fontFamily="var(--font-mono)"
          letterSpacing="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.5, delay: 1.9 }}
        >
          INFOBUG
        </motion.text>

        <motion.circle
          cx="210"
          cy="210"
          r="90"
          fill="none"
          stroke="var(--color-orange)"
          strokeWidth="1"
          strokeOpacity="0.15"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: [0.9, 1.08, 0.9], opacity: 0.25 }}
          transition={{
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1, delay: 1.6 },
          }}
        />
      </svg>
    </div>
  );
}
