import { AxiosConfig } from "../configs";
import { storage_key } from "../utils";

export const CheckInApi = {
  checkInTicket: (uid: string) =>
    AxiosConfig({
      token: sessionStorage.getItem(storage_key.auth_token_scan) || ''
    })
      .post(`/api/ticket-code/${uid}`)
      .then(res => res.data)
}