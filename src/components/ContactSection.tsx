"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, MessageSquare } from "lucide-react";

// Número de WhatsApp real da infobug
const WHATSAPP_NUMBER = "5553999659818";

type Tab = "delivery" | "contato";

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function ContactSection() {
  const [tab, setTab] = useState<Tab>("delivery");

  const [deliveryForm, setDeliveryForm] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    complemento: "",
    backup: "",
    observacoes: "",
  });

  const [contactForm, setContactForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  // Envia o e-mail em segundo plano; nunca bloqueia ou falha o fluxo do
  // WhatsApp caso o Resend não esteja configurado ou dê erro.
  const notifyByEmail = (type: "delivery" | "contato", fields: Record<string, string>) => {
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, fields }),
    }).catch((err) => console.error("Falha ao notificar por e-mail:", err));
  };

  const handleDeliverySubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = [
      "Olá! Gostaria de solicitar um delivery de equipamento.",
      `Nome: ${deliveryForm.nome}`,
      `Telefone: ${deliveryForm.telefone}`,
      `Endereço: ${deliveryForm.endereco}${deliveryForm.complemento ? ", " + deliveryForm.complemento : ""}`,
      `Deseja backup dos dados: ${deliveryForm.backup || "não informado"}`,
      deliveryForm.observacoes ? `Observações: ${deliveryForm.observacoes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    notifyByEmail("delivery", {
      nome: deliveryForm.nome,
      telefone: deliveryForm.telefone,
      endereço: `${deliveryForm.endereco}${deliveryForm.complemento ? ", " + deliveryForm.complemento : ""}`,
      backup: deliveryForm.backup || "não informado",
      observações: deliveryForm.observacoes,
    });
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = [
      "Olá! Gostaria de falar com a infobug.",
      `Nome: ${contactForm.nome}`,
      `E-mail: ${contactForm.email}`,
      `Telefone: ${contactForm.telefone}`,
      `Mensagem: ${contactForm.mensagem}`,
    ].join("\n");
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    notifyByEmail("contato", {
      nome: contactForm.nome,
      "e-mail": contactForm.email,
      telefone: contactForm.telefone,
      mensagem: contactForm.mensagem,
    });
  };

  const inputClass =
    "w-full rounded-md border border-border bg-bg-raised px-4 py-3 text-sm text-text placeholder:text-text-dim/70 focus:border-orange outline-none transition-colors";
  const labelClass = "block text-sm font-medium mb-2";

  return (
    <section id="contato" className="relative py-24 sm:py-32 border-b border-border">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-sm text-orange mb-3">contato</p>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight">
            Vamos resolver o seu problema
          </h2>
          <p className="mt-4 text-text-dim">
            Solicite a coleta do seu equipamento ou tire uma dúvida — respondemos
            direto pelo WhatsApp.
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setTab("delivery")}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === "delivery"
                ? "bg-orange text-bg"
                : "text-text-dim border border-border hover:text-text"
            }`}
          >
            <Truck size={16} /> Delivery de Equipamento
          </button>
          <button
            type="button"
            onClick={() => setTab("contato")}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === "contato"
                ? "bg-orange text-bg"
                : "text-text-dim border border-border hover:text-text"
            }`}
          >
            <MessageSquare size={16} /> Contato Geral
          </button>
        </div>

        <AnimatePresence mode="wait">
          {tab === "delivery" ? (
            <motion.form
              key="delivery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleDeliverySubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 rounded-xl border border-border bg-bg-card p-6 sm:p-8"
            >
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="d-nome">Nome</label>
                <input
                  id="d-nome"
                  required
                  className={inputClass}
                  placeholder="Coloque seu nome"
                  value={deliveryForm.nome}
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, nome: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="d-telefone">Telefone/WhatsApp</label>
                <input
                  id="d-telefone"
                  required
                  className={inputClass}
                  placeholder="Ex: 53 99111-1111"
                  value={deliveryForm.telefone}
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, telefone: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="d-backup">Realizar backup?</label>
                <select
                  id="d-backup"
                  className={inputClass}
                  value={deliveryForm.backup}
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, backup: e.target.value })}
                >
                  <option value="">Gostaria de salvar seus dados?</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="d-endereco">Endereço</label>
                <input
                  id="d-endereco"
                  required
                  className={inputClass}
                  placeholder="Insira seu endereço"
                  value={deliveryForm.endereco}
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, endereco: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="d-complemento">Complemento (Nº / Apto / Cond.)</label>
                <input
                  id="d-complemento"
                  className={inputClass}
                  placeholder="Complemento"
                  value={deliveryForm.complemento}
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, complemento: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="d-obs">Observações</label>
                <textarea
                  id="d-obs"
                  rows={3}
                  className={inputClass}
                  placeholder="Descreva o problema do equipamento"
                  value={deliveryForm.observacoes}
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, observacoes: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="sm:col-span-2 inline-flex items-center justify-center rounded-md bg-orange px-6 py-3.5 font-semibold text-bg hover:bg-orange-dim transition-colors"
              >
                Enviar via WhatsApp
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="contato"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleContactSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 rounded-xl border border-border bg-bg-card p-6 sm:p-8"
            >
              <div>
                <label className={labelClass} htmlFor="c-nome">Nome</label>
                <input
                  id="c-nome"
                  required
                  className={inputClass}
                  placeholder="Coloque seu nome"
                  value={contactForm.nome}
                  onChange={(e) => setContactForm({ ...contactForm, nome: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="c-telefone">Telefone/WhatsApp</label>
                <input
                  id="c-telefone"
                  required
                  className={inputClass}
                  placeholder="Ex: 53 99111-1111"
                  value={contactForm.telefone}
                  onChange={(e) => setContactForm({ ...contactForm, telefone: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="c-email">E-mail</label>
                <input
                  id="c-email"
                  type="email"
                  required
                  className={inputClass}
                  placeholder="E-mail válido"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="c-mensagem">Mensagem</label>
                <textarea
                  id="c-mensagem"
                  required
                  rows={4}
                  className={inputClass}
                  placeholder="Deixe sua mensagem"
                  value={contactForm.mensagem}
                  onChange={(e) => setContactForm({ ...contactForm, mensagem: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="sm:col-span-2 inline-flex items-center justify-center rounded-md bg-orange px-6 py-3.5 font-semibold text-bg hover:bg-orange-dim transition-colors"
              >
                Enviar via WhatsApp
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
