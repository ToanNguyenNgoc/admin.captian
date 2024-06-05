import { flow, types } from "mobx-state-tree";
import { storage_key } from "../utils";

const UserScanModel = types
  .model("UserScan", {
    isLogin: types.optional(types.boolean, !!sessionStorage.getItem(storage_key.auth_token_scan))
  })
  .actions(self => {
    // eslint-disable-next-line require-yield
    const onSetLogin = flow(function* onSetLogin() {
      self.isLogin = true
    })
    return {
      onSetLogin
    }
  })

export default UserScanModel