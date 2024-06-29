import { AxiosConfig } from "../configs";
import { PageRequest, PostDiscount } from "../interfaces";

export const DiscountApi = {
  get: () => AxiosConfig().get('/api/discounts').then(res => res.data),
  post: (body: PostDiscount) => AxiosConfig().post('/api/discounts/create', body).then(res => res.data),
  getCodeCampaign: (id: number, params: PageRequest) =>
    AxiosConfig()
      .get(`/api/discounts/getCampaignCode/${id}`, { params })
      .then(res => res.data)
}