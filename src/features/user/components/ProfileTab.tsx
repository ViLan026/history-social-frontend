"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import AvatarUpload from "./AvatarUpload";
import { UserResponse } from "../user.types";

interface ProfileFormData {
    username: string;
    displayName: string;
    bio: string;
    avatarUrl: string | null;
}

interface Props {
    currentUser: UserResponse; // Nên thay bằng type từ user.types.ts sau
    onClose: () => void;
    isSubmitting: boolean;
    setIsSubmitting: (value: boolean) => void;
}

export default function ProfileTab({
    currentUser,
    onClose,
    isSubmitting,
    setIsSubmitting,
}: Props) {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(
        currentUser?.profile.avatarUrl || null
    );

    // ==================== FORM STATE (tích hợp useProfileForm) ====================
    const [profileForm, setProfileForm] = useState<ProfileFormData>({
        username: currentUser?.profile.username || "",
        displayName: currentUser?.profile.displayName || "",
        bio: currentUser?.profile.bio || "",
        avatarUrl: currentUser?.profile.avatarUrl || null,
    });

    const handleProfileChange = (
        field: keyof ProfileFormData,
        value: string
    ) => {
        setProfileForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // TODO: Gọi API update profile ở đây
            console.log("Updating profile:", profileForm);

            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 800));

            alert("Cập nhật hồ sơ thành công!"); // Thay bằng toast sau
            onClose();
        } catch (error) {
            console.error("Update profile failed:", error);
            alert("Có lỗi xảy ra khi cập nhật hồ sơ");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAvatarUpload = (file: File) => {
        const previewUrl = URL.createObjectURL(file);
        setAvatarPreview(previewUrl);

        // Cập nhật vào form (nếu backend xử lý file riêng)
        setProfileForm(prev => ({
            ...prev,
            avatarUrl: previewUrl // tạm thời dùng preview, sau sẽ thay bằng URL từ server
        }));
    };

    // ==================== RENDER ====================
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <AvatarUpload
                avatarPreview={avatarPreview}
                displayName={profileForm.displayName || profileForm.username}
                onUploadClick={() => {
                    // Trigger file input (sẽ implement sau)
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) handleAvatarUpload(file);
                    };
                    input.click();
                }}
            />

            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Username
                </label>
                <input
                    type="text"
                    value={profileForm.username}
                    onChange={(e) => handleProfileChange("username", e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Tên hiển thị
                </label>
                <input
                    type="text"
                    value={profileForm.displayName}
                    onChange={(e) => handleProfileChange("displayName", e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Giới thiệu bản thân
                </label>
                <textarea
                    rows={4}
                    maxLength={160}
                    value={profileForm.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                    placeholder="Viết gì đó về bạn..."
                    className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                    {profileForm.bio.length}/160
                </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    Hủy
                </Button>

                <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                >
                    Lưu thay đổi
                </Button>
            </div>
        </form>
    );
}