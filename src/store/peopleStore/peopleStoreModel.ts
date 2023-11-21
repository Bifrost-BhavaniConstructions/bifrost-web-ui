import { Action, Computed, Thunk } from "easy-peasy";
import { User } from "../../types/User";

export interface PeopleStoreModel {
  users: User[];
  siteUsers: Computed<PeopleStoreModel, User[]>;
  functionHallUsers: Computed<PeopleStoreModel, User[]>;
  setUsers: Action<PeopleStoreModel, User[]>;
  fetchUsers: Thunk<PeopleStoreModel, void>;
}
