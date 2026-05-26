"use client";

import React from "react";
import { OnThisDay } from "../../onthisday.types";
import { AdminOnThisDayActions } from "./AdminOnThisDayActions";

type AdminOnThisDayTableProps = {
  data: OnThisDay[];
  onEdit: (item: OnThisDay) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
};

export const AdminOnThisDayTable: React.FC<AdminOnThisDayTableProps> = ({
  data,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-xl bg-surface max-w-feed mx-auto animate-fade-in">
        <p className="text-base font-medium text-foreground-muted">Không tìm thấy sự kiện lịch sử nào</p>
        <p className="text-sm text-foreground-muted/70 mt-1">Hệ thống chưa có dữ liệu cho mốc thời gian này.</p>
      </div>
    );
  }

  return (
    <div className="w-full border border-border rounded-xl bg-surface overflow-hidden shadow-sm animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-muted/40 border-b border-border text-foreground font-medium">
            <tr>
              <th className="p-4 pl-6 whitespace-nowrap max-w-[120px]">Ngày diễn ra</th>
              <th className="p-4 whitespace-nowrap max-w-[200px]">Tiêu đề</th>
              <th className="p-4 text-foreground-muted">Mô tả chi tiết</th>
              <th className="p-4 pr-6 text-right whitespace-nowrap max-w-[150px]">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-muted text-foreground-muted">
            {data.map((item) => {
              const dateObj = new Date(item.eventDate);
              const formattedDate = !isNaN(dateObj.getTime())
                ? new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(dateObj)
                : item.eventDate;

              return (
                <tr key={item.id} className="hover:bg-muted/10 transition-colors group">
                  <td className="p-4 pl-6 font-medium text-foreground whitespace-nowrap align-top">
                    {formattedDate}
                  </td>
                  <td className="p-4 font-semibold text-foreground align-top break-words max-w-[200px]">
                    {item.title}
                  </td>
                  <td className="p-4 align-top break-words max-w-prose text-justify leading-relaxed">
                    <p className="line-clamp-3 group-hover:line-clamp-none transition-all duration-200">
                      {item.description}
                    </p>
                  </td>
                  <td className="p-4 pr-6 align-top text-right whitespace-nowrap">
                    <AdminOnThisDayActions
                      onEdit={() => onEdit(item)}
                      onDelete={() => onDelete(item.id)}
                      disabled={isDeleting}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};