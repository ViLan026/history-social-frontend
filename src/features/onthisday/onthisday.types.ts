// history-social-frontend\src\features\onthisday\onthisday.types.ts

export interface OnThisDay {
  id: string;
  eventDate: string;
  title: string;
  description: string;
}

export interface OnThisDayRequest {
  eventDate: string;
  title: string;
  description: string;
}