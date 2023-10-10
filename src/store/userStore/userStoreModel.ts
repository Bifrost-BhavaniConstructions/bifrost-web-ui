import { Action, Thunk } from "easy-peasy";
import { User } from "../../types/User";

export interface UserStoreModel {
  token: string;
  dataFetched: boolean;
  user: User | null;
  setToken: Action<UserStoreModel, string>;
  setDataFetched: Action<UserStoreModel, boolean>;
  setUser: Action<UserStoreModel, User | null>;
  logoutUser: Thunk<UserStoreModel, void>;
}
