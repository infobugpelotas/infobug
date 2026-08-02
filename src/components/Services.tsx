"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Wrench,
  Cpu,
  MonitorCog,
  DatabaseBackup,
  Fan,
  Wifi,
  Laptop,
  ShieldAlert,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  Wrench,
  Cpu,
  MonitorCog,
  DatabaseBackup,
  Fan,
  Wifi,
  Laptop,
  ShieldAlert,
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Ties rotation directly to scroll position — scroll down turns it one way,
  // scroll back up reverses it, rather than spinning on its own.
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 130]);

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className="relative py-24 sm:py-32 border-b border-border overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        style={{ rotate }}
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-end translate-x-1/4 sm:translate-x-1/3 opacity-[0.22] [mask-image:radial-gradient(circle,black_40%,transparent_72%)]"
      >
        <Image
          src="/images/decor/services-rotator.png"
          alt=""
          width={1200}
          height={1200}
          className="w-[420px] h-[420px] sm:w-[560px] sm:h-[560px]"
        />
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="font-mono text-sm text-orange mb-3">nossos serviços</p>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight">
            Soluções completas para o seu mundo digital
          </h2>
          <p className="mt-4 text-text-dim">
            Desde problemas simples até configurações avançadas, cuidamos do que
            mantém você conectado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="group relative rounded-xl border border-border bg-bg-card p-6 overflow-hidden hover:border-orange/50 transition-colors"
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-orange/0 group-hover:bg-orange/10 blur-2xl transition-colors duration-500" />
                <Icon
                  className="text-green mb-5 group-hover:text-orange transition-colors duration-300"
                  size={28}
                  strokeWidth={1.5}
                />
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-text-dim mb-5">{service.description}</p>
                <a
                  href="#contato"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-orange"
                >
                  Saiba mais
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
