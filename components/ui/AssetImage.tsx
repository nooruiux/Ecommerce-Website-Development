import Image, { type ImageProps } from "next/image";
import { hasAsset } from "@/lib/assets";
import { cn } from "@/lib/cn";

type AssetImageProps = Omit<ImageProps, "src"> & { src: string; fallbackClassName?: string };

/*
 * next/image when the exported file exists; otherwise a neutral box that keeps
 * the same footprint (fill → parent box, width/height → explicit size).
 */
export function AssetImage({
  src,
  alt,
  className,
  fallbackClassName,
  fill,
  width,
  height,
  style,
  ...props
}: AssetImageProps) {
  if (hasAsset(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={className}
        style={style}
        {...props}
      />
    );
  }
  return (
    <span
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      data-missing-asset={src}
      className={cn(
        "block",
        !fallbackClassName?.includes("bg-") && "bg-surface-subtle",
        fill ? "absolute inset-0 size-full" : "max-w-full",
        className,
        fallbackClassName,
      )}
      style={fill ? style : { width: Number(width), aspectRatio: `${width} / ${height}`, ...style }}
    />
  );
}
