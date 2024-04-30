import React from "react";
import "./IndividualCard.css";
import { Phone } from "../../../../types/SiteManagement/Phone";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import {
  ArrowPathRoundedSquareIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { EditIcon } from "@chakra-ui/icons";
import { Button } from "@/components/ui/button";

interface IndividualCardProps {
  card: Phone;
  onClick: Function;
  reassignFunction: (phoneId: string) => void;
  readonly?: Boolean;
}

const IndividualCard: React.FC<IndividualCardProps> = ({
  card,
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
        <div className="flex font-normal text-[18px]">{card.name}</div>
        <div className="flex font-light text-[14px] font-mono">
          {card.number}
        </div>
        {card.assignedTo && (
          <div className="flex mt-[4px]">
            <Tag size={"sm"} variant="subtle" colorScheme="cyan">
              <TagLeftIcon boxSize="12px" as={UserIcon} />
              <TagLabel>{card.assignedTo?.name}</TagLabel>
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
              reassignFunction(card._id!);
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

export default IndividualCard;
