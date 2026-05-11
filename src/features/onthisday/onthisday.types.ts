// src/features/onthisday/onthisday.types.ts
export interface OnThisDayEvent {
  id: string;
  date: string;        // ví dụ: "05-11"
  year: number;
  title: string;
  description: string;
}

export interface OnThisDayResponse {
  date: string;
  events: OnThisDayEvent[];
  total: number;
}   