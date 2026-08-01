// Consentimento de cookies (LGPD, Lei 13.709/2018). A escolha do usuário é
// gravada num cookie próprio (não em localStorage) para poder ser lida de
// forma consistente em qualquer parte do site, com validade de 12 meses.

export type ConsentRecord = {
  necessary: true;
  analytics: boolean;
  decidedAt: string;
  version: number;
};

const COOKIE_NAME = "infobug_cookie_consent";
const CONSENT_VERSION = 1;
const MAX_AGE_DAYS = 365;

// Disparado pelo link "Gerenciar cookies" (rodapé) para reabrir o painel.
export const CONSENT_EVENT_OPEN = "infobug:open-cookie-settings";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

export function getConsent(): ConsentRecord | null {
  const raw = readCookie(COOKIE_NAME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed.version !== CONSENT_VERSION || typeof parsed.analytics !== "boolean") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(categories: { analytics: boolean }): ConsentRecord {
  const record: ConsentRecord = {
    necessary: true,
    analytics: categories.analytics,
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  writeCookie(COOKIE_NAME, JSON.stringify(record), MAX_AGE_DAYS);
  return record;
}

export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_EVENT_OPEN));
}
