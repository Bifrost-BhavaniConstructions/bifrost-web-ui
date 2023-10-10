import { createStore } from "easy-peasy";
import UserStore from "./userStore/userStore";
import { UserStoreModel } from "./userStore/userStoreModel";
import { PeopleStoreModel } from "./peopleStore/peopleStoreModel";
import PeopleStore from "./peopleStore/peopleStore";

export interface StoreModel {
  userStore: UserStoreModel;
  peopleStore: PeopleStoreModel;
}

const store = createStore<StoreModel>({
  userStore: UserStore,
  peopleStore: PeopleStore,
});

export default store;
