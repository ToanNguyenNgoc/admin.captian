import { AxiosConfig } from "../configs";

export const AuthApi = {
  login: (data: { email: string, password: string }) =>
    AxiosConfig()
      .post('/api/auth/login', data)
      .then(res => res.data)
}