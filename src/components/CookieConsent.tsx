"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import {
  CONSENT_EVENT_OPEN,
  getConsent,
  saveConsent,
  type ConsentRecord,
} from "@/lib/cookieConsent";

function CookieIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={28}
      height={28}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="9" cy="9.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative w-11 h-6 shrink-0 rounded-full transition-colors ${
        checked ? "bg-orange" : "bg-border"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-bg transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// `undefined` = ainda não lido no cliente (evita mismatch de hidratação,
// já que o cookie de consentimento só existe no browser); `null` = lido,
// sem decisão prévia do usuário.
type ConsentState = ConsentRecord | null | undefined;

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(undefined);
  const [panelOpen, setPanelOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analyticsToggle, setAnalyticsToggle] = useState(false);

  useEffect(() => {
    // Lido apenas uma vez, na montagem — precisa ser aqui (não no corpo do
    // componente) porque `document.cookie` não existe durante o SSR e a
    // primeira renderização no cliente tem que bater com o HTML do servidor.
    /* eslint-disable react-hooks/set-state-in-effect */
    const existing = getConsent();
    setConsent(existing);
    setPanelOpen(existing === null);
    /* eslint-enable react-hooks/set-state-in-effect */

    const handleOpen = () => {
      setAnalyticsToggle(getConsent()?.analytics ?? false);
      setCustomizing(true);
      setPanelOpen(true);
    };
    window.addEventListener(CONSENT_EVENT_OPEN, handleOpen);
    return () => window.removeEventListener(CONSENT_EVENT_OPEN, handleOpen);
  }, []);

  const decide = (analytics: boolean) => {
    setConsent(saveConsent({ analytics }));
    setPanelOpen(false);
    setCustomizing(false);
  };

  const openCustomize = () => {
    setAnalyticsToggle(consent?.analytics ?? false);
    setCustomizing(true);
  };

  return (
    <>
      {consent?.analytics && (
        <>
          <GoogleAnalytics />
          <Analytics />
        </>
      )}

      <AnimatePresence>
        {panelOpen && (
          <motion.div
            key="cookie-consent"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            role="dialog"
            aria-modal="false"
            aria-label="Preferências de cookies"
            className="fixed inset-x-0 bottom-0 z-90 px-4 pb-4 sm:px-6 sm:pb-6"
          >
            <div className="mx-auto max-w-3xl rounded-xl border border-border bg-bg-card shadow-2xl shadow-black/40 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <CookieIcon className="text-orange shrink-0 mt-0.5" />

                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-lg tracking-tight mb-1.5">
                    Usamos cookies
                  </h2>
                  <p className="text-sm text-text-dim leading-relaxed">
                    Usamos cookies necessários para o site funcionar e, com o seu
                    consentimento, cookies de análise (Google Analytics e Vercel
                    Analytics) para entender como o site é usado. Veja mais na{" "}
                    <a
                      href="/privacidade"
                      className="text-orange underline underline-offset-4 hover:text-orange-dim"
                    >
                      Política de Privacidade
                    </a>
                    .
                  </p>

                  {customizing && (
                    <div className="mt-5 flex flex-col gap-4 border-t border-border pt-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium">Necessários</p>
                          <p className="text-xs text-text-dim">
                            Essenciais para o site funcionar. Não podem ser desligados.
                          </p>
                        </div>
                        <Toggle checked disabled label="Cookies necessários (sempre ativo)" />
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium">Analytics</p>
                          <p className="text-xs text-text-dim">
                            Google Analytics 4 e Vercel Analytics — métricas de uso.
                          </p>
                        </div>
                        <Toggle
                          checked={analyticsToggle}
                          onChange={setAnalyticsToggle}
                          label="Cookies de analytics"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                    {customizing ? (
                      <button
                        type="button"
                        onClick={() => decide(analyticsToggle)}
                        className="inline-flex items-center justify-center rounded-md bg-orange px-5 py-2.5 text-sm font-semibold text-bg hover:bg-orange-dim transition-colors"
                      >
                        Salvar preferências
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => decide(true)}
                          className="inline-flex items-center justify-center rounded-md bg-orange px-5 py-2.5 text-sm font-semibold text-bg hover:bg-orange-dim transition-colors"
                        >
                          Aceitar todos
                        </button>
                        <button
                          type="button"
                          onClick={() => decide(false)}
                          className="inline-flex items-center justify-center rounded-md border border-border px-5 py-2.5 text-sm font-medium text-text-dim hover:text-text hover:border-text-dim transition-colors"
                        >
                          Rejeitar não essenciais
                        </button>
                        <button
                          type="button"
                          onClick={openCustomize}
                          className="text-sm text-text-dim underline underline-offset-4 hover:text-text transition-colors"
                        >
                          Personalizar
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => decide(false)}
                  aria-label="Fechar e manter apenas cookies necessários"
                  className="shrink-0 text-text-dim hover:text-text transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
