import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl sm:text-2xl tracking-tight mb-3">{title}</h2>
      <div className="text-text-dim leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function LegalLayout({
  eyebrow,
  title,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-36 pb-24 sm:pt-40">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-mono text-sm text-orange mb-3">{eyebrow}</p>
          <h1 className="font-display text-3xl sm:text-4xl tracking-tight mb-2">{title}</h1>
          <p className="text-sm text-text-dim mb-12">Última atualização: {updatedAt}</p>
          <div className="space-y-10">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
