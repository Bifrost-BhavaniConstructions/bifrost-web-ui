import { createStore } from "easy-peasy";
import UserStore from "./userStore/userStore";
import { UserStoreModel } from "./userStore/userStoreModel";
import { PeopleStoreModel } from "./peopleStore/peopleStoreModel";
import PeopleStore from "./peopleStore/peopleStore";
import FunctionHallStore from "./functionHallStore/functionHallStore";
import { FunctionHallStoreModel } from "./functionHallStore/functionHallStoreModel";
import { CashAccountStoreModel } from "./cashAccountStore/cashAccountStoreModel";
import CashAccountStore from "./cashAccountStore/cashAccountStore";
import { SiteManagementStoreModel } from "./siteManagementStore/siteManagementStoreModel";
import siteManagementStore from "./siteManagementStore/siteManagementStore";

export interface StoreModel {
  userStore: UserStoreModel;
  peopleStore: PeopleStoreModel;
  functionHallStore: FunctionHallStoreModel;
  cashAccountStore: CashAccountStoreModel;
  siteManagementStore: SiteManagementStoreModel;
}

const store = createStore<StoreModel>({
  userStore: UserStore,
  peopleStore: PeopleStore,
  functionHallStore: FunctionHallStore,
  cashAccountStore: CashAccountStore,
  siteManagementStore: siteManagementStore,
});

export default store;
