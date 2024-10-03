import { AxiosConfig } from "../configs";
import { PageRequest, PostTicket } from "../interfaces";

export const TicketApi = {
  get: (params: PageRequest) => AxiosConfig().get('/api/tickets', { params }).then(res => res.data),
  getById: (id: number) => AxiosConfig().get(`/api/tickets/${id}`).then(res => res.data),
  post: (body: PostTicket) => AxiosConfig().post('/api/tickets', body).then(res => res.data),
  update: (id: number, body: PostTicket) => AxiosConfig().put(`/api/tickets/${id}`, body).then(res => res.data)
}