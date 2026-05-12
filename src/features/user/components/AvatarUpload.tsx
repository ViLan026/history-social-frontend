import {
    Camera,
    Upload,
} from "lucide-react";

import Avatar from "@/components/ui/Avatar";

interface Props {
    avatarPreview: string | null;
    displayName: string;
    onUploadClick: () => void;
}

export default function AvatarUpload({
    avatarPreview,
    displayName,
    onUploadClick,
}: Props) {

    return (
        <div className="flex items-center gap-6">

            <div className="relative">

                <Avatar
                    avatarUrl={avatarPreview}
                    displayName={displayName}
                />

                <button
                    type="button"
                    onClick={onUploadClick}
                    className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-primary-fg shadow-lg"
                >
                    <Camera className="h-4 w-4" />
                </button>

            </div>

            <div>

                <button
                    type="button"
                    onClick={onUploadClick}
                    className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium"
                >
                    <Upload className="h-4 w-4" />

                    Upload Photo
                </button>

                <p className="mt-2 text-xs text-foreground-muted">
                    JPG, PNG or GIF. Max 5MB.
                </p>

            </div>

        </div>
    );
}