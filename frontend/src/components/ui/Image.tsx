import { ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  lazy?: boolean;
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
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      sizes={sizes}
      srcSet={srcSet}
      style={containerStyle}
      {...props}
    />
  );
}
