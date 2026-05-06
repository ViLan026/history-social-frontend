import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: number; // px
  className?: string;
}

export function Avatar({
  src,
  alt = "avatar",
  size = 40,
  className,
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-surface border border-border",
        className
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm text-foreground-muted">
          {alt?.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
export default Avatar;