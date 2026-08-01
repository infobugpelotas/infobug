import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Política de Privacidade | Infobug Informática",
  description:
    "Como a Infobug Informática coleta, usa e protege os seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
  alternates: {
    canonical: "/privacidade",
  },
};

const CONTACT_EMAIL = "infobugpelotas@gmail.com";

function CookieTableRow({
  name,
  purpose,
  category,
  duration,
}: {
  name: string;
  purpose: string;
  category: "Necessário" | "Analytics";
  duration: string;
}) {
  return (
    <tr>
      <td className="px-4 py-3 font-mono text-xs align-top whitespace-nowrap">{name}</td>
      <td className="px-4 py-3 align-top">{purpose}</td>
      <td className="px-4 py-3 align-top whitespace-nowrap">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            category === "Necessário"
              ? "bg-green/15 text-green"
              : "bg-orange/15 text-orange"
          }`}
        >
          {category}
        </span>
      </td>
      <td className="px-4 py-3 align-top whitespace-nowrap">{duration}</td>
    </tr>
  );
}

export default function PrivacidadePage() {
  return (
    <LegalLayout
      eyebrow="privacidade"
      title="Política de Privacidade"
      updatedAt="31 de julho de 2026"
    >
      <LegalSection title="1. Quem somos (controlador dos dados)">
        <p>
          Esta Política de Privacidade se aplica ao site infobug.com.br, operado por{" "}
          <strong className="text-text">
            Infobug Informática [razão social / nome do MEI a confirmar]
          </strong>
          , inscrita sob{" "}
          <strong className="text-text">[CNPJ ou CPF a confirmar]</strong>, com
          endereço na Av. Juscelino Kubitscheck de Oliveira, 1913, Pelotas/RS,
          CEP 96075-810 (&quot;Infobug&quot;, &quot;nós&quot;).
        </p>
        <p>
          Para todos os efeitos da Lei nº 13.709/2018 (Lei Geral de Proteção de
          Dados Pessoais — LGPD), a Infobug é a controladora dos dados pessoais
          tratados através deste site.
        </p>
      </LegalSection>

      <LegalSection title="2. Quais dados coletamos e para quê">
        <p>Coletamos dados pessoais fornecidos diretamente por você em dois formulários:</p>
        <ul className="list-disc list-inside space-y-2 marker:text-orange">
          <li>
            <strong className="text-text">Delivery de equipamento:</strong> nome,
            telefone/WhatsApp, endereço, complemento, preferência de backup e
            observações sobre o equipamento — usados para organizar a coleta e
            entrega do seu equipamento e executar o serviço solicitado.
          </li>
          <li>
            <strong className="text-text">Contato geral:</strong> nome, e-mail,
            telefone/WhatsApp e mensagem — usados para responder à sua dúvida ou
            solicitação de orçamento.
          </li>
        </ul>
        <p>
          Também coletamos, de forma automatizada e apenas mediante o seu
          consentimento (ver seção 5), dados de navegação (páginas visitadas,
          dispositivo, origem do acesso) através do Google Analytics 4 e do
          Vercel Analytics, para entender como o site é utilizado.
        </p>
      </LegalSection>

      <LegalSection title="3. Base legal do tratamento">
        <ul className="list-disc list-inside space-y-2 marker:text-orange">
          <li>
            <strong className="text-text">Execução de procedimentos preliminares
            e de contrato (art. 7º, V, LGPD):</strong> os dados enviados nos
            formulários de delivery e contato são tratados para dar andamento ao
            orçamento e ao serviço técnico que você solicitou.
          </li>
          <li>
            <strong className="text-text">Consentimento (art. 7º, I, LGPD):</strong>{" "}
            ao marcar a caixa de aceite nos formulários, você consente com o uso
            dos seus dados para esse atendimento; os cookies de analytics também
            dependem do seu consentimento explícito, dado através do banner de
            cookies.
          </li>
          <li>
            <strong className="text-text">Legítimo interesse (art. 7º, IX, LGPD):</strong>{" "}
            para fins administrativos internos, como prevenção a fraude em
            solicitações de coleta/entrega.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Com quem compartilhamos os dados">
        <p>
          Não vendemos nem alugamos dados pessoais. Compartilhamos dados
          estritamente com prestadores de serviço que nos ajudam a operar o site
          e o atendimento:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-orange">
          <li>
            <strong className="text-text">Resend</strong> (Resend, Inc.) — processa
            o envio do e-mail de notificação gerado pelos formulários do site.{" "}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange underline underline-offset-4 hover:text-orange-dim"
            >
              Política de privacidade da Resend
            </a>
            .
          </li>
          <li>
            <strong className="text-text">Google Analytics</strong> (Google LLC) —
            mede o uso do site de forma agregada. Só é carregado se você aceitar
            cookies de analytics.{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange underline underline-offset-4 hover:text-orange-dim"
            >
              Política de privacidade do Google
            </a>
            .
          </li>
          <li>
            <strong className="text-text">Vercel</strong> (Vercel Inc.) — hospeda o
            site e, se você aceitar cookies de analytics, fornece métricas de uso
            e performance através do Vercel Analytics.{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange underline underline-offset-4 hover:text-orange-dim"
            >
              Política de privacidade da Vercel
            </a>
            .
          </li>
        </ul>
        <p>
          Esses prestadores podem processar dados fora do Brasil; nesses casos,
          exigimos que ofereçam garantias adequadas de proteção compatíveis com a
          LGPD.
        </p>
      </LegalSection>

      <LegalSection title="5. Cookies utilizados">
        <p>
          Cookies necessários são carregados sempre; cookies de analytics só são
          carregados depois de você aceitá-los no banner de cookies. Você pode
          revisar essa escolha a qualquer momento pelo link{" "}
          <strong className="text-text">&quot;Gerenciar cookies&quot;</strong> no
          rodapé do site.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border mt-4">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-bg-raised text-text-dim">
              <tr>
                <th className="px-4 py-3 font-medium">Cookie</th>
                <th className="px-4 py-3 font-medium">Finalidade</th>
                <th className="px-4 py-3 font-medium">Categoria</th>
                <th className="px-4 py-3 font-medium">Duração</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <CookieTableRow
                name="infobug_cookie_consent"
                purpose="Guarda a sua escolha sobre categorias de cookies"
                category="Necessário"
                duration="12 meses"
              />
              <CookieTableRow
                name="_ga"
                purpose="Distingue usuários no Google Analytics 4"
                category="Analytics"
                duration="2 anos"
              />
              <CookieTableRow
                name="_ga_[ID de mensuração]"
                purpose="Mantém o estado da sessão no Google Analytics 4"
                category="Analytics"
                duration="2 anos"
              />
              <CookieTableRow
                name="—"
                purpose="Vercel Analytics não utiliza cookies; coleta métricas agregadas e anônimas de uso e Web Vitals"
                category="Analytics"
                duration="Não aplicável"
              />
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="6. Por quanto tempo guardamos os dados">
        <p>
          Os dados enviados por formulário são mantidos pelo tempo necessário para
          concluir o atendimento e, após isso, por até 5 anos, prazo relacionado a
          eventual necessidade de comprovação de prestação de serviço, salvo se
          você solicitar a exclusão antecipada (seção 7). Dados de analytics são
          retidos conforme os prazos padrão do Google Analytics e do Vercel
          Analytics.
        </p>
      </LegalSection>

      <LegalSection title="7. Seus direitos como titular dos dados (art. 18, LGPD)">
        <p>Você tem direito a, mediante requisição:</p>
        <ul className="list-disc list-inside space-y-2 marker:text-orange">
          <li>confirmação da existência de tratamento;</li>
          <li>acesso aos dados;</li>
          <li>correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>
            anonimização, bloqueio ou eliminação de dados desnecessários,
            excessivos ou tratados em desconformidade com a LGPD;
          </li>
          <li>portabilidade dos dados a outro fornecedor de serviço;</li>
          <li>eliminação dos dados tratados com base no seu consentimento;</li>
          <li>
            informação sobre entidades públicas e privadas com as quais
            compartilhamos dados;
          </li>
          <li>revogação do consentimento, a qualquer momento;</li>
          <li>oposição a tratamento realizado com base em outra hipótese legal.</li>
        </ul>
        <p>
          Para exercer qualquer um desses direitos, use nossa{" "}
          <a
            href="/remocao-de-dados"
            className="text-orange underline underline-offset-4 hover:text-orange-dim"
          >
            página de solicitação
          </a>{" "}
          ou escreva para{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-orange underline underline-offset-4 hover:text-orange-dim"
          >
            {CONTACT_EMAIL}
          </a>
          . Conforme o art. 19 da LGPD, a confirmação da existência de tratamento
          é fornecida de forma simplificada e imediata, ou de forma completa em
          até 15 dias.
        </p>
      </LegalSection>

      <LegalSection title="8. Segurança dos dados">
        <p>
          Adotamos medidas técnicas e administrativas razoáveis para proteger seus
          dados contra acessos não autorizados e situações acidentais ou ilícitas
          de destruição, perda, alteração ou comunicação — incluindo conexão HTTPS
          em todo o site e hospedagem em infraestrutura da Vercel.
        </p>
      </LegalSection>

      <LegalSection title="9. Alterações desta política">
        <p>
          Podemos atualizar esta política para refletir mudanças no site ou na
          legislação. A data no topo desta página indica a versão mais recente.
        </p>
      </LegalSection>

      <LegalSection title="10. Contato / Encarregado">
        <p>
          Como controladora de pequeno porte, a Infobug atua diretamente como
          canal de contato para questões de privacidade. Dúvidas, solicitações ou
          reclamações sobre o tratamento dos seus dados podem ser enviadas para{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-orange underline underline-offset-4 hover:text-orange-dim"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          ou pelo WhatsApp +55 53 99965-9818.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
