import { AxiosConfig } from "../configs";
import { OrderRequest } from "../interfaces";
import { storage_key } from "../utils";

export const OrderApi = {
  get: (params?: OrderRequest) => AxiosConfig().get('/api/orders', { params }).then(res => res.data),
  getDetail: (id: number) => AxiosConfig().get(`/api/orders/${id}`).then(res => res.data),
  update: (id: number, params: any) => AxiosConfig().put(`/api/orders/${id}`, params).then(res => res.data),
  getProductable: (id: string) => {
    return AxiosConfig({
      token: sessionStorage.getItem(storage_key.auth_token_scan) || ''
    })
      .get(`/api/productables/${id}`)
      .then(res => res.data)
  },
  checkInProductable: (uuid: string) => AxiosConfig({
    token: sessionStorage.getItem(storage_key.auth_token_scan) || ''
  })
    .patch(`/api/productables/${uuid}`, { is_check_in: true })
    .then(res => res.data)
}