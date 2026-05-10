import Image from "next/image";

interface AvatarProps {
    avatarUrl?: string | null;
    displayName?: string;
}

export function Avatar({ avatarUrl, displayName = "avatar" }: AvatarProps) {
    return (
        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-surface flex-shrink-0 ring-1 ring-border">
            {avatarUrl ? (
                <Image
                    src={avatarUrl}
                    alt={displayName}
                    fill
                    sizes="36px"
                    className="object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-active text-primary-fg font-bold text-base">
                    {displayName.charAt(0).toUpperCase() || "N"}
                </div>
            )}
        </div>
    );
}
export default Avatar;
