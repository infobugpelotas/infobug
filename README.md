# Infobug Informática — site novo

Landing page one-page para assistência técnica de informática (Pelotas/RS),
construída em Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Antes de publicar

1. **WhatsApp**: edite `WHATSAPP_NUMBER` em `src/components/ContactSection.tsx`
   com o número real (formato DDI+DDD+número, ex: 5553999998888).
2. **Redes sociais**: os links de WhatsApp/Facebook/LinkedIn no rodapé
   (`src/components/Footer.tsx`) estão como `href="#"` — troque pelos links reais.
   O Instagram já está preenchido.
3. **Domínio**: troque `siteUrl` em `src/app/layout.tsx` e a URL em
   `src/app/sitemap.ts` pelo domínio real do site quando definido.
4. **Telefone/e-mail de contato** no schema (`localBusinessSchema` em
   `layout.tsx`) — hoje está com um telefone placeholder.
5. Depois de publicar, cadastre o site no Google Search Console e envie o
   sitemap (`/sitemap.xml`) pra acelerar a indexação.

## Estrutura

- `src/app/layout.tsx` — fontes (Anton/Inter/JetBrains Mono), metadata de SEO,
  schema.org LocalBusiness
- `src/components/BootSequence.tsx` — intro estilo terminal/boot (respeita
  `prefers-reduced-motion`, tem botão "pular")
- `src/components/Hero.tsx` — seção principal com glow que segue o cursor
- `src/components/Services.tsx` — grid de serviços com reveal on scroll
- `src/components/Differentiators.tsx` — diferenciais (coleta/entrega, garantia etc.)
- `src/components/Brands.tsx` — marcas atendidas
- `src/components/ContactSection.tsx` — formulários de Delivery e Contato,
  que montam a mensagem e abrem o WhatsApp
- `src/components/Footer.tsx` — rodapé com endereço e redes sociais
- `src/lib/data.ts` — conteúdo (serviços, diferenciais, marcas, menu) num só lugar

## Deploy

Funciona out-of-the-box na Vercel (`vercel.com`) — é o caminho mais simples
pra Next.js. Basta importar o repositório e configurar o domínio.
