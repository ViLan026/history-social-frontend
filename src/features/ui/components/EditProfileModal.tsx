"use client";

import { useEffect, useState } from "react";
import { useUIStore } from "@/features/ui/ui.store";
import { useCurrentUser } from "@/features/user/useUser";

import ProfileTab from "@/features/user/components/ProfileTab";
import PasswordTab from "@/features/user/components/PasswordTab";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export default function EditProfileModal() {
    const { editProfileModal, closeEditProfile } = useUIStore();
    const iseditProfileModal = editProfileModal.isOpen;
    const { data: currentUser } = useCurrentUser();

    const [activeTab, setActiveTab] = useState<"profile" | "password">(
        "profile"
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (iseditProfileModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [iseditProfileModal]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && iseditProfileModal) {
                closeEditProfile();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [iseditProfileModal, closeEditProfile]);

    if (!editProfileModal.isOpen || !currentUser) {
        return null;
    }

    return (
        <div className="fixed inset-x-0 bottom-0 top-14 z-50 flex items-center justify-center p-0 md:p-4 bg-surface-overlay/100 backdrop-blur-sm">
            {/* Áp dụng chuẩn responsive: chiều cao h-[calc(100dvh-3.5rem)] trên mobile, tự động trên md, max-h cho lg/xl */}
            <div
                className={[
                    "relative flex w-full flex-col overflow-hidden bg-background shadow-2xl animate-slide-up",
                    "h-[calc(100dvh-3.5rem)] rounded-none",
                    "md:h-auto md:max-h-[85dvh] max-w-2xl md:rounded-2xl",
                    "lg:h-auto lg:h-[85dvh] lg:rounded-3xl"
                ].join(" ")}
                style={{
                    backgroundColor: "background" // backdropFilter: "blur(6px)"
                }}
            >
                {/* Header độc lập cho Mobile */}
                <div className="flex shrink-0 items-center justify-between bg-background px-4 py-3 z-20">
                    <h3 className="font-semibold text-foreground">
                        Chỉnh sửa hồ sơ
                    </h3>
                    <button
                        type="button"
                        onClick={closeEditProfile}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
                {/* Khung nội dung chính bao gồm Tabs và Content */}
                <div className="flex h-full w-full flex-col min-h-0 overflow-hidden">
                    {/* Tabs điều hướng */}
                    <div className="flex border-b border-slate-200 bg-background shrink-0">
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

                    {/* Vùng điền Form: Kích hoạt cuộn độc lập chống tràn màn hình */}
                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-4 md:p-6 min-h-0 bg-background">
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
        </div>
    );
}
