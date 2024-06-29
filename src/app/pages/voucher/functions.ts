import { UseQueryOptions, useMutation, useQuery } from "react-query"
import { DiscountApi } from "../../apis"
import { DiscountCampaignResponse, DiscountResponse, PageRequest, PostDiscount, Response, ResponsePagination } from "../../interfaces"
import { useNavigate } from "react-router-dom"

export const useGetDiscounts = (options?: UseQueryOptions<Response<ResponsePagination<DiscountResponse[]>>>) => {
  const query = useQuery<Response<ResponsePagination<DiscountResponse[]>>>({
    queryKey: ['discounts'],
    queryFn: () => DiscountApi.get(),
    ...options
  })
  return Object.assign(query, {
    discounts: query.data?.context.data || [],
    total: query.data?.context.total
  })
}

export const usePostDiscount = () => {
  const navigate = useNavigate()
  return useMutation<Response<DiscountResponse>, Error, PostDiscount>({
    mutationFn: (body) => DiscountApi.post(body),
    onSuccess: (data) => {
      setTimeout(() => navigate(-1), 1000)
    }
  })
}

export const useGetDiscountCampaign = (id: number, params: PageRequest, options?: UseQueryOptions<Response<ResponsePagination<DiscountCampaignResponse[]>>>) => {
  const query = useQuery<Response<ResponsePagination<DiscountCampaignResponse[]>>>({
    queryKey: ['discount_campaign', id, params],
    queryFn: () => DiscountApi.getCodeCampaign(id, params),
    enabled: !!id,
    ...options
  })
  
  return Object.assign(query, {
    codes: query.data?.context.data || [],
    total: query.data?.context.total || 0,
    total_page: Math.ceil(Number(query.data?.context.total || 1) / Number(params.limit || 1))
  })
}