import { action, thunk } from "easy-peasy";
import { PeopleStoreModel } from "./peopleStoreModel";
import { getAllUsers } from "../../adapters/PeopleAdapter";
import { toast } from "react-toastify";
import { EmptyUser } from "../../types/EmptyTypes";

const PeopleStore: PeopleStoreModel = {
  users: [EmptyUser],
  setUsers: action((state, payload) => {
    state.users = payload;
  }),
  fetchUsers: thunk((actions) => {
    getAllUsers()
      .then((res) => {
        actions.setUsers(res);
      })
      .catch((err) => {
        console.error(err);
        toast("Error Fetching People", { type: "error" });
      });
  }),
};

export default PeopleStore;
