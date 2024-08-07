import React from "react";
import "./FunctionHallManagement.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store/hooks";
import Dock from "../../components/Dock";
import { loginUserWithToken } from "../../adapters/AuthAdapter";
import { PlatformEnum } from "../../enums/PlatformEnum";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { UserRoleEnum } from "@/enums/UserRoleEnum";

interface SiteManagementHomeProps {}

const FunctionHallManagement: React.FC<SiteManagementHomeProps> = () => {
  // Objects

  // Variables

  // State Variables - Hooks
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { dataFetched, user } = useStoreState((state) => state.userStore);
  const { setUser, setDataFetched } = useStoreActions(
    (actions) => actions.userStore,
  );
  const { fetchEnquiries, fetchFunctionHalls, fetchEnquiryTypes } =
    useStoreActions((actions) => actions.functionHallStore);

  const fetchUsers = useStoreActions(
    (actions) => actions.peopleStore.fetchUsers,
  );

  const { fetchTransactionPurposes } = useStoreActions(
    (actions) => actions.cashAccountStore,
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
          fetchTransactionPurposes();
        })
        .catch(() => {
          navigate("/login");
        });
    }
    if (dataFetched && !user) {
      navigate("/login");
    }
  }, [dataFetched, user, navigate, setUser, setDataFetched]);

  React.useEffect(() => {
    if (dataFetched) {
      if (
        [
          UserRoleEnum.SUPER_ADMIN,
          UserRoleEnum.ADMIN,
          UserRoleEnum.FH_MANAGER,
        ].includes(user!.role)
      ) {
        if (user!.role === UserRoleEnum.ADMIN) {
          if (!user!.platforms.includes(PlatformEnum.FUNCTION_HALL)) {
            navigate("/site-management");
          }
        }
      } else {
        navigate("/site-management");
      }
    }
  }, [dataFetched]);

  return (
    <div className="w-[100%] h-[100%] bg-background">
      {user && (
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:min-w-[250px] md:max-w-[250px] min-w-full">
            <Dock platform={PlatformEnum.FUNCTION_HALL} />
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

export default FunctionHallManagement;
