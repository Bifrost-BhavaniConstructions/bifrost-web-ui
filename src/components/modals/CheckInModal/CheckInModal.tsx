import React from "react";
import "./CheckInModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import httpClient from "../../../config/AxiosInterceptors";
import { toast } from "react-toastify";
import { useStoreActions } from "../../../store/hooks";
import TabSelect from "../../TabSelect";
import { MultiSelect } from "chakra-multiselect";
import FunctionHall from "../../../types/FunctionHall/FunctionHall";
import { InventoryType } from "../../../types/FunctionHall/Inventory";

interface AcceptBookingModalProps {
  open: boolean;
  closeCallback: Function;
  enquiryId: string;
  functionHall: FunctionHall;
}

const CheckInModal: React.FC<AcceptBookingModalProps> = ({
  closeCallback,
  open,
  enquiryId,
  functionHall,
}) => {
  // Objects

  // Variables
  const { fetchEnquiries } = useStoreActions(
    (actions) => actions.functionHallStore,
  );

  // State Variables - Hooks
  const [tabIndex, setTabIndex] = React.useState(0);
  const [rooms, setRooms] = React.useState<{ label: string; value: string }[]>(
    [],
  );
  const [powerMeters, setPowerMeters] = React.useState(
    functionHall.powerMeters.map((pM) => ({ name: pM.name, value: 0 })),
  );
  const [securityGuards, setSecurityGuards] = React.useState(0);
  const [newInventoryTypeList, setNewInventoryTypeList] = React.useState<
    InventoryType[]
  >(functionHall.inventory);
  // Functions
  const checkIn = () => {
    const data = {
      rooms: rooms.map((r) => ({
        name: r.value,
        assignedAt: new Date().toISOString(),
      })),
      powerMeters: powerMeters.map((p) => ({
        name: p.name,
        reading: p.value,
      })),
      securityGuards: securityGuards,
      inventory: newInventoryTypeList,
    };
    console.log(data);
    httpClient
      .post(`/function-hall/enquiry/check-in/${enquiryId}`, data)
      .then(() => {
        fetchEnquiries();
        toast(`Checked In`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        closeCallback();
      });
  };

  // Hook Functions

  return (
    <ChakraModal
      closeCallback={() => {
        closeCallback();
      }}
      open={open}
      title={"Check In"}
      action={() => {
        checkIn();
      }}
      actionText={"Submit"}
    >
      <TabSelect
        options={[
          {
            text: "Rooms",
          },
          {
            text: "Meter Readings",
          },
          {
            text: "Security Guards",
          },
          {
            text: "Inventory",
          },
        ]}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
      />
      {tabIndex === 0 && (
        <div className="flex p-[8px] flex-col">
          <div className="font-light text-[12px] opacity-70">Select Rooms</div>
          <MultiSelect
            value={rooms}
            options={functionHall.rooms.map((r) => ({
              label: r.name,
              value: r.name,
            }))}
            onChange={(val: any) => {
              setRooms(val);
            }}
          />
        </div>
      )}
      {tabIndex === 1 && (
        <div className="flex p-[8px] flex-col">
          {powerMeters.map((pM, index) => {
            return (
              <div key={pM.name} className="mt-[4px]">
                <LabelledInput
                  name={pM.name + " Reading"}
                  value={pM.value}
                  setValue={(_val: number) => {
                    setPowerMeters(
                      powerMeters.map((p, i) =>
                        i === index ? { ...p, value: _val } : p,
                      ),
                    );
                  }}
                  inputProps={{ type: "number" }}
                />
              </div>
            );
          })}
        </div>
      )}
      {tabIndex === 2 && (
        <div className="flex p-[8px] flex-col">
          <LabelledInput
            name={"Number of Security Guards"}
            value={securityGuards}
            setValue={(_val: number) => {
              setSecurityGuards(_val);
            }}
            inputProps={{ type: "number" }}
          />
        </div>
      )}
      {tabIndex === 3 && (
        <>
          {newInventoryTypeList.map((type, index) => {
            return (
              <div
                key={type.name}
                className="flex flex-col mt-[4px] border-t-2"
              >
                <LabelledInput
                  name={"name"}
                  value={type.name}
                  inputProps={{ isDisabled: true }}
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
        </>
      )}
    </ChakraModal>
  );
};

export default CheckInModal;
