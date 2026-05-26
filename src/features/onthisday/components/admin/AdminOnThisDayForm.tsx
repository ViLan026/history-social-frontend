"use client";

import React, { useState } from "react";
import { OnThisDay, OnThisDayRequest } from "../../onthisday.types";

type AdminOnThisDayFormProps = {
  initialData?: OnThisDay | null;
  onSubmit: (data: OnThisDayRequest) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export const AdminOnThisDayForm: React.FC<AdminOnThisDayFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<OnThisDayRequest>(() => ({
    eventDate: initialData ? initialData.eventDate.split("T")[0] : "",
    title: initialData?.title || "",
    description: initialData?.description || "",
  }));
  
  const [error, setError] = useState<string>("");
  const isEdit = !!initialData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.eventDate.trim() || !formData.title.trim() || !formData.description.trim()) {
      setError("Vui lòng điền đầy đủ tất cả các thông tin bắt buộc.");
      return;
    }
    if (formData.description.trim().length < 10) {
      setError("Mô tả sự kiện lịch sử quá ngắn. Yêu cầu tối thiểu 10 ký tự.");
      return;
    }
    setError("");
    onSubmit({
      eventDate: formData.eventDate.trim(),
      title: formData.title.trim(),
      description: formData.description.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md border border-border bg-card rounded-xl p-6 shadow-xl animate-slide-up">
        <header className="mb-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {isEdit ? "Cập nhật sự kiện lịch sử" : "Thêm sự kiện mới"}
          </h2>
          <p className="text-xs text-foreground-muted mt-0.5">
            Điền thông tin chính xác về mốc thời gian và nội dung lịch sử.
          </p>
        </header>
        
        {error && (
          <div className="mb-4 text-xs font-medium text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-lg animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
              Ngày diễn ra sự kiện <span className="text-destructive">*</span>
            </label>
            <input
              type="date"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
              value={formData.eventDate}
              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
              Tiêu đề mốc lịch sử <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              placeholder="Ví dụ: Chiến thắng Điện Biên Phủ"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
              Mô tả chi tiết sự kiện <span className="text-destructive">*</span>
            </label>
            <textarea
              placeholder="Nhập diễn biến nội dung tóm tắt chi tiết của sự kiện..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow resize-none"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-muted">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors focus:outline-none disabled:opacity-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-fg hover:opacity-90 shadow-sm transition-all focus:outline-none disabled:opacity-50"
            >
              {isSubmitting ? "Đang lưu..." : isEdit ? "Lưu cập nhật" : "Tạo sự kiện"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};