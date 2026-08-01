"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import BootSequence from "@/components/BootSequence";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Differentiators from "@/components/Differentiators";
import Brands from "@/components/Brands";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PrecisionShowcase from "@/components/PrecisionShowcase";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// SolderCursor é puramente decorativo e não aparece no primeiro paint (só
// reage ao mouse) — pode ficar de fora do bundle inicial sem causar "flash".
// BootSequence, por ser a primeira coisa visível na tela, precisa carregar
// de forma síncrona, senão o conteúdo real pisca antes dele aparecer.
const SolderCursor = dynamic(() => import("@/components/SolderCursor"), { ssr: false });

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <SolderCursor />
      <FloatingWhatsApp />
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <PrecisionShowcase />
        <Differentiators />
        <Brands />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
