import { PageRequest } from ".";

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

export interface Item {
  id: number;
  order_id: number;
  base_price: number;
  quantity: number;
  productable_type: string;
  productable_id: number;
  created_at: string;
  updated_at: string;
  uuid: string;
  is_checkin: number;
  discount_value: number;
  productable: Productable;
  discount: any;
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
  status: 'PAID' | 'PENDING' | 'ERROR' | 'CANCELED' | 'CANCELED_BY_USER';
  amount: number;
  description: string | null;
  fullname: string;
  email: string;
  phone: string;
  payment_method_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  discount_value: number;
  payment_gateway: PaymentGateway;
  items: Item[];
  payment_method: PaymentMethod;
}

export interface OrderRequest extends PageRequest {
  status?: 'PAID' | 'PENDING' | 'ERROR' | 'CANCELED' | 'CANCELED_BY_USER'
}