"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../../user/user.service";
import { useCurrentUser } from "../../user/useUser";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ChangePasswordModal = ({
    isOpen,
    onClose
}: ChangePasswordModalProps) => {
    const { data: currentUser } = useCurrentUser();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState<{
        currentPassword?: string;
        newPassword?: string;
        confirmPassword?: string;
    }>({});

    const mutation = useMutation({
        mutationFn: async () => {
            return userService.changePassword(currentUser!.id, {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });
        },
        onSuccess: () => {
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
            onClose();
        }
    });

    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};

        if (!formData.currentPassword.trim()) {
            newErrors.currentPassword = "Current password is required";
        }
        if (!formData.newPassword.trim()) {
            newErrors.newPassword = "New password is required";
        }
        if (formData.newPassword.length < 6) {
            newErrors.newPassword = "Password must be at least 6 characters";
        }
        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        mutation.mutate();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div
                className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg"
                style={{ backgroundColor: "#F2F1ED" }}
            >
                <h2
                    className="text-xl font-bold mb-4"
                    style={{ color: "#7F0716" }}
                >
                    Change Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Current Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Current Password
                        </label>
                        <Input
                            type="password"
                            value={formData.currentPassword}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    currentPassword: e.target.value
                                }))
                            }
                            placeholder="Enter current password"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.currentPassword
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.currentPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.currentPassword}
                            </p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            New Password
                        </label>
                        <Input
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    newPassword: e.target.value
                                }))
                            }
                            placeholder="Enter new password"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.newPassword
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.newPassword}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Confirm Password
                        </label>
                        <Input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    confirmPassword: e.target.value
                                }))
                            }
                            placeholder="Confirm new password"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.confirmPassword
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg py-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="flex-1 text-white rounded-lg py-2"
                            style={{
                                backgroundColor: mutation.isPending
                                    ? "#ccc"
                                    : "#7F0716"
                            }}
                        >
                            {mutation.isPending
                                ? "Updating..."
                                : "Update Password"}
                        </Button>
                    </div>
                </form>

                {mutation.isError && (
                    <p className="text-red-500 text-sm mt-4">
                        {(mutation.error as any)?.message ||
                            "Failed to change password. Please try again."}
                    </p>
                )}
            </div>
        </div>
    );
};
