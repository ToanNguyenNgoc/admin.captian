import { AxiosConfig } from "../configs";

export const MediaApi = {
  postMedia: (formData: FormData) => AxiosConfig().post('/media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}