import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Termos de Serviço | Infobug Informática",
  description:
    "Condições de atendimento, orçamento, backup, garantia e responsabilidades dos serviços de assistência técnica da Infobug Informática.",
  alternates: {
    canonical: "/termos",
  },
};

const CONTACT_EMAIL = "infobugpelotas@gmail.com";

export default function TermosPage() {
  return (
    <LegalLayout
      eyebrow="termos"
      title="Termos de Serviço"
      updatedAt="31 de julho de 2026"
    >
      <LegalSection title="1. Aceite">
        <p>
          Estes Termos de Serviço regem a prestação de serviços de assistência
          técnica pela Infobug Informática (&quot;Infobug&quot;, &quot;nós&quot;)
          a clientes em Pelotas/RS e região. Ao solicitar um orçamento, agendar um
          serviço ou usar o formulário de delivery deste site, você concorda com
          estes termos e com a nossa{" "}
          <a
            href="/privacidade"
            className="text-orange underline underline-offset-4 hover:text-orange-dim"
          >
            Política de Privacidade
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Serviços oferecidos">
        <p>Prestamos os seguintes serviços de assistência técnica para computadores e notebooks:</p>
        <ul className="list-disc list-inside space-y-2 marker:text-orange">
          <li>Manutenção de PCs e notebooks;</li>
          <li>Upgrade de hardware;</li>
          <li>Formatação e instalação de sistema;</li>
          <li>Recuperação de dados;</li>
          <li>Limpeza e manutenção preventiva;</li>
          <li>Instalação e manutenção de redes e internet;</li>
          <li>Troca de tela e teclado;</li>
          <li>Remoção de vírus, malware e outras ameaças.</li>
        </ul>
        <p>
          Também oferecemos coleta e entrega do equipamento (&quot;delivery de
          equipamento&quot;) em Pelotas e região, mediante agendamento pelo site
          ou WhatsApp.
        </p>
      </LegalSection>

      <LegalSection title="3. Orçamento e aprovação">
        <p>
          O diagnóstico inicial e o orçamento são fornecidos sem compromisso. O
          serviço só é executado após você aprovar expressamente o valor e o
          escopo informados. Caso, durante o reparo, seja identificada a
          necessidade de um serviço adicional não previsto no orçamento original,
          entraremos em contato antes de prosseguir.
        </p>
      </LegalSection>

      <LegalSection title="4. Backup de dados — responsabilidade do cliente">
        <p>
          No formulário de delivery, perguntamos se você deseja que realizemos
          backup dos seus dados antes do serviço. Recomendamos fortemente que você
          faça (ou solicite) o backup de arquivos importantes antes de entregar o
          equipamento, especialmente antes de formatações, upgrades de
          armazenamento ou reparos que envolvam risco ao disco/SSD.
        </p>
        <p>
          A responsabilidade primária pela preservação dos dados é do cliente. A
          Infobug não se responsabiliza por perda de dados quando: (a) o cliente
          declarou expressamente não desejar backup; (b) a perda decorrer de falha
          física irrecuperável do componente de armazenamento, anterior ou
          identificada durante o serviço; ou (c) o cliente não informou a
          existência de dados sensíveis/críticos no equipamento.
        </p>
      </LegalSection>

      <LegalSection title="5. Garantia do serviço">
        <p>
          Garantimos exclusivamente a <strong className="text-text">mão de obra</strong>{" "}
          executada, pelo prazo de{" "}
          <strong className="text-text">30 dias</strong>{" "}
          a contar da entrega do equipamento, cobrindo defeitos decorrentes
          diretamente do serviço realizado.
        </p>
        <p>
          A Infobug não vende peças ou componentes separadamente. Quando o reparo
          exige a troca de uma peça (ex.: tela, teclado, bateria, fonte), o
          fornecimento pode ser intermediado com fornecedores terceiros; nesse
          caso, a garantia da peça em si segue a política do fabricante/fornecedor
          original, e não deste documento.
        </p>
        <p>A garantia de mão de obra não cobre:</p>
        <ul className="list-disc list-inside space-y-2 marker:text-orange">
          <li>Danos causados por mau uso, queda, líquidos ou intervenção de terceiros após a entrega;</li>
          <li>Problemas não relacionados ao serviço originalmente executado;</li>
          <li>Desgaste natural de peças e baterias.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Prazos">
        <p>
          Prazos informados (como formatação em até 24h) são estimativas e podem
          variar conforme a complexidade do problema e a disponibilidade de peças
          de fornecedores terceiros, sendo você avisado em caso de alteração
          relevante do prazo.
        </p>
      </LegalSection>

      <LegalSection title="7. Isenções de responsabilidade">
        <ul className="list-disc list-inside space-y-2 marker:text-orange">
          <li>
            A Infobug não se responsabiliza por dados, contas ou softwares de
            terceiros instalados no equipamento, nem pela compatibilidade de
            softwares não homologados pelo fabricante.
          </li>
          <li>
            Equipamentos não retirados em até 90 dias após o aviso de conclusão do
            serviço podem gerar custo de armazenamento, comunicado previamente ao
            cliente.
          </li>
          <li>
            A Infobug não se responsabiliza por informações incorretas fornecidas
            pelo cliente nos formulários de contato ou delivery (ex.: endereço de
            coleta incorreto).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Cancelamento">
        <p>
          Você pode cancelar uma solicitação de orçamento ou delivery a qualquer
          momento antes da execução do serviço, sem custo, entrando em contato via
          WhatsApp ou e-mail.
        </p>
      </LegalSection>

      <LegalSection title="9. Alterações destes termos">
        <p>
          Podemos atualizar estes Termos de Serviço periodicamente. A data no
          topo desta página indica a versão vigente.
        </p>
      </LegalSection>

      <LegalSection title="10. Legislação aplicável e contato">
        <p>
          Estes termos são regidos pela legislação brasileira, com foro eleito na
          comarca de Pelotas/RS. Dúvidas sobre estes termos podem ser enviadas
          para{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-orange underline underline-offset-4 hover:text-orange-dim"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
