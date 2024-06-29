import { AxiosConfig } from "../configs";
import { OrderRequest } from "../interfaces";

export const OrderApi = {
  get: (params?: OrderRequest) => AxiosConfig().get('/api/orders', { params }).then(res => res.data)
}