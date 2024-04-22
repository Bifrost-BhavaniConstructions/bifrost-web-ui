import React from "react";
import "./IndividualFunctionHall.css";
import FunctionHall from "../../../../types/FunctionHall/FunctionHall";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Avvvatars from "avvvatars-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SewingPinIcon } from "@radix-ui/react-icons";
interface IndividualFunctionHallProps {
  functionHall: FunctionHall;
  onClick: Function;
  isManage?: boolean;
}

const IndividualFunctionHall: React.FC<IndividualFunctionHallProps> = ({
  functionHall,
  onClick,
  isManage = false,
}) => {
  // Objects

  // Variables
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <Card
      onClick={() => {
        onClick();
      }}
      className={cn(
        "flex cursor-pointer justify-center items-center",
        isManage ? "w-auto relative" : "w-full md:w-[calc(50%-16px)]",
      )}
    >
      <CardHeader
        className={cn(
          "justify-center items-center",
          isManage ? "w-[1/2]" : "w-full",
        )}
      >
        <CardHeader className={cn(isManage ? "pt-0" : "")}>
          <Avvvatars value={functionHall.name} />
        </CardHeader>
        <CardTitle>{functionHall.name}</CardTitle>
        <CardDescription className="flex flex-row">
          <SewingPinIcon className="mt-[2px]" />
          {functionHall.address}
        </CardDescription>
        {isManage && !isDesktop && (
          <>
            <CardDescription>
              <Badge variant="secondary" className={"mr-[4px]"}>
                {functionHall.powerMeters.length + " Meters"}
              </Badge>
              <Badge variant="secondary">
                {functionHall.generators.length + " Generators"}
              </Badge>
            </CardDescription>
            <CardDescription>
              <Badge variant="secondary" className={"mr-[4px]"}>
                {functionHall.inventory.length + " Inventory Items"}
              </Badge>
              <Badge variant="secondary">
                {functionHall.rooms.length + " Rooms"}
              </Badge>
            </CardDescription>
          </>
        )}
      </CardHeader>
      {isManage && isDesktop && (
        <>
          <CardHeader
            className={cn(
              "justify-center items-end absolute right-0",
              "w-[1/2]",
            )}
          >
            <CardDescription>
              <Badge variant="secondary">
                {functionHall.powerMeters.length + " Meters"}
              </Badge>
            </CardDescription>
            <CardDescription>
              <Badge variant="secondary">
                {functionHall.generators.length + " Generators"}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardHeader
            className={cn(
              "justify-center items-start absolute left-0",
              "w-[1/2]",
            )}
          >
            <CardDescription>
              <Badge variant="secondary">
                {functionHall.inventory.length + " Inventory Items"}
              </Badge>
            </CardDescription>
            <CardDescription>
              <Badge variant="secondary">
                {functionHall.rooms.length + " Rooms"}
              </Badge>
            </CardDescription>
          </CardHeader>
        </>
      )}
    </Card>
  );
};

export default IndividualFunctionHall;
