import { UseQueryOptions, useQuery } from "react-query";
import { OrderRequest, OrderResponse, Response, ResponsePagination } from "../../interfaces";
import { OrderApi } from "../../apis";

export const useGetOrders = (params?: OrderRequest, options?: UseQueryOptions<Response<ResponsePagination<OrderResponse[]>>>) => {
  const query = useQuery<Response<ResponsePagination<OrderResponse[]>>>({
    queryKey: ['useGetOrders', params],
    queryFn: () => OrderApi.get(params),
    staleTime: 0,
    ...options
  })
  const orders = query.data?.context.data || []
  const total_page = query.data?.context.last_page || 0
  const total = query.data?.context.total || 0
  return Object.assign(query, {
    orders,
    total_page,
    total
  })
}

type OrderResponseType = Response<OrderResponse>

export function useGetOrderDetail(id: number, options?: UseQueryOptions<OrderResponseType>) {
  const query = useQuery<OrderResponseType>({
    queryKey: ['useGetOrderDetail', id],
    queryFn: () => OrderApi.getDetail(id),
    enabled: !!id,
    ...options
  })
  const detail = query.data?.context
  return Object.assign(query, {
    detail,
    productable: detail?.productable || []
  })
}