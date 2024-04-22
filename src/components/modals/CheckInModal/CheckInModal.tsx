import React from "react";
import "./CheckInModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import httpClient from "../../../config/AxiosInterceptors";
import { toast } from "react-toastify";
import { useStoreActions } from "../../../store/hooks";
import TabSelect from "../../TabSelect";
import FunctionHall from "../../../types/FunctionHall/FunctionHall";
import { InventoryType } from "../../../types/FunctionHall/Inventory";
import { GeneratorStatus } from "../../../types/FunctionHall/Generator";
import TailwindButton from "../../TailwindButton";
import moment from "moment/moment";
import { DeleteIcon } from "@chakra-ui/icons";
import Enquiry from "../../../types/FunctionHall/Enquiry";
import { RoomStatus } from "../../../types/FunctionHall/Room";
import ChakraSelect from "../../ChakraSelect";
import { PowerMeterStatus } from "../../../types/FunctionHall/PowerMeter";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface AcceptBookingModalProps {
  open: boolean;
  closeCallback: Function;
  enquiry: Enquiry;
  functionHall: FunctionHall;
  isUpdateStatus: boolean;
}

const CheckInModal: React.FC<AcceptBookingModalProps> = ({
  closeCallback,
  open,
  enquiry,
  functionHall,
  isUpdateStatus,
}) => {
  // Objects

  // Variables
  const { fetchEnquiries } = useStoreActions(
    (actions) => actions.functionHallStore,
  );

  // State Variables - Hooks
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [tabIndex, setTabIndex] = React.useState(0);
  const [inventorySearch, setInventorySearch] = React.useState<string>("");
  const [rooms, setRooms] = React.useState<RoomStatus[]>(
    enquiry.statStatus &&
      enquiry.statStatus.roomsAll &&
      enquiry.statStatus.roomsAll.length > 0
      ? enquiry.statStatus.roomsAll[enquiry.statStatus.roomsAll.length - 1]
      : [],
  );
  const [powerMeters, setPowerMeters] = React.useState<PowerMeterStatus[]>(
    enquiry.statStatus &&
      enquiry.statStatus.powerMetersAll &&
      enquiry.statStatus.powerMetersAll.length > 0
      ? enquiry.statStatus.powerMetersAll[
          enquiry.statStatus.powerMetersAll.length - 1
        ]
      : functionHall.powerMeters.map((pM) => ({
          name: pM.name,
          reading: 0,
          markedAt: new Date(),
        })),
  );
  const [securityGuards, setSecurityGuards] = React.useState(
    enquiry.statStatus &&
      enquiry.statStatus.securityGuards &&
      enquiry.statStatus.securityGuards.length > 0
      ? enquiry.statStatus.securityGuards[
          enquiry.statStatus.securityGuards.length - 1
        ]
      : 0,
  );
  const [generators, setGenerators] = React.useState<GeneratorStatus[]>(
    enquiry.statStatus &&
      enquiry.statStatus.generatorsAll &&
      enquiry.statStatus.generatorsAll.length > 0
      ? enquiry.statStatus.generatorsAll
      : functionHall.generators.map((generator) => ({
          name: generator.name,
          sessions: [],
        })),
  );
  const [newInventoryTypeList, setNewInventoryTypeList] = React.useState<
    InventoryType[]
  >(
    enquiry.statStatus &&
      enquiry.statStatus.inventoryAll &&
      enquiry.statStatus.inventoryAll.length > 0
      ? enquiry.statStatus.inventoryAll[
          enquiry.statStatus.inventoryAll.length - 1
        ]
      : functionHall.inventory,
  );
  // Functions
  const checkIn = () => {
    const data = {
      rooms: rooms,
      powerMeters: powerMeters.map((p) => ({
        name: p.name,
        reading: p.reading,
        markedAt: p.markedAt,
      })),
      securityGuards: securityGuards,
      inventory: newInventoryTypeList,
      generators: generators,
    };
    //console.log(data);
    httpClient
      .post(`/function-hall/enquiry/update-status/${enquiry._id}`, data)
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
      title={isUpdateStatus ? "Update Status" : "Check In"}
      action={() => {
        checkIn();
      }}
      actionText={"Submit"}
    >
      {!isDesktop ? (
        <ChakraSelect
          name=""
          placeholder={"select service"}
          value={tabIndex.toString()}
          values={[
            {
              name: "Rooms",
              value: "0",
            },
            {
              name: "Meter Readings",
              value: "1",
            },
            {
              name: "Security Guards",
              value: "2",
            },
            {
              name: "Inventory",
              value: "3",
            },
            {
              name: "Generators",
              value: "4",
            },
          ]}
          onValueChange={(value) => {
            setTabIndex(parseInt(value));
          }}
        />
      ) : (
        <TabSelect
          options={[
            {
              text: "Rooms",
              onClick: () => {
                setTabIndex(0);
              },
            },
            {
              text: "Meter Readings",
              onClick: () => {
                setTabIndex(1);
              },
            },
            {
              text: "Security Guards",
              onClick: () => {
                setTabIndex(2);
              },
            },
            {
              text: "Inventory",
              onClick: () => {
                setTabIndex(3);
              },
            },
            {
              text: "Generators",
              onClick: () => {
                setTabIndex(4);
              },
            },
          ]}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        />
      )}
      {tabIndex === 0 && (
        <div className="flex p-[8px] flex-col">
          <div className="flex justify-between items-center font-light text-[12px] opacity-70">
            <div>Rooms</div>
            <TailwindButton
              text={"Add Room +"}
              onClick={() => {
                setRooms([
                  ...rooms,
                  {
                    name: "",
                    assignedAt: new Date(),
                  },
                ]);
              }}
            />
          </div>
          {rooms.map((room, index) => {
            return (
              <div>
                <ChakraSelect
                  name={"Room"}
                  value={room.name}
                  values={functionHall.rooms.map((r) => ({
                    name: r.name,
                    value: r.name,
                  }))}
                  onValueChange={(value) => {
                    setRooms(
                      rooms.map((r, i) =>
                        i === index ? { ...r, name: value } : r,
                      ),
                    );
                  }}
                />
                <LabelledInput
                  name={"Assigned Date"}
                  value={moment(room.assignedAt).format("yyyy-MM-DDTHH:mm")}
                  setValue={(_val: string) => {
                    setRooms(
                      rooms.map((r, i) =>
                        i === index ? { ...r, assignedAt: new Date(_val) } : r,
                      ),
                    );
                  }}
                  inputProps={{ type: "datetime-local" }}
                />
              </div>
            );
          })}
        </div>
      )}
      {tabIndex === 1 && (
        <div className="flex p-[8px] flex-col">
          {powerMeters.map((pM, index) => {
            return (
              <div key={pM.name} className="mt-[4px]">
                <LabelledInput
                  name={pM.name + " Reading"}
                  value={pM.reading}
                  setValue={(_val: number) => {
                    setPowerMeters(
                      powerMeters.map((p, i) =>
                        i === index ? { ...p, reading: _val } : p,
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
          <LabelledInput
            name={"search inventory"}
            value={inventorySearch}
            setValue={(_val: string) => {
              setInventorySearch(_val);
            }}
          />
          {newInventoryTypeList
            .filter(
              (it) =>
                inventorySearch === "" ||
                it.name.toLowerCase().includes(inventorySearch.toLowerCase()),
            )
            .map((type, index) => {
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
      {tabIndex === 4 && (
        <>
          {generators.map((generator, generatorIndex) => {
            return (
              <div
                key={generator.name}
                className="flex flex-col mt-[4px] border-t-2"
              >
                <div className="flex text-[16px] justify-between items-center text-white mt-[10px] pt-[10px]">
                  <h3>{generator.name}</h3>
                  <TailwindButton
                    text={"Add Session +"}
                    onClick={() => {
                      setGenerators(
                        generators.map((g, i) =>
                          i === generatorIndex
                            ? {
                                ...g,
                                sessions: [...g.sessions, { from: new Date() }],
                              }
                            : g,
                        ),
                      );
                    }}
                  />
                </div>
                {generator.sessions.map((session, sessionIndex) => {
                  return (
                    <div className="flex w-full flex-col p-[8px]">
                      <div className="flex justify-between">
                        <div
                          onClick={() => {
                            setGenerators(
                              generators.map((g, i) =>
                                i === generatorIndex
                                  ? {
                                      ...g,
                                      sessions: g.sessions.filter(
                                        (s, j) => j !== sessionIndex,
                                      ),
                                    }
                                  : g,
                              ),
                            );
                          }}
                          className="flex p-[8px] w-[30px] h-[30px] text-accent rounded-[4px] bg-low-bg"
                        >
                          <DeleteIcon width={"14px"} />
                        </div>
                        <h3>{"Session " + (sessionIndex + 1)}</h3>
                      </div>
                      <LabelledInput
                        name="from"
                        value={moment(session.from).format("yyyy-MM-DDTHH:mm")}
                        setValue={(_val: string) => {
                          setGenerators(
                            generators.map((g, i) =>
                              i === generatorIndex
                                ? {
                                    ...g,
                                    sessions: g.sessions.map((s, j) =>
                                      j === sessionIndex
                                        ? { ...s, from: new Date(_val) }
                                        : s,
                                    ),
                                  }
                                : g,
                            ),
                          );
                        }}
                        inputProps={{ type: "datetime-local" }}
                      />
                      {!!session.to ? (
                        <LabelledInput
                          name="to"
                          value={moment(session.to).format("yyyy-MM-DDTHH:mm")}
                          setValue={(_val: string) => {
                            setGenerators(
                              generators.map((g, i) =>
                                i === generatorIndex
                                  ? {
                                      ...g,
                                      sessions: g.sessions.map((s, j) =>
                                        j === sessionIndex
                                          ? { ...s, to: new Date(_val) }
                                          : s,
                                      ),
                                    }
                                  : g,
                              ),
                            );
                          }}
                          inputProps={{ type: "datetime-local" }}
                        />
                      ) : (
                        <div>
                          <TailwindButton
                            text={"Add To +"}
                            onClick={() => {
                              setGenerators(
                                generators.map((g, i) =>
                                  i === generatorIndex
                                    ? {
                                        ...g,
                                        sessions: g.sessions.map((s, j) =>
                                          j === sessionIndex
                                            ? { ...s, to: new Date() }
                                            : s,
                                        ),
                                      }
                                    : g,
                                ),
                              );
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
    </ChakraModal>
  );
};

export default CheckInModal;
