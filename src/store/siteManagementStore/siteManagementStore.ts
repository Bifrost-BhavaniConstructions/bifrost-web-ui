import { action, computed, thunk } from "easy-peasy";
import { toast } from "react-toastify";
import { SiteManagementStoreModel } from "./siteManagementStoreModel";
import {
  getAllCards,
  getAllMyPendingPurchaseRequests,
  getAllMyPurchaseRequests,
  getAllPhones,
  getAllSites,
  getAllVehicles,
} from "../../adapters/SiteManagementAdapter";

const SiteManagementStore: SiteManagementStoreModel = {
  sites: [],
  setSites: action((state, payload) => {
    state.sites = payload;
  }),
  fetchSites: thunk((actions) => {
    getAllSites()
      .then((res) => {
        actions.setSites(res);
      })
      .catch((err) => {
        console.error(err);
        toast("Error Fetching Sites", { type: "error" });
      });
  }),
  vehicles: [],
  setVehicles: action((state, payload) => {
    state.vehicles = payload;
  }),
  fetchVehicles: thunk((actions) => {
    getAllVehicles()
      .then((res) => {
        actions.setVehicles(res);
      })
      .catch((err) => {
        console.error(err);
        toast("Error Fetching Vehicles", { type: "error" });
      });
  }),
  phones: [],
  setPhones: action((state, payload) => {
    state.phones = payload;
  }),
  fetchPhones: thunk((actions) => {
    getAllPhones()
      .then((res) => {
        actions.setPhones(res);
      })
      .catch((err) => {
        console.error(err);
        toast("Error Fetching Phones", { type: "error" });
      });
  }),
  cards: [],
  setCards: action((state, payload) => {
    state.cards = payload;
  }),
  fetchCards: thunk((actions) => {
    getAllCards()
      .then((res) => {
        actions.setCards(res);
      })
      .catch((err) => {
        console.error(err);
        toast("Error Fetching Cards", { type: "error" });
      });
  }),
  myPurchaseRequests: [],
  myPendingPurchaseRequests: [],
  setMyPurchaseRequests: action((state, payload) => {
    state.myPurchaseRequests = payload;
  }),
  setMyPendingPurchaseRequests: action((state, payload) => {
    state.myPendingPurchaseRequests = payload;
  }),
  fetchPurchaseRequests: thunk((actions, payload) => {
    getAllMyPurchaseRequests(payload)
      .then((res) => {
        actions.setMyPurchaseRequests(res);
      })
      .catch((err) => {
        console.error(err);
        toast("Error Fetching Cards", { type: "error" });
      });
    getAllMyPendingPurchaseRequests(payload)
      .then((res) => {
        actions.setMyPendingPurchaseRequests(res);
      })
      .catch((err) => {
        console.error(err);
        toast("Error Fetching Cards", { type: "error" });
      });
  }),
};

export default SiteManagementStore;
