"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  SearchCheck,
  Home,
  Truck,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { differentiators } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  SearchCheck,
  Home,
  Truck,
  MessageCircle,
};

export default function Differentiators() {
  return (
    <section id="sobre" className="relative py-20 border-b border-border bg-bg-raised/40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl order-2 lg:order-1"
          >
            <p className="font-mono text-sm text-orange mb-3">sobre a infobug</p>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight">
              Assistência técnica de verdade, sem enrolação
            </h2>
            <p className="mt-4 text-text-dim">
              Atendemos Pelotas e região com diagnóstico transparente e prazos que
              a gente cumpre. Cada equipamento que chega aqui recebe o mesmo
              cuidado: entender o problema antes de propor a solução — e explicar
              tudo em uma linguagem que faz sentido pra você, não só pra quem
              entende de hardware.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 rounded-xl overflow-hidden border border-border"
          >
            <Image
              src="/images/about/workbench.webp"
              alt="Bancada de reparo da infobug, com ferramentas de precisão"
              width={800}
              height={600}
              sizes="(max-width: 1023px) 100vw, 40vw"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {differentiators.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col gap-3"
              >
                <Icon className="text-green" size={22} strokeWidth={1.5} />
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-sm text-text-dim mt-1">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

