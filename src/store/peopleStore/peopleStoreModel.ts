import { Action, Thunk } from "easy-peasy";
import { User } from "../../types/User";

export interface PeopleStoreModel {
  users: User[];
  setUsers: Action<PeopleStoreModel, User[]>;
  fetchUsers: Thunk<PeopleStoreModel, void>;
}
