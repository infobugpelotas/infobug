// Envia um evento pro Google Analytics 4, se o gtag estiver carregado.
// Nunca quebra a página se o GA não estiver configurado (dev local, ou
// se NEXT_PUBLIC_GA_MEASUREMENT_ID ainda não foi definido).
export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", eventName, params ?? {});
}
