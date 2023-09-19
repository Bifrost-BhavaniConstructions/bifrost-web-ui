import {createStore} from "easy-peasy";
import UserStore from "./userStore/userStore";
import {UserStoreModel} from "./userStore/userStoreModel";

export interface StoreModel{
    userStore: UserStoreModel
}


const store = createStore<StoreModel>({
    userStore: UserStore
});

export default store;