import { NextResponse } from "next/server";
import { Resend } from "resend";

// Endereço que recebe as notificações. Troque pelo e-mail real da infobug.
const NOTIFICATION_EMAIL = "infobugpelotas@gmail.com";
const CC_EMAIL = "leandromalhon@gmail.com";

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

  const rows = Object.entries(payload.fields)
    .filter(([, value]) => value)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#9a9a9f;font-family:sans-serif;font-size:14px;"><strong>${key}</strong></td><td style="padding:4px 0;font-family:sans-serif;font-size:14px;">${value}</td></tr>`
    )
    .join("");

  const html = `
    <div style="background:#0d0d0f;padding:24px;">
      <table style="background:#17171a;border-radius:8px;padding:16px;width:100%;max-width:480px;">
        ${rows}
      </table>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: NOTIFICATION_EMAIL,
      cc: CC_EMAIL,
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
