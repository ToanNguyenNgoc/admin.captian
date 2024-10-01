import { PageRequest, TicketResponse } from ".";

export interface ExtraData {
  payUrl: string;
}

export interface PaymentGateway {
  id: number;
  status: string;
  amount: number;
  description: string;
  transaction_uuid: string;
  extra_data: ExtraData;
  payment_method_id: number;
  paymentable_type: string;
  paymentable_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Productable {
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

export interface OrderProductable {
  id: number;
  base_price: number;
  quantity: number;
  ticket:TicketResponse;
  uuid:string;
  is_check_in:boolean
}

export interface PaymentMethod {
  id: number;
  name_key: string;
  is_changeable: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrderResponse {
  id: number;
  tran_uid:string;
  status: 'PAID' | 'PENDING' | 'ERROR' | 'CANCELED' | 'CANCELED_BY_USER';
  amount: number;
  note: string | null;
  fullname: string;
  email: string;
  facebook:string;
  telephone: string;
  payment_method_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  check_in:boolean;
  // discount_value: number;
  // payment_gateway: PaymentGateway;
  productable: OrderProductable[];
  // payment_method: PaymentMethod;
}

export interface OrderRequest extends PageRequest {
  status?: 'PAID' | 'PENDING' | 'ERROR' | 'CANCELED' | 'CANCELED_BY_USER'
}