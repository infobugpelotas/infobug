import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = "https://www.infobuginformatica.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Infobug Informática | Assistência Técnica em Pelotas/RS",
  description:
    "Manutenção, formatação, troca de hardware e redes para computadores e notebooks em Pelotas/RS. Diagnóstico rápido, coleta e entrega, orçamento sem compromisso.",
  keywords: [
    "assistência técnica Pelotas",
    "conserto de notebook Pelotas",
    "formatação de computador Pelotas",
    "manutenção de PC Pelotas RS",
    "troca de tela notebook Pelotas",
  ],
  openGraph: {
    title: "Infobug Informática | Assistência Técnica em Pelotas/RS",
    description:
      "Diagnóstico preciso, soluções eficientes. Seu equipamento em boas mãos.",
    url: siteUrl,
    siteName: "Infobug Informática",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Infobug Informática",
  image: `${siteUrl}/og-image.jpg`,
  "@id": siteUrl,
  url: siteUrl,
  telephone: "+55-53-99111-1111",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Juscelino Kubitscheck de Oliveira, 1913",
    addressLocality: "Pelotas",
    addressRegion: "RS",
    addressCountry: "BR",
  },
  areaServed: "Pelotas e Região",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: ["https://www.instagram.com/infobugpelotas/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
