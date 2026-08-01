import type { MetadataRoute } from "next";

// Atualize esta data manualmente quando o conteúdo da home mudar de forma
// relevante — usar new Date() aqui sinaliza "mudou agora" para o Google a
// cada build, mesmo sem alteração real de conteúdo.
const LAST_MODIFIED = new Date("2026-07-31");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.infobug.com.br",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.infobug.com.br/privacidade",
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.infobug.com.br/termos",
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.infobug.com.br/remocao-de-dados",
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
