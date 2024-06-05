import { Instance, types } from "mobx-state-tree";
import UserScanModel from "./UserScanModel";
import { createContext, useContext } from "react";

const RootStoreModel = types.model('RootStore', {
  userScanModel: types.optional(UserScanModel, {}),
});

export const rootStore = RootStoreModel.create({});
export interface IRootStore extends Instance<typeof RootStoreModel> { }
export const RootStoreContext = createContext<IRootStore>({} as IRootStore);
export const useStores = () => useContext(RootStoreContext);
export default RootStoreModel;