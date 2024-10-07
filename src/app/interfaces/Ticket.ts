export interface TicketResponse {
  id: number;
  title: string;
  content: string;
  status: boolean;
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
  image_url?:string
}
export interface PostTicket {
  title: string;
  content: string;
  status: boolean;
  date_start: string;
  date_end: string;
  price: number;
  price_sale: number;
  note: string;
  address: string;
  image_url?:string;
}