// ================= FILE: src/features/user/components/EditProfileModal.tsx =================
"use client";

import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../user/user.service";
import { useCurrentUser } from "../../user/useUser";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Avatar from "@/components/ui/Avatar";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EditProfileModal = ({
    isOpen,
    onClose
}: EditProfileModalProps) => {
    const { data: currentUser } = useCurrentUser();
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        displayName: currentUser?.profile?.displayName || "",
        bio: currentUser?.profile?.bio || "",
        avatarFile: null as File | null,
        avatarPreview: currentUser?.profile?.avatarUrl || ""
    });

    const [errors, setErrors] = useState<{ displayName?: string }>({});

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            return userService.updateUser(currentUser!.id, {
                displayName: data.get("displayName") as string,
                bio: data.get("bio") as string,
                avatarUrl: data.get("avatarUrl") as string
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["current-user"] });
            onClose();
        }
    });

    const validateForm = (): boolean => {
        const newErrors: { displayName?: string } = {};
        if (!formData.displayName.trim()) {
            newErrors.displayName = "Name is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    avatarFile: file,
                    avatarPreview: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const submitData = new FormData();
        submitData.append("displayName", formData.displayName);
        submitData.append("bio", formData.bio);
        submitData.append("avatarUrl", formData.avatarPreview);

        mutation.mutate(submitData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/100 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-xl bg-surface border border-border shadow-lg animate-scale-in">
                {/* Header */}
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                        Edit Profile
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-foreground-muted hover:text-foreground transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Avatar (10% accent interaction via button) */}
                    <div className="flex flex-col items-center gap-3">
                        <Avatar
                            src={formData.avatarPreview}
                            alt="Preview"
                            className="w-20 h-20 border border-border"
                        />
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Change Avatar
                        </Button>
                    </div>

                    {/* Display Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            Display Name
                        </label>
                        <Input
                            value={formData.displayName}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    displayName: e.target.value
                                }))
                            }
                            placeholder="Your display name"
                            error={errors.displayName}
                        />
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            Bio
                        </label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    bio: e.target.value
                                }))
                            }
                            placeholder="Tell us about yourself"
                            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-faint focus:outline-none focus:ring-2 focus:ring-ring resize-none h-24"
                        />
                    </div>

                    {/* Actions (10% accent concentrated here) */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            isLoading={mutation.isPending}
                            className="flex-1"
                        >
                            Save Changes
                        </Button>
                    </div>

                    {/* Error */}
                    {mutation.isError && (
                        <p className="text-sm text-destructive">
                            Failed to update profile. Please try again.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};
