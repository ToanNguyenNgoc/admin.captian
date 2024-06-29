import { UseQueryOptions, useMutation, useQuery } from "react-query";
import { PageRequest, PostTicket, Response, ResponsePagination, TicketResponse } from "../../interfaces";
import { TicketApi } from "../../apis";
import { useNavigate } from "react-router-dom";
import { InitAlert } from "../../components";

export const useGetTickets = (params: PageRequest, options?: UseQueryOptions<Response<ResponsePagination<TicketResponse[]>>>) => {
  const query = useQuery<Response<ResponsePagination<TicketResponse[]>>>({
    queryKey: ['useGetTickets', params],
    queryFn: () => TicketApi.get(params),
    ...options
  })
  return Object.assign(query, {
    tickets: query.data?.context.data || [],
    total: query.data?.context.total
  })
}

export const useGetTicketDetail = (id: number, options?: UseQueryOptions<Response<TicketResponse>>) => {
  const query = useQuery<Response<TicketResponse>>({
    queryKey: ['useGetTicketDetail', id],
    queryFn: () => TicketApi.getById(id),
    ...options
  })
  return query
}

export const usePostTicket = () => {
  const navigate = useNavigate()
  return useMutation<Response<TicketResponse>, Error, PostTicket>({
    mutationFn: (body) => TicketApi.post(body),
    onSuccess: (data) => {
      InitAlert.alert({ message: 'Tạo vé thành công !', variant: 'success' })
      setTimeout(() => navigate(-1), 1000)
    },
    onError: () => {
      InitAlert.alert({ message: 'Có lỗi xảy ra', variant: 'danger' })
    }
  })
}

export const useUpdateTicket = (id: number, goBack?: boolean) => {
  const navigate = useNavigate()
  return useMutation<Response<TicketResponse>, Error, PostTicket>({
    mutationFn: (body) => TicketApi.update(id, body),
    onSuccess: (data) => {
      InitAlert.alert({ message: 'Thay đổi vé thành công !', variant: 'success' })
      if (goBack) {
        setTimeout(() => navigate(-1), 1000)
      }
    },
    onError: () => {
      InitAlert.alert({ message: 'Có lỗi xảy ra', variant: 'danger' })
    }
  })
}