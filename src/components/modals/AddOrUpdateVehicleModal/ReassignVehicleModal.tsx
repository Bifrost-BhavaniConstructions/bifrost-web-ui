import React from "react";
import "./AddOrUpdateVehicleModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import { Vehicle } from "../../../types/SiteManagement/Vehicle";
import moment from "moment/moment";
import { Card } from "../../../types/SiteManagement/Card";
import { Phone } from "../../../types/SiteManagement/Phone";
import { UserRoleEnum } from "../../../enums/UserRoleEnum";
import ChakraSelect from "../../ChakraSelect";
import { useStoreState } from "../../../store/hooks";
import { Button } from "@chakra-ui/react";
import { VehicleAssignment } from "../../../types/SiteManagement/SubTypes/VehicleAssignment";

interface ReassignVehicleModalProps {
  open: boolean;
  closeCallback: Function;
  cta: (asset: string) => void;
  currentlyAssigned?: string;
  roleToFilter?: UserRoleEnum;
  assignmentHistory: VehicleAssignment[];
}

const ReassignVehicleModal: React.FC<ReassignVehicleModalProps> = ({
  closeCallback,
  open,
  cta,
  currentlyAssigned,
  roleToFilter,
  assignmentHistory,
}) => {
  // Objects

  // Variables
  const [user, setUser] = React.useState<string>();
  const { users } = useStoreState((state) => state.peopleStore);

  // Functions

  // Hook Functions
  React.useEffect(() => {
    if (currentlyAssigned) {
      setUser(currentlyAssigned);
    }
  }, [currentlyAssigned]);

  return (
    <ChakraModal
      closeCallback={() => {
        setUser(undefined);
        closeCallback();
      }}
      open={open}
      title={"Vehicle Assignment"}
      action={() => {}}
    >
      <ChakraSelect
        name="assign to"
        value={user!}
        values={users
          .filter((user) => (roleToFilter ? user.role === roleToFilter : true))
          .map((fH) => ({
            name: fH.name,
            value: fH._id!,
          }))}
        onValueChange={(value) => {
          setUser(value);
        }}
      />
      <div className="flex justify-end mt-[12px]">
        <Button
          variant="solid"
          bg="brand.low-bg"
          className="font-normal text-[12px]"
          onClick={() => {
            cta(user!);
          }}
          isDisabled={user === undefined}
        >
          Submit
        </Button>
      </div>
      <h3 className="flex text-[16px] justify-end text-white border-t-2 border-t-indigo-300 mt-[10px] pt-[10px]">
        Assignment History
      </h3>
      {assignmentHistory.map((aH) => {
        return (
          <div key={aH.createdAt}>
            <h2 className="flex text-[12px] justify-between text-white border-t-2 border-opacity-20 mt-[10px] pt-[10px]">
              <div className="flex">{aH.assignedTo.name}</div>
              <div className="flex">
                {new Date(aH.createdAt).toLocaleDateString("en-US")}
              </div>
            </h2>
          </div>
        );
      })}
    </ChakraModal>
  );
};

export default ReassignVehicleModal;
