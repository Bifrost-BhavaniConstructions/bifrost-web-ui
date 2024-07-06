import { useStoreState } from "@/store/hooks";
import { UserRoleEnum } from "@/enums/UserRoleEnum";

export const useUserFunctionHalls = () => {
  const { functionHalls } = useStoreState((state) => state.functionHallStore);
  const { user } = useStoreState((state) => state.userStore);

  if (user!.role === UserRoleEnum.FH_MANAGER) {
    return functionHalls.filter((fh) =>
      user!.managerData!.functionHalls.includes(fh._id!),
    );
  } else {
    return functionHalls;
  }
};
