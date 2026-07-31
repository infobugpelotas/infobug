"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { trackEvent } from "@/lib/analytics";

// Same number used in ContactSection's WhatsApp deep links — keep both in sync.
const WHATSAPP_NUMBER = "5553999659818";
const DEFAULT_MESSAGE = "Olá! Vim pelo site e gostaria de falar com a infobug.";

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Appears after a short delay / small scroll — avoids competing with the
    // hero's own CTA the instant the page loads.
    const onScroll = () => {
      if (window.scrollY > 80) setVisible(true);
    };
    onScroll();
    const t = setTimeout(() => setVisible(true), 2500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <AnimatePresence>
            {showTooltip && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="hidden sm:block rounded-md border border-border bg-bg-card px-3 py-2 text-sm text-text shadow-lg"
              >
                Fale com a gente no WhatsApp
              </motion.span>
            )}
          </AnimatePresence>

          <a
            href={buildWhatsAppLink(DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            onClick={() => trackEvent("whatsapp_click", { location: "floating_button" })}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-green text-bg shadow-lg shadow-black/40 hover:scale-105 active:scale-95 transition-transform"
          >
            <span className="absolute inset-0 rounded-full bg-green animate-ping-slow opacity-40 motion-reduce:hidden" />
            <FaWhatsapp size={26} className="relative" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
