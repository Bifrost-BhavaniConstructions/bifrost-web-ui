import { createStore } from "easy-peasy";
import UserStore from "./userStore/userStore";
import { UserStoreModel } from "./userStore/userStoreModel";
import { PeopleStoreModel } from "./peopleStore/peopleStoreModel";
import PeopleStore from "./peopleStore/peopleStore";
import FunctionHallStore from "./functionHallStore/functionHallStore";
import { FunctionHallStoreModel } from "./functionHallStore/functionHallStoreModel";

export interface StoreModel {
  userStore: UserStoreModel;
  peopleStore: PeopleStoreModel;
  functionHallStore: FunctionHallStoreModel;
}

const store = createStore<StoreModel>({
  userStore: UserStore,
  peopleStore: PeopleStore,
  functionHallStore: FunctionHallStore,
});

export default store;
