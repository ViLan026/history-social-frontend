import { create } from "zustand";
import { OnThisDay } from "./onthisday.types";

interface OnThisDayState {
  isOpenModal: boolean;
  selectedEvent: OnThisDay | null; // Nếu null là đang ở chế độ "Thêm mới", ngược lại là "Cập nhật"
  
  // Các hàm điều khiển trạng thái công cụ UI
  openCreateModal: () => void;
  openEditModal: (event: OnThisDay) => void;
  closeModal: () => void;
}

export const useOnThisDayStore = create<OnThisDayState>((set) => ({
  isOpenModal: false,
  selectedEvent: null,

  openCreateModal: () => set({ isOpenModal: true, selectedEvent: null }),
  
  openEditModal: (event) => set({ isOpenModal: true, selectedEvent: event }),
  
  closeModal: () => set({ isOpenModal: false, selectedEvent: null }),
}));