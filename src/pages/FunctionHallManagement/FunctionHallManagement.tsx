import React from "react";
import "./FunctionHallManagement.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store/hooks";
import SiteManagementNavBar from "../../components/Dock";
import { loginUserWithToken } from "../../adapters/AuthAdapter";
import { PlatformEnum } from "../../enums/PlatformEnum";

interface SiteManagementHomeProps {}

const FunctionHallManagement: React.FC<SiteManagementHomeProps> = () => {
  // Objects

  // Variables

  // State Variables - Hooks
  const { dataFetched, user } = useStoreState((state) => state.userStore);
  const { setUser, setDataFetched } = useStoreActions(
    (actions) => actions.userStore,
  );
  const { fetchEnquiries, fetchFunctionHalls, fetchEnquiryTypes } =
    useStoreActions((actions) => actions.functionHallStore);

  const fetchUsers = useStoreActions(
    (actions) => actions.peopleStore.fetchUsers,
  );
  const navigate = useNavigate();

  // Functions

  // Hook Functions

  React.useEffect(() => {
    if (!dataFetched) {
      loginUserWithToken()
        .then((user) => {
          setUser(user);
          setDataFetched(true);
          fetchEnquiries();
          fetchFunctionHalls();
          fetchUsers();
          fetchEnquiryTypes();
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
            <SiteManagementNavBar platform={PlatformEnum.FUNCTION_HALL} />
          </div>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default FunctionHallManagement;
