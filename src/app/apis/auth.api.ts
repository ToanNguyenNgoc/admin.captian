import { AxiosConfig } from "../configs";

export const AuthApi = {
  login: (data: { email: string, password: string, recaptcha?:string }) =>
    AxiosConfig()
      .post('/api/auth/login', data)
      .then(res => res.data),
  loginEmployee: (data: { email: string, password: string }) =>
    AxiosConfig()
      .post('/api/auth/login-employee', data)
      .then(res => res.data),
  getProfile: (token: string) =>
    AxiosConfig({ token })
      .get('/api/auth/profile')
      .then(res => res.data)
}