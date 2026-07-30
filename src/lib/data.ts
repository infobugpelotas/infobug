export const services = [
  {
    slug: "manutencao",
    title: "Manutenção de PCs e Notebooks",
    description: "Diagnóstico e reparos com qualidade e agilidade.",
    icon: "Wrench",
  },
  {
    slug: "upgrade",
    title: "Upgrade de Hardware",
    description: "Mais desempenho para o que importa.",
    icon: "Cpu",
  },
  {
    slug: "formatacao",
    title: "Formatação e Instalação",
    description: "Sistema limpo e otimizado, com entrega em até 24h.",
    icon: "MonitorCog",
  },
  {
    slug: "dados",
    title: "Recuperação de Dados",
    description: "Seus arquivos de volta, com segurança.",
    icon: "DatabaseBackup",
  },
  {
    slug: "limpeza",
    title: "Limpeza e Manutenção Preventiva",
    description: "Mais vida útil e performance para o seu equipamento.",
    icon: "Fan",
  },
  {
    slug: "redes",
    title: "Redes e Internet",
    description: "Instalação, gestão e manutenção para residências e empresas.",
    icon: "Wifi",
  },
  {
    slug: "telas-teclados",
    title: "Troca de Tela e Teclado",
    description: "Telas LCD/LED e teclados específicos por modelo, sem gambiarra.",
    icon: "Laptop",
  },
  {
    slug: "seguranca",
    title: "Segurança e Remoção de Ameaças",
    description: "Instalação de antivírus e remoção de vírus, malware e outras ameaças.",
    icon: "ShieldAlert",
  },
] as const;

// Qualitative differentiators — deliberately not fabricated stats (no invented
// "N equipamentos atendidos" counters). Swap in real numbers here once available.
export const differentiators = [
  {
    icon: "SearchCheck",
    title: "Diagnóstico transparente",
    description: "Você sabe exatamente o que está sendo feito e por quê.",
  },
  {
    icon: "Home",
    title: "Atendimento a domicílio",
    description: "Instalamos e configuramos direto na sua casa ou empresa.",
  },
  {
    icon: "Truck",
    title: "Coleta e entrega",
    description: "Buscamos e devolvemos seu equipamento em Pelotas/RS.",
  },
  {
    icon: "MessageCircle",
    title: "Atendimento direto",
    description: "Suporte via WhatsApp, sem burocracia.",
  },
] as const;

export const brands = [
  { name: "HP", logo: "/images/brands/01.png", size: "lg" },
  { name: "LG", logo: "/images/brands/02.png", size: "lg" },
  { name: "Asus", logo: "/images/brands/03.png", size: "lg" },
  { name: "Avell", logo: "/images/brands/04.png", size: "sm" },
  { name: "Dell", logo: "/images/brands/05.png", size: "lg" },
  { name: "Acer", logo: "/images/brands/06.png", size: "lg" },
  { name: "Samsung", logo: "/images/brands/07.png", size: "lg" },
  { name: "Lenovo", logo: "/images/brands/08.png", size: "lg" },
] as const;

export const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
] as const;

export const heroSlides = [
  {
    slug: "upgrade",
    eyebrow: "upgrade e performance",
    title: "Seu computador pode ser mais rápido do que é hoje.",
    description:
      "Upgrade de hardware sob medida — mais memória, SSD ou uma configuração nova, pensada para o que você realmente usa.",
    cta: "Solicitar orçamento",
    imageDesktop: "/images/hero/upgrade-desktop.webp",
    imageMobile: "/images/hero/upgrade-mobile.webp",
  },
  {
    slug: "limpeza",
    eyebrow: "manutenção preventiva",
    title: "Prevenir custa menos do que consertar.",
    description:
      "Limpeza técnica interna e manutenção preventiva prolongam a vida útil do equipamento e evitam panes inesperadas.",
    cta: "Agendar limpeza",
    imageDesktop: "/images/hero/limpeza-desktop.webp",
    imageMobile: "/images/hero/limpeza-mobile.webp",
  },
  {
    slug: "formatacao",
    eyebrow: "formatação e instalação",
    title: "Sistema lento? A solução pode ser mais simples do que parece.",
    description:
      "Formatação completa, com organização e realocação dos arquivos de sistema. Entrega em até 24h.",
    cta: "Agendar formatação",
    imageDesktop: "/images/hero/formatacao-desktop.webp",
    imageMobile: "/images/hero/formatacao-mobile.webp",
  },
] as const;
