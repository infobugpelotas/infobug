"use client";

import { useState } from "react";
import BootSequence from "@/components/BootSequence";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Differentiators from "@/components/Differentiators";
import Brands from "@/components/Brands";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SolderCursor from "@/components/SolderCursor";
import PrecisionShowcase from "@/components/PrecisionShowcase";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

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
