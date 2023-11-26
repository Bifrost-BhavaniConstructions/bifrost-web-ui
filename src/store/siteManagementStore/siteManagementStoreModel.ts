import { Action, Thunk } from "easy-peasy";
import { Site } from "../../types/SiteManagement/Site";
import { Vehicle } from "../../types/SiteManagement/Vehicle";
import { Phone } from "../../types/SiteManagement/Phone";
import { Card } from "../../types/SiteManagement/Card";
import { PurchaseRequest } from "../../types/SiteManagement/PurchaseRequest";

export interface SiteManagementStoreModel {
  sites: Site[];
  setSites: Action<SiteManagementStoreModel, Site[]>;
  fetchSites: Thunk<SiteManagementStoreModel, void>;
  vehicles: Vehicle[];
  setVehicles: Action<SiteManagementStoreModel, Vehicle[]>;
  fetchVehicles: Thunk<SiteManagementStoreModel, void>;
  phones: Phone[];
  setPhones: Action<SiteManagementStoreModel, Phone[]>;
  fetchPhones: Thunk<SiteManagementStoreModel, void>;
  cards: Card[];
  setCards: Action<SiteManagementStoreModel, Card[]>;
  fetchCards: Thunk<SiteManagementStoreModel, void>;
  myPurchaseRequests: PurchaseRequest[];
  myPendingPurchaseRequests: PurchaseRequest[];
  setMyPurchaseRequests: Action<SiteManagementStoreModel, PurchaseRequest[]>;
  setMyPendingPurchaseRequests: Action<
    SiteManagementStoreModel,
    PurchaseRequest[]
  >;
  fetchPurchaseRequests: Thunk<SiteManagementStoreModel, string>;
}
