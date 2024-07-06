import { ReactNode } from "react";
import { UserRoleEnum } from "@/enums/UserRoleEnum";
import { useStoreState } from "@/store/hooks";

const withProtection: (
  component: ReactNode,
  roles: UserRoleEnum[],
) => ReactNode = (component, roles) => {
  const user = useStoreState((state) => state.userStore.user)!;

  return roles.includes(user.role) ? component : <></>;
};

export default withProtection;
