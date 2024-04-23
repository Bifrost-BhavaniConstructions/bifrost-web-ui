import React from "react";
import "./SiteManagement.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store/hooks";
import SiteManagementNavBar from "../../components/Dock";
import { loginUserWithToken } from "../../adapters/AuthAdapter";
import { PlatformEnum } from "../../enums/PlatformEnum";
import Dock from "@/components/Dock";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface SiteManagementHomeProps {}

const SiteManagement: React.FC<SiteManagementHomeProps> = () => {
  // Objects

  // Variables

  // State Variables - Hooks
  const isDesktop = useMediaQuery("(min-width: 768px)");
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
        .catch(() => {
          navigate("/login");
        });
    }
    if (dataFetched && !user) {
      navigate("/login");
    }
  }, [dataFetched, user, navigate, setUser, setDataFetched]);

  return (
    <div className="w-[100%] h-[100%] bg-background">
      {user && (
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:min-w-[250px] md:max-w-[250px] min-w-full">
            <Dock platform={PlatformEnum.SITE} />
          </div>
          <div
            className={cn(
              "flex flex-1",
              isDesktop ? "" : "min-w-full max-h-[calc(100%-56px)]",
            )}
          >
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteManagement;
