import React from "react";
import "./UpdateInventoryModal.css";
import ChakraModal from "../ChakraModal";
import {
  Inventory,
  InventoryType,
} from "../../../types/FunctionHall/Inventory";
import TailwindButton from "../../TailwindButton";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import httpClient from "../../../config/AxiosInterceptors";
import { toast } from "react-toastify";
import { useStoreActions } from "../../../store/hooks";

interface UpdateInventoryProps {
  closeCallback: Function;
  open: boolean;
  inventoryList: Inventory[] | undefined;
  enquiryId: string;
}

const UpdateInventoryModal: React.FC<UpdateInventoryProps> = ({
  open,
  closeCallback,
  inventoryList,
  enquiryId,
}) => {
  // Objects
  const { fetchEnquiries } = useStoreActions(
    (actions) => actions.functionHallStore,
  );

  // Variables

  // State Variables - Hooks
  const [newInventoryTypeList, setNewInventoryTypeList] = React.useState<
    InventoryType[]
  >([]);

  // Functions
  const updateInventory = () => {
    httpClient
      .post(
        `/function-hall/enquiry/inventory/${enquiryId}`,
        newInventoryTypeList,
      )
      .then(() => {
        fetchEnquiries();
        toast(`Inventory updated`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        closeCallback();
      });
  };

  // Hook Functions
  React.useEffect(() => {
    //console.log(inventoryList);
    if (inventoryList && inventoryList.length > 0)
      setNewInventoryTypeList(
        inventoryList.sort((a, b) =>
          new Date(a.createdAt!) > new Date(b.createdAt!) ? -1 : 1,
        )[0].items,
      );
  }, [inventoryList]);

  return (
    <ChakraModal
      closeCallback={() => {
        setNewInventoryTypeList([]);
        closeCallback();
      }}
      open={open}
      title={"Update Inventory"}
      action={() => {
        updateInventory();
      }}
      actionText={"Submit"}
    >
      {inventoryList && (
        <>
          <div className="flex flex-col">
            {inventoryList.length === 0 && (
              <div className="flex justify-end">
                <TailwindButton
                  text={"Add Item +"}
                  onClick={() => {
                    setNewInventoryTypeList([
                      ...newInventoryTypeList,
                      { name: "", count: 0, charge: 0 },
                    ]);
                  }}
                />
              </div>
            )}
            {newInventoryTypeList.map((type, index) => {
              return (
                <div className="flex flex-col mt-[4px] border-t-2">
                  <LabelledInput
                    name={"name"}
                    value={type.name}
                    setValue={(_val: string) =>
                      setNewInventoryTypeList(
                        newInventoryTypeList.map((iT, i) =>
                          i === index ? { ...iT, name: _val } : iT,
                        ),
                      )
                    }
                  />
                  <div className="flex">
                    <div className="flex  px-[2px]">
                      <LabelledInput
                        name={"count"}
                        value={type.count}
                        setValue={(_val: number) =>
                          setNewInventoryTypeList(
                            newInventoryTypeList.map((iT, i) =>
                              i === index ? { ...iT, count: _val } : iT,
                            ),
                          )
                        }
                        inputProps={{ type: "number" }}
                      />
                    </div>
                  </div>
                  <div className="flex  px-[2px]">
                    <LabelledInput
                      name={"damage charges"}
                      value={type.charge}
                      setValue={(_val: number) =>
                        setNewInventoryTypeList(
                          newInventoryTypeList.map((iT, i) =>
                            i === index ? { ...iT, charge: _val } : iT,
                          ),
                        )
                      }
                      inputProps={{ type: "number" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </ChakraModal>
  );
};

export default UpdateInventoryModal;
