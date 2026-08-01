"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

const CONTACT_EMAIL = "infobugpelotas@gmail.com";

const REQUEST_TYPES = [
  "Exclusão dos meus dados",
  "Acesso aos meus dados",
  "Correção de dados",
  "Portabilidade dos dados",
  "Revogação de consentimento",
  "Outra solicitação (LGPD)",
] as const;

export default function RemovalRequestForm() {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [tipo, setTipo] = useState<string>(REQUEST_TYPES[0]);
  const [detalhes, setDetalhes] = useState("");

  const ready = nome.trim().length > 0 && contato.trim().length > 0;

  const subject = `Solicitação LGPD — ${tipo}`;
  const body = [
    `Nome: ${nome}`,
    `Contato (e-mail/telefone): ${contato}`,
    `Tipo de solicitação: ${tipo}`,
    detalhes ? `Detalhes: ${detalhes}` : null,
    "",
    "Solicito o atendimento deste pedido nos termos da Lei 13.709/2018 (LGPD).",
  ]
    .filter(Boolean)
    .join("\n");

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  const inputClass =
    "w-full rounded-md border border-border bg-bg-raised px-4 py-3 text-sm text-text placeholder:text-text-dim/70 focus:border-orange outline-none transition-colors";
  const labelClass = "block text-sm font-medium mb-2";

  return (
    <div className="rounded-xl border border-border bg-bg-card p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor="r-nome">
          Nome
        </label>
        <input
          id="r-nome"
          className={inputClass}
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="r-contato">
          E-mail ou telefone usado no atendimento
        </label>
        <input
          id="r-contato"
          className={inputClass}
          placeholder="Ex: seuemail@exemplo.com"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="r-tipo">
          Tipo de solicitação
        </label>
        <select
          id="r-tipo"
          className={inputClass}
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          {REQUEST_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor="r-detalhes">
          Detalhes (opcional)
        </label>
        <textarea
          id="r-detalhes"
          rows={3}
          className={inputClass}
          placeholder="Alguma informação adicional que ajude a localizar seus dados"
          value={detalhes}
          onChange={(e) => setDetalhes(e.target.value)}
        />
      </div>
      <div className="sm:col-span-2">
        <a
          href={ready ? mailtoHref : undefined}
          aria-disabled={!ready}
          onClick={(e) => {
            if (!ready) e.preventDefault();
          }}
          className={`inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-semibold transition-colors ${
            ready
              ? "bg-orange text-bg hover:bg-orange-dim"
              : "bg-border text-text-dim cursor-not-allowed"
          }`}
        >
          <Mail size={18} />
          Enviar solicitação por e-mail
        </a>
        <p className="mt-3 text-xs text-text-dim">
          Isso abre seu aplicativo de e-mail com uma mensagem pré-preenchida para{" "}
          {CONTACT_EMAIL}. Prefere falar direto?{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-orange underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
