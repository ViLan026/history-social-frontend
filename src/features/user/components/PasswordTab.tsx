"use client";

import Button from "@/components/ui/Button";
import { useState } from "react";

interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface Props {
    onClose: () => void;
    isSubmitting: boolean;
    setIsSubmitting: (value: boolean) => void;
}

export default function PasswordTab({
    onClose,
    isSubmitting,
    setIsSubmitting,
}: Props) {
    const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handlePasswordChange = (
        field: keyof PasswordFormData,
        value: string
    ) => {
        setPasswordForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const resetForm = () => {
        setPasswordForm({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Kiểm tra mật khẩu khớp
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert("Mật khẩu mới và xác nhận không khớp!");
            setIsSubmitting(false);
            return;
        }

        try {
            // TODO: Gọi API change password
            console.log("Change password:", passwordForm);

            await new Promise(resolve => setTimeout(resolve, 800)); // giả lập

            alert("Đổi mật khẩu thành công!");
            resetForm();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Đổi mật khẩu thất bại");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium">Mật khẩu hiện tại</label>
                <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5"
                    required
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Mật khẩu mới</label>
                <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5"
                    required
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Xác nhận mật khẩu mới</label>
                <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5"
                    required
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={resetForm}
                    disabled={isSubmitting}
                >
                    Làm lại
                </Button>

                <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                >
                    Đổi mật khẩu
                </Button>
            </div>
        </form>
    );
}