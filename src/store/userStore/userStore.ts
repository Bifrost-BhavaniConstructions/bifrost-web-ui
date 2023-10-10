import { action, thunk } from "easy-peasy";
import { UserStoreModel } from "./userStoreModel";

const UserStore: UserStoreModel = {
  token: "",
  dataFetched: false,
  user: null,
  setToken: action((state, payload) => {
    state.token = payload;
  }),
  setDataFetched: action((state, payload) => {
    state.dataFetched = payload;
  }),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  logoutUser: thunk((actions) => {
    actions.setToken("");
    actions.setUser(null);
    actions.setDataFetched(true);
  }),
};

export default UserStore;
