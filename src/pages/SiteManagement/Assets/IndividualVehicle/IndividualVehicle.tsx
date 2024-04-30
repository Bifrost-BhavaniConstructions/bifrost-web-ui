import React from "react";
import "./IndividualVehicle.css";
import { Vehicle } from "../../../../types/SiteManagement/Vehicle";
import { EditIcon } from "@chakra-ui/icons";
import {
  ArrowPathRoundedSquareIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

interface IndividualSiteProps {
  vehicle: Vehicle;
  onClick: Function;
  reassignFunction: (vehicleId: string) => void;
  readonly?: Boolean;
}

const IndividualVehicle: React.FC<IndividualSiteProps> = ({
  vehicle,
  onClick,
  reassignFunction,
  readonly,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div className="flex w-full p-[16px] rounded-xl border bg-card text-card-foreground shadow mb-[16px]">
      <div className="flex flex-1 flex-col">
        <div className="flex font-normal text-[18px]">{vehicle.name}</div>
        <div className="flex font-light text-[14px] font-mono">
          {vehicle.number}
        </div>
        {vehicle.assignedTo && (
          <div className="flex mt-[4px]">
            <Tag size={"sm"} variant="subtle" colorScheme="cyan">
              <TagLeftIcon boxSize="12px" as={UserIcon} />
              <TagLabel>{vehicle.assignedTo?.name}</TagLabel>
            </Tag>
          </div>
        )}
      </div>
      {!readonly && (
        <div className="flex min-h-[72px] justify-evenly flex-col items-end">
          <Button
            onClick={() => {
              onClick();
            }}
            className="flex p-[8px] w-[30px] h-[30px] text-accent rounded-[4px] bg-card-foreground"
          >
            <EditIcon width={"14px"} />
          </Button>
          <Button
            onClick={() => {
              reassignFunction(vehicle._id!);
            }}
            className="flex p-[8px] w-[30px] h-[30px] text-accent rounded-[4px] bg-card-foreground"
          >
            <ArrowPathRoundedSquareIcon width={"14px"} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default IndividualVehicle;
