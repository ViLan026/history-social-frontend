// ================= FILE: src/app/(main)/profile/page.tsx =================
"use client";

import { useState } from "react";
import { EditProfileModal } from "@/features/ui/components/EditProfileModal";
import { ChangePasswordModal } from "@/features/ui/components/ChangePasswordModal";
import { useCurrentUser } from "@/features/user/useUser";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";

export default function ProfilePage() {
    const { data: currentUser } = useCurrentUser();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-8">
            {/* Profile Header */}
            <div className="rounded-xl p-6 mb-6 bg-background border border-border">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar
                            avatarUrl={currentUser?.profile?.avatarUrl}
                            displayName={
                                currentUser?.profile?.displayName ?? ""
                            }
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-primary">
                                {currentUser?.profile?.displayName}
                            </h1>
                            <p className="text-foreground-muted">
                                @{currentUser?.email}
                            </p>
                            <p className="text-sm text-foreground-muted mt-2">
                                {currentUser?.profile?.bio}
                            </p>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <Button
                        onClick={() => setEditModalOpen(true)}
                        className="px-6 py-2 rounded-lg"
                    >
                        Edit Profile
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl text-center bg-background border border-border">
                    <p className="text-2xl font-bold text-primary">1.2K</p>
                    <p className="text-sm text-foreground-muted">Followers</p>
                </div>
                <div className="p-4 rounded-xl text-center bg-background border border-border">
                    <p className="text-2xl font-bold text-primary">850</p>
                    <p className="text-sm text-foreground-muted">Following</p>
                </div>
            </div>

            {/* Settings Section */}
            <div className="rounded-xl p-6 space-y-4 bg-background border border-border">
                <h2 className="text-lg font-bold text-primary mb-4">
                    Settings
                </h2>

                <Button
                    onClick={() => setPasswordModalOpen(true)}
                    variant="secondary"
                    className="w-full text-left "
                >
                    Change Password
                </Button>

                <Button
                    variant="ghost"
                    className="w-full text-left text-red-500 hover:bg-red-500/10"
                >
                    Logout
                </Button>
            </div>

            {/* Modals */}
            <EditProfileModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
            />

            <ChangePasswordModal
                isOpen={passwordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
            />
        </div>
    );
}
