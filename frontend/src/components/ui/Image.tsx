import { ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  lazy?: boolean;
  priority?: boolean;
  aspectRatio?: number;
  sizes?: string;
  srcSet?: string;
}

/**
 * Optimized image component with lazy loading and performance best practices
 */
export default function OptimizedImage({
  src,
  alt,
  lazy = true,
  priority = false,
  aspectRatio,
  sizes,
  srcSet,
  style,
  ...props
}: OptimizedImageProps) {
  const containerStyle = {
    ...style,
    ...(aspectRatio && { aspectRatio: `${aspectRatio}` }),
  } as React.CSSProperties;

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : lazy ? "lazy" : "eager"}
      decoding="async"
      sizes={sizes}
      srcSet={srcSet}
      fetchPriority={priority ? "high" : props.fetchPriority}
      style={{ ...containerStyle, display: "block" }}
      {...props}
    />
  );
}
