"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";

const WHATSAPP_LINK =
  "https://wa.me/5553999659818?text=" +
  encodeURIComponent("Olá! Vim pelo site e gostaria de solicitar um orçamento.");

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-6 flex items-center justify-between transition-[height] duration-500 ease-out ${
          scrolled ? "h-20" : "h-28 sm:h-32"
        }`}
      >
        <a href="#inicio" className="flex items-center group">
          <img
            src="/logo/logo-compact.svg"
            alt="Infobug Informática"
            className={`w-auto transition-all duration-500 ease-out ${
              scrolled ? "h-9" : "h-14 sm:h-16"
            }`}
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-dim hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-orange px-4 py-2 text-sm font-semibold text-bg hover:bg-orange-dim transition-colors"
          >
            Solicitar orçamento
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-text p-2"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-bg border-t border-border overflow-hidden"
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-text-dim hover:text-text transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-md bg-orange px-4 py-2 text-sm font-semibold text-bg"
            >
              Solicitar orçamento
            </a>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
