import React from "react";
import "./SiteManagement.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store/hooks";
import SiteManagementNavBar from "../../components/Dock";
import { loginUserWithToken } from "../../adapters/AuthAdapter";
import { PlatformEnum } from "../../enums/PlatformEnum";

interface SiteManagementHomeProps {}

const SiteManagement: React.FC<SiteManagementHomeProps> = () => {
  // Objects

  // Variables

  // State Variables - Hooks
  const { dataFetched, user } = useStoreState((state) => state.userStore);
  const { setUser, setDataFetched } = useStoreActions(
    (actions) => actions.userStore,
  );
  const fetchUsers = useStoreActions(
    (actions) => actions.peopleStore.fetchUsers,
  );
  const { fetchTransactionPurposes } = useStoreActions(
    (actions) => actions.cashAccountStore,
  );
  const { fetchFunctionHalls, fetchEnquiryTypes } = useStoreActions(
    (actions) => actions.functionHallStore,
  );
  const {
    fetchSites,
    fetchVehicles,
    fetchPhones,
    fetchCards,
    fetchPurchaseRequests,
  } = useStoreActions((actions) => actions.siteManagementStore);
  const navigate = useNavigate();

  // Functions

  // Hook Functions

  React.useEffect(() => {
    if (!dataFetched) {
      loginUserWithToken()
        .then((user) => {
          setUser(user);
          setDataFetched(true);
          fetchUsers();
          fetchFunctionHalls();
          fetchEnquiryTypes();
          fetchTransactionPurposes();
          fetchSites();
          fetchVehicles();
          fetchPhones();
          fetchCards();
          fetchPurchaseRequests(user._id!);
        })
        .catch(() => {});
    }
    if (dataFetched && !user) {
      navigate("/login");
    }
  }, [dataFetched, user, navigate, setUser, setDataFetched]);

  return (
    <div className="w-[100%] h-[100%] bg-main-bg">
      {user && (
        <>
          <div className="p-2">
            <SiteManagementNavBar platform={PlatformEnum.SITE} />
          </div>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default SiteManagement;
