import { action, computed, thunk } from "easy-peasy";
import { PeopleStoreModel } from "./peopleStoreModel";
import { getAllUsers } from "../../adapters/PeopleAdapter";
import { toast } from "react-toastify";
import { EmptyUser } from "../../types/EmptyTypes";
import { PlatformEnum } from "../../enums/PlatformEnum";

const PeopleStore: PeopleStoreModel = {
  users: [EmptyUser],
  siteUsers: computed((state) => {
    return state.users.filter((user) =>
      user.platforms.includes(PlatformEnum.SITE),
    );
  }),
  functionHallUsers: computed((state) => {
    return state.users.filter((user) =>
      user.platforms.includes(PlatformEnum.FUNCTION_HALL),
    );
  }),
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
