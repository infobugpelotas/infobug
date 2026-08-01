"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, MessageSquare, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type Tab = "delivery" | "contato";
type SendStatus = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [tab, setTab] = useState<Tab>("delivery");
  const [deliveryStatus, setDeliveryStatus] = useState<SendStatus>("idle");
  const [contactStatus, setContactStatus] = useState<SendStatus>("idle");

  const [deliveryForm, setDeliveryForm] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    complemento: "",
    backup: "",
    observacoes: "",
  });
  const [deliveryConsent, setDeliveryConsent] = useState(false);

  const [contactForm, setContactForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [contactConsent, setContactConsent] = useState(false);

  const sendEmail = async (type: "delivery" | "contato", fields: Record<string, string>) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, fields }),
    });
    if (!response.ok) {
      throw new Error("Falha ao enviar");
    }
  };

  const handleDeliverySubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDeliveryStatus("sending");
    try {
      await sendEmail("delivery", {
        nome: deliveryForm.nome,
        telefone: deliveryForm.telefone,
        endereço: `${deliveryForm.endereco}${deliveryForm.complemento ? ", " + deliveryForm.complemento : ""}`,
        backup: deliveryForm.backup || "não informado",
        observações: deliveryForm.observacoes,
      });
      setDeliveryStatus("success");
      trackEvent("form_submit", { form_type: "delivery" });
      setDeliveryForm({
        nome: "",
        telefone: "",
        endereco: "",
        complemento: "",
        backup: "",
        observacoes: "",
      });
      setDeliveryConsent(false);
    } catch (err) {
      console.error("Falha ao enviar formulário de delivery:", err);
      setDeliveryStatus("error");
    }
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setContactStatus("sending");
    try {
      await sendEmail("contato", {
        nome: contactForm.nome,
        "e-mail": contactForm.email,
        telefone: contactForm.telefone,
        mensagem: contactForm.mensagem,
      });
      setContactStatus("success");
      trackEvent("form_submit", { form_type: "contato" });
      setContactForm({ nome: "", email: "", telefone: "", mensagem: "" });
      setContactConsent(false);
    } catch (err) {
      console.error("Falha ao enviar formulário de contato:", err);
      setContactStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-md border border-border bg-bg-raised px-4 py-3 text-sm text-text placeholder:text-text-dim/70 focus:border-orange outline-none transition-colors";
  const labelClass = "block text-sm font-medium mb-2";

  const renderConsentCheckbox = (
    id: string,
    checked: boolean,
    onChange: (checked: boolean) => void
  ) => (
    <div className="sm:col-span-2 flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 rounded border-border bg-bg-raised accent-orange"
      />
      <label htmlFor={id} className="text-sm text-text-dim leading-relaxed">
        Li e aceito os{" "}
        <a
          href="/termos"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange underline underline-offset-4 hover:text-orange-dim"
        >
          Termos de Serviço
        </a>{" "}
        e a{" "}
        <a
          href="/privacidade"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange underline underline-offset-4 hover:text-orange-dim"
        >
          Política de Privacidade
        </a>
        , e autorizo o uso dos meus dados para este atendimento.
      </label>
    </div>
  );

  const renderSubmitButton = (status: SendStatus) => {
    if (status === "success") {
      return (
        <div className="sm:col-span-2 flex items-center justify-center gap-2 rounded-md bg-green/15 border border-green/40 px-6 py-3.5 font-semibold text-green">
          <CheckCircle2 size={18} />
          Mensagem enviada! Vamos te responder em breve.
        </div>
      );
    }
    return (
      <div className="sm:col-span-2 flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-orange px-6 py-3.5 font-semibold text-bg hover:bg-orange-dim transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "sending" && <Loader2 size={18} className="animate-spin" />}
          {status === "sending" ? "Enviando..." : "Enviar mensagem"}
        </button>
        {status === "error" && (
          <p className="flex items-center gap-2 text-sm text-orange">
            <AlertCircle size={16} />
            Não foi possível enviar. Tente novamente ou nos chame no WhatsApp.
          </p>
        )}
      </div>
    );
  };

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
            o mais rápido possível.
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
              {renderConsentCheckbox("d-consent", deliveryConsent, setDeliveryConsent)}
              {renderSubmitButton(deliveryStatus)}
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
              {renderConsentCheckbox("c-consent", contactConsent, setContactConsent)}
              {renderSubmitButton(contactStatus)}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
