import React from "react";
import "./IndividualPhone.css";
import { Phone } from "../../../../types/SiteManagement/Phone";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import {
  ArrowPathRoundedSquareIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { EditIcon } from "@chakra-ui/icons";

interface IndividualPhoneProps {
  phone: Phone;
  onClick: Function;
  reassignFunction: (phoneId: string) => void;
}

const IndividualPhone: React.FC<IndividualPhoneProps> = ({
  phone,
  onClick,
  reassignFunction,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div className="flex w-full p-[16px] bg-low-bg rounded-[12px] mb-[16px]">
      <div className="flex flex-1 flex-col">
        <div className="flex font-normal text-[18px]">{phone.name}</div>
        <div className="flex font-light text-[14px] font-mono">
          {phone.number}
        </div>
        {phone.assignedTo && (
          <div className="flex mt-[4px]">
            <Tag size={"sm"} variant="subtle" colorScheme="cyan">
              <TagLeftIcon boxSize="12px" as={UserIcon} />
              <TagLabel>{phone.assignedTo?.name}</TagLabel>
            </Tag>
          </div>
        )}
      </div>
      <div className="flex min-h-[72px] justify-evenly flex-col items-end">
        <div
          onClick={() => {
            onClick();
          }}
          className="flex p-[8px] w-[30px] h-[30px] text-accent rounded-[4px] bg-main-bg"
        >
          <EditIcon width={"14px"} />
        </div>
        <div
          onClick={() => {
            reassignFunction(phone._id!);
          }}
          className="flex p-[8px] w-[30px] h-[30px] text-accent rounded-[4px] bg-main-bg"
        >
          <ArrowPathRoundedSquareIcon width={"14px"} />
        </div>
      </div>
    </div>
  );
};

export default IndividualPhone;
