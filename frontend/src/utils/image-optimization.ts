/**
 * Performance utilities for image optimization and lazy loading
 */

/**
 * Generate WebP variant of image URL
 * Example: converts image.jpg to image.webp
 */
export const getWebPUrl = (url: string): string => {
  if (!url) return url;
  return url.replace(/\.(jpg|jpeg|png)$/i, ".webp");
};

/**
 * Generate srcSet for responsive images
 * Example: generates srcSet with multiple sizes
 */
export const generateSrcSet = (
  baseUrl: string,
  sizes: number[] = [640, 1024, 1440],
): string => {
  if (!baseUrl) return "";
  return sizes.map((size) => `${baseUrl}?w=${size} ${size}w`).join(", ");
};

/**
 * Generate sizes attribute for responsive images
 * Helps browser choose correct image size
 */
export const generateSizes = (): string => {
  return "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, (max-width: 1440px) 60vw, 1200px";
};

/**
 * Preload an image for better performance
 */
export const preloadImage = (src: string): void => {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  document.head.appendChild(link);
};

/**
 * Check if browser supports WebP
 */
let webpSupport: boolean | null = null;

export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (webpSupport !== null) {
      resolve(webpSupport);
      return;
    }

    const webp = new Image();
    webp.onload = webp.onerror = () => {
      webpSupport = webp.height === 2;
      resolve(webpSupport);
    };
    webp.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADwAQCdASoBIAEAEAcJZACdLoAA3AA=";
  });
};

/**
 * Get optimized image URL with format negotiation
 */
export const getOptimizedImageUrl = async (
  baseUrl: string,
  fallbackUrl?: string,
): Promise<string> => {
  try {
    const supportsWp = await supportsWebP();
    if (supportsWp && baseUrl) {
      return getWebPUrl(baseUrl);
    }
  } catch {
    // Fallback to original URL
  }
  return baseUrl || fallbackUrl || "";
};

/**
 * Observe images and load them when in viewport
 */
export const createLazyLoadObserver = (
  callback?: (img: HTMLImageElement) => void,
) => {
  if (typeof window === "undefined") return null;

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src && !img.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          callback?.(img);
        }
      }
    });
  });
};

/**
 * Get image aspect ratio string
 */
export const getAspectRatio = (width: number, height: number): string => {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
};
