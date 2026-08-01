import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";
import RemovalRequestForm from "@/components/RemovalRequestForm";

export const metadata: Metadata = {
  title: "Remoção de Dados | Infobug Informática",
  description:
    "Solicite a exclusão, acesso, correção ou portabilidade dos seus dados pessoais tratados pela Infobug Informática, conforme a LGPD.",
  alternates: {
    canonical: "/remocao-de-dados",
  },
};

export default function RemocaoDeDadosPage() {
  return (
    <LegalLayout
      eyebrow="seus dados, sua decisão"
      title="Remoção e outras solicitações de dados"
      updatedAt="31 de julho de 2026"
    >
      <LegalSection title="Como funciona">
        <p>
          Conforme o art. 18 da LGPD (Lei nº 13.709/2018), você pode solicitar a
          exclusão, o acesso, a correção, a portabilidade ou a revogação do
          consentimento sobre os dados pessoais que a Infobug trata a seu
          respeito. Preencha o formulário abaixo — ele monta um e-mail
          pré-preenchido para o nosso endereço de contato, o mesmo canal usado
          pelos outros formulários deste site.
        </p>
        <p>
          Respondemos a confirmação da existência de tratamento de forma imediata
          e, quando aplicável, atendemos o pedido em detalhe em até 15 dias, como
          previsto no art. 19 da LGPD.
        </p>
      </LegalSection>

      <RemovalRequestForm />

      <LegalSection title="Mais informações">
        <p>
          Para entender quais dados coletamos, por quanto tempo e com quem
          compartilhamos, consulte a nossa{" "}
          <a
            href="/privacidade"
            className="text-orange underline underline-offset-4 hover:text-orange-dim"
          >
            Política de Privacidade
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
