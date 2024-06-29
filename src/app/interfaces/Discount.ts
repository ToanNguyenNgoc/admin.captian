export interface DiscountResponse {
  coupon_code: string;
  created_at: string;
  deleted_at: string | null;
  description: string;
  discount_value: number;
  id: number;
  is_campaign: number;
  title: string;
  total: number | null;
  updated_at: string;
  used: number;
  user_id: number;
  valid_from: string;
  valid_util: string;
}
export interface DiscountCampaignResponse{
  coupon_code:string;
  status:0|1
}

export interface PostDiscount {
  title: string;
  coupon_code: string;
  description: string;
  is_campaign: number;
  valid_from: string;
  valid_until: string;
  discount_value: number;
  total: number | null;
}