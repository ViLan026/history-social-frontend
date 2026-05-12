"use client";

import { useState } from "react";
import { useUIStore } from "@/features/ui/ui.store";
import { useCurrentUser } from "@/features/user/useUser";

import ProfileTab from "@/features/user/components/ProfileTab";
import PasswordTab from "@/features/user/components/PasswordTab";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export default function EditProfileModal() {
    const { editProfileModal, closeEditProfile } = useUIStore();
    const { data: currentUser } = useCurrentUser();

    const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!editProfileModal.isOpen || !currentUser) {
        return null;
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                onClick={closeEditProfile}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-2xl rounded-2xl border border-border bg-background shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-border px-6 py-4">
                        <h2 className="text-xl font-semibold">Chỉnh sửa hồ sơ</h2>
                        <button
                            onClick={closeEditProfile}
                            className="rounded-lg p-2 hover:bg-muted transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-border">
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={cn(
                                "flex-1 py-3 text-sm font-medium transition-colors relative",
                                activeTab === "profile"
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Thông tin cá nhân
                            {activeTab === "profile" && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                            )}
                        </button>

                        <button
                            onClick={() => setActiveTab("password")}
                            className={cn(
                                "flex-1 py-3 text-sm font-medium transition-colors relative",
                                activeTab === "password"
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Đổi mật khẩu
                            {activeTab === "password" && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                            )}
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {activeTab === "profile" ? (
                            <ProfileTab 
                                currentUser={currentUser}
                                onClose={closeEditProfile}
                                isSubmitting={isSubmitting}
                                setIsSubmitting={setIsSubmitting}
                            />
                        ) : (
                            <PasswordTab 
                                onClose={closeEditProfile}
                                isSubmitting={isSubmitting}
                                setIsSubmitting={setIsSubmitting}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}