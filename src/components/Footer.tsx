"use client";

import { navLinks } from "@/lib/data";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { trackEvent } from "@/lib/analytics";

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <a href="#inicio" className="flex items-center">
            <img
              src="/logo/logo-full.svg"
              alt="Infobug Informática — infobug.com.br"
              className="h-12 w-auto"
            />
          </a>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-dim">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-text transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/infobugpelotas/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-text-dim hover:text-orange hover:border-orange/50 transition-colors"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://wa.me/5553999659818"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              onClick={() => trackEvent("whatsapp_click", { location: "footer" })}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-text-dim hover:text-orange hover:border-orange/50 transition-colors"
            >
              <FaWhatsapp size={16} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-text-dim hover:text-orange hover:border-orange/50 transition-colors"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-text-dim hover:text-orange hover:border-orange/50 transition-colors"
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-2 text-xs text-text-dim">
          <p>Av. Juscelino Kubitscheck de Oliveira, 1913 — Pelotas/RS</p>
          <p>© {new Date().getFullYear()} Infobug Informática. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
