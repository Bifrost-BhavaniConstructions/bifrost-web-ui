import { Action } from "easy-peasy";
import { User } from "../../types/User";

export interface PeopleStoreModel {
  users: User[];
  setUsers: Action<PeopleStoreModel, User[]>;
}
