import { AxiosConfig } from "../configs";

export const AuthApi = {
  login: (data: { email: string, password: string }) =>
    AxiosConfig()
      .post('/api/auth/login', data)
      .then(res => res.data),
  getProfile: (token: string) =>
    AxiosConfig({ token })
      .get('/api/profiles/show')
      .then(res => res.data)
}