export interface TicketResponse {
  id: number;
  title: string;
  content: string;
  status: number;
  date_start: string;
  date_end: string;
  price: number;
  price_sale: number;
  note: string;
  address: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
export interface PostTicket {
  title: string;
  content: string;
  status: number;
  date_start: string;
  date_end: string;
  price: number;
  price_sale: number;
  note: string;
  address: string;
}