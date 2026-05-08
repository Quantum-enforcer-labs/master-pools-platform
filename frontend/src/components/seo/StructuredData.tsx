/**
 * Structured Data Components for SEO
 * Renders JSON-LD schema markup in document head
 */

interface SchemaProps {
  schema: Record<string, any>;
}

export function StructuredData({ schema }: SchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MATERPOOLS AND CONTRUCTION",
  url: "https://masterpools.co.zw",
  logo: "https://masterpools.co.zw/logo.svg",
  description:
    "Zimbabwe's most trusted luxury swimming pool construction company",
  telephone: "+263772562125",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Harare",
    addressCountry: "ZW",
    addressRegion: "Harare Province",
  },
  sameAs: [
    "https://www.facebook.com/masterpools",
    "https://www.instagram.com/masterpools",
  ],
  areaServed: "ZW",
  priceRange: "$$$",
  image: "https://masterpools.co.zw/og-image.png",
};

export function organizationSchemaWithFAQ(
  faqItems: Array<{ question: string; answer: string }>,
) {
  return {
    ...organizationSchema,
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function projectSchema(project: {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image || "https://masterpools.co.zw/default-project.png",
    category: project.category,
    author: {
      "@type": "Organization",
      name: "MATERPOOLS AND CONTRUCTION",
    },
    ...(project.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: project.rating,
        reviewCount: project.reviewCount || 1,
      },
    }),
  };
}

export function reviewSchema(review: {
  title: string;
  author: string;
  rating: number;
  content: string;
  date?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    headline: review.title,
    author: {
      "@type": "Person",
      name: review.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: review.content,
    ...(review.date && { datePublished: review.date }),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
