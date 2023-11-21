import React from "react";
import "./IndividualTransaction.css";
import { Transaction } from "../../../../types/CashAccount/Transaction";
import { useStoreState } from "../../../../store/hooks";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import {
  BuildingLibraryIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import { PlatformEnum } from "../../../../enums/PlatformEnum";
import ChakraModal from "../../../../components/modals/ChakraModal";
import { TransactionWithFunctionHallName } from "../AllTransactions/AllTransactions";

interface IndividualTransactionProps {
  transaction: TransactionWithFunctionHallName;
}

const IndividualTransaction: React.FC<IndividualTransactionProps> = ({
  transaction,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks
  const { user } = useStoreState((state) => state.userStore);
  const [remark, setRemark] = React.useState<string | undefined>();
  // Functions

  // Hook Functions

  return (
    <div className="flex p-[10px] flex-col">
      <div className="flex w-full flex-col bg-low-bg rounded-[4px]">
        <div className="flex p-[12px] pb-[4px]">
          <div className="flex flex-1 flex-col">
            <div className="font-light text-[12px] opacity-70">from</div>
            <div className="font-medium text-[14px]">
              {transaction.from ? transaction.from.user?.name : "N/A"}
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center ">
            <div className="font-medium text-[14px] text-accent">
              ₹{transaction.amount ? transaction.amount : "0"}
            </div>
            <div className="font-medium text-[12px] opacity-50">
              bal ₹
              {transaction.from && transaction.from.user._id === user?._id
                ? transaction.fromBalance
                : transaction.to && transaction.to.user._id === user?._id
                ? transaction.toBalance
                : 0}
            </div>
          </div>
          <div className="flex flex-1 flex-col items-end">
            <div className="font-light text-[12px] opacity-70">to</div>
            <div className="font-medium text-[14px]">
              {transaction.to
                ? transaction.to.user?.name
                : transaction.toMisc
                ? transaction.toMisc
                : "N/A"}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between px-[12px] pb-[12px]">
          <div className="flex flex-col">
            <div className="text-[12px] font-light">
              {new Date(transaction.createdAt).toLocaleString("en-US")}
            </div>
            <div className="text-[12px] font-light">
              <div className="flex mt-[4px]">
                <Tag size={"sm"} variant="subtle" colorScheme="cyan">
                  <TagLeftIcon boxSize="12px" as={InformationCircleIcon} />
                  <TagLabel>
                    {transaction.transactionType
                      .toString()
                      .split("_")
                      .join(" ")
                      .toLowerCase()}
                  </TagLabel>
                </Tag>
              </div>
              <div className="flex mt-[4px]">
                <Tag size={"sm"} variant="subtle" colorScheme="cyan">
                  <TagLeftIcon boxSize="12px" as={BuildingLibraryIcon} />
                  <TagLabel>
                    {transaction.platform === PlatformEnum.SITE
                      ? "Site Management"
                      : "Function Hall Management"}
                  </TagLabel>
                </Tag>
              </div>
              <div className="flex mt-[4px]">
                <Tag size={"sm"} variant="subtle" colorScheme="cyan">
                  <TagLeftIcon boxSize="12px" as={BuildingLibraryIcon} />
                  <TagLabel>
                    {transaction.site
                      ? transaction.site.name
                      : transaction.functionHallName}
                  </TagLabel>
                </Tag>
              </div>
              {transaction.transactionPurpose && (
                <div className="flex mt-[4px]">
                  <Tag size={"sm"} variant="subtle" colorScheme="cyan">
                    <TagLeftIcon boxSize="12px" as={BuildingLibraryIcon} />
                    <TagLabel>{transaction.transactionPurpose.name}</TagLabel>
                  </Tag>
                </div>
              )}
            </div>
          </div>
          <div className="flex text-[12px] font-light items-end">
            <InfoOutlineIcon
              fontSize={"16px"}
              onClick={() => {
                setRemark(transaction.remarks);
              }}
            />
          </div>
        </div>
      </div>
      {!!remark && (
        <ChakraModal
          closeCallback={() => {
            setRemark(undefined);
          }}
          open={!!remark}
          title={"remarks"}
          action={() => {}}
          minH={200}
        >
          {remark}
        </ChakraModal>
      )}
    </div>
  );
};

export default IndividualTransaction;
