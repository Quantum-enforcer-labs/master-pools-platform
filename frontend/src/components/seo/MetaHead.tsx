/**
 * Dynamic Meta Tags Component
 * Updates document head with proper meta tags for SEO
 */

import { useEffect } from "react";

interface MetaHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

export function MetaHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  noindex = false,
}: MetaHeadProps) {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
      updateMetaTag("og:title", ogTitle || title);
    }

    // Update description
    if (description) {
      updateMetaTag("description", description);
      updateMetaTag("og:description", ogDescription || description);
    }

    // Update og:type
    updateMetaTag("og:type", ogType);

    // Update og:image
    if (ogImage) {
      updateMetaTag("og:image", ogImage);
      updateMetaTag("og:image:width", "1200");
      updateMetaTag("og:image:height", "630");
    }

    // Update canonical
    if (canonical) {
      updateCanonical(canonical);
    } else {
      updateCanonical(window.location.href);
    }

    // Update noindex
    if (noindex) {
      updateMetaTag("robots", "noindex, nofollow");
    } else {
      removeMetaTag("robots");
    }
  }, [
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    noindex,
  ]);

  return null;
}

function updateMetaTag(name: string, content: string) {
  let tag = document.querySelector(
    `meta[name="${name}"], meta[property="${name}"]`,
  );

  if (!tag) {
    tag = document.createElement("meta");
    if (name.startsWith("og:")) {
      tag.setAttribute("property", name);
    } else {
      tag.setAttribute("name", name);
    }
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function removeMetaTag(name: string) {
  const tag = document.querySelector(`meta[name="${name}"]`);
  if (tag) {
    tag.remove();
  }
}

function updateCanonical(url: string) {
  let canonical = document.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", url);
}
