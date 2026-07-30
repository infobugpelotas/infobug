import { NextResponse } from "next/server";
import { Resend } from "resend";

// Endereço que recebe as notificações. Troque pelo e-mail real da infobug.
const NOTIFICATION_EMAIL = "infobugpelotas@gmail.com";
// CC removido temporariamente — o modo de teste do Resend só entrega pro
// e-mail da própria conta; volta a ativar depois de verificar o domínio.
// const CC_EMAIL = "leandromalhon@gmail.com";

// Antes de verificar um domínio próprio no Resend, "onboarding@resend.dev"
// funciona como remetente de teste (só entrega pro e-mail cadastrado na sua
// conta Resend). Depois de verificar o domínio, troque pelo remetente real,
// ex: "Infobug <contato@infobug.com.br>".
const FROM_ADDRESS = "Infobug — Site <onboarding@resend.dev>";

type ContactPayload = {
  type: "delivery" | "contato";
  fields: Record<string, string>;
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY não configurada — e-mail não enviado.");
    return NextResponse.json(
      { ok: false, error: "E-mail não configurado no servidor." },
      { status: 500 }
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Corpo inválido." }, { status: 400 });
  }

  if (!payload?.fields || typeof payload.fields !== "object") {
    return NextResponse.json({ ok: false, error: "Dados incompletos." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const subject =
    payload.type === "delivery"
      ? `Novo pedido de Delivery — ${payload.fields.nome ?? "sem nome"}`
      : `Nova mensagem de Contato — ${payload.fields.nome ?? "sem nome"}`;

  const typeLabel = payload.type === "delivery" ? "Delivery de Equipamento" : "Contato Geral";

  const rows = Object.entries(payload.fields)
    .filter(([, value]) => value)
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#6b6b6b;font-family:Arial,Helvetica,sans-serif;font-size:13px;text-transform:capitalize;white-space:nowrap;vertical-align:top;">
            ${key}
          </td>
          <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#1a1a1a;font-family:Arial,Helvetica,sans-serif;font-size:14px;">
            ${value}
          </td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="background:#f4f4f4;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
      <table style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">
        <tr>
          <td style="background:#ff8a00;padding:16px 24px;">
            <span style="color:#0d0d0f;font-weight:bold;font-size:16px;">infobug — ${typeLabel}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;">
            <table style="width:100%;border-collapse:collapse;">
              ${rows}
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: NOTIFICATION_EMAIL,
      subject,
      html,
    });

    if (error) {
      console.error("Erro do Resend:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Falha ao enviar e-mail:", err);
    return NextResponse.json({ ok: false, error: "Falha ao enviar e-mail." }, { status: 500 });
  }
}
