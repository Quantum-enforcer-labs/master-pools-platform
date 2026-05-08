/**
 * SEO utilities for meta tags and structured data
 */

export interface MetaConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
}

export function createMetaTags(config: MetaConfig) {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords?.join(", "),
    og: {
      title: config.ogTitle || config.title,
      description: config.ogDescription || config.description,
      image: config.ogImage,
      type: config.ogType || "website",
    },
    canonical: config.canonical,
    noindex: config.noindex,
  };
}

export const COMPANY_NAME = "MATERPOOLS AND CONTRUCTION";
export const COMPANY_PHONE = "+263 772 562 125";
export const COMPANY_PHONE_2 = "+263 775 206 774";
export const COMPANY_ADDRESS = "Harare, Zimbabwe";
export const COMPANY_URL = "https://masterpools.co.zw";

export const metaConfigs = {
  home: createMetaTags({
    title: "MATERPOOLS AND CONTRUCTION | Luxury Swimming Pools — Zimbabwe",
    description:
      "Zimbabwe's most trusted luxury swimming pool construction company. Custom design, expert construction, lifetime support.",
    keywords: [
      "swimming pools",
      "pool construction",
      "luxury pools",
      "Zimbabwe",
      "pool design",
      "aquatic centres",
    ],
    ogTitle: "MATERPOOLS AND CONTRUCTION | Luxury Pool Construction",
    ogDescription:
      "Zimbabwe's premier pool builders. Custom pools, infinity edges, commercial aquatic centres.",
    ogType: "website",
  }),
  projects: createMetaTags({
    title: "Pool Projects | MATERPOOLS AND CONTRUCTION — Custom & Commercial",
    description:
      "Browse our portfolio of luxury swimming pools, from residential sanctuaries to Olympic-grade aquatic complexes.",
    keywords: [
      "pool projects",
      "pool portfolio",
      "pool designs",
      "completed pools",
      "pool gallery",
    ],
    ogTitle: "MATERPOOLS AND CONTRUCTION Projects Gallery",
    ogDescription: "Explore our award-winning pool construction projects.",
  }),
  about: createMetaTags({
    title:
      "About MATERPOOLS AND CONTRUCTION | Zimbabwe's Pool Construction Leaders",
    description:
      "Learn about MATERPOOLS AND CONTRUCTION' 20+ years of expertise in luxury pool design and construction.",
    keywords: [
      "about MATERPOOLS AND CONTRUCTION",
      "pool company Zimbabwe",
      "pool contractors",
      "pool builders",
    ],
    ogTitle: "About MATERPOOLS AND CONTRUCTION",
    ogDescription: "Meet Zimbabwe's most trusted pool construction company.",
  }),
  contact: createMetaTags({
    title: "Contact MATERPOOLS AND CONTRUCTION | Get Your Dream Pool Quote",
    description:
      "Get in touch with our expert team for a free consultation and custom pool quotation.",
    keywords: [
      "contact pools",
      "pool quote",
      "pool consultation",
      "pool builders contact",
    ],
    ogTitle: "Contact MATERPOOLS AND CONTRUCTION",
    ogDescription: "Reach out for your free pool design consultation.",
  }),
  quotation: createMetaTags({
    title: "Pool Quotation | MATERPOOLS AND CONTRUCTION",
    description: "Get a detailed quotation for your custom pool project.",
    keywords: ["pool quotation", "pool pricing", "pool estimate", "pool cost"],
    ogTitle: "MATERPOOLS AND CONTRUCTION Quotation",
    ogDescription: "Request your custom pool quotation.",
  }),
  dashboard: createMetaTags({
    title: "Dashboard | MATERPOOLS AND CONTRUCTION",
    description: "Manage your pool project and account.",
    noindex: true,
  }),
  admin: createMetaTags({
    title: "Admin Dashboard | MATERPOOLS AND CONTRUCTION",
    description: "Admin panel for MATERPOOLS AND CONTRUCTION management.",
    noindex: true,
  }),
};
