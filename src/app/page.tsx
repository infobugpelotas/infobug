"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Differentiators from "@/components/Differentiators";
import Brands from "@/components/Brands";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PrecisionShowcase from "@/components/PrecisionShowcase";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// Puramente decorativos e client-only — tirados do bundle inicial de
// hidratação para reduzir o Total Blocking Time no carregamento.
const BootSequence = dynamic(() => import("@/components/BootSequence"), { ssr: false });
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
