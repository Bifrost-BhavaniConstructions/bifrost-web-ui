import React from "react";
import "./AddOrUpdateFunctionHallModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import FunctionHall from "../../../types/FunctionHall/FunctionHall";
import TailwindButton from "../../TailwindButton";
import { InventoryType } from "../../../types/FunctionHall/Inventory";
import { DeleteIcon } from "@chakra-ui/icons";
import { PowerMeter } from "../../../types/FunctionHall/PowerMeter";
import { Generator } from "../../../types/FunctionHall/Generator";
import { Room } from "../../../types/FunctionHall/Room";

interface AddOrUpdateFunctionHallModalProps {
  open: boolean;
  closeCallback: Function;
  cta: (functionHall: FunctionHall) => void;
  editFunctionHall?: FunctionHall;
}

const AddOrUpdateFunctionHallModal: React.FC<
  AddOrUpdateFunctionHallModalProps
> = ({ closeCallback, open, cta, editFunctionHall }) => {
  // Objects
  const emptyFunctionHall: FunctionHall = {
    name: "",
    address: "",
    inventory: [],
    powerMeters: [],
    generators: [],
    rooms: [],
  };

  // Variables
  const [functionHall, setFunctionHall] = React.useState(emptyFunctionHall);
  // Functions
  const setNewInventoryTypeList = (list: InventoryType[]) => {
    setFunctionHall({ ...functionHall, inventory: list });
  };
  const setNewPowerMeterList = (list: PowerMeter[]) => {
    setFunctionHall({ ...functionHall, powerMeters: list });
  };
  const setNewGeneratorList = (list: Generator[]) => {
    setFunctionHall({ ...functionHall, generators: list });
  };
  const setNewRoomList = (list: Room[]) => {
    setFunctionHall({ ...functionHall, rooms: list });
  };

  const validateFunctionHall: () => boolean = () => {
    return (
      functionHall.name !== "" &&
      functionHall.address !== "" &&
      functionHall.rooms.every((r) => r.name !== "") &&
      functionHall.inventory.every(
        (r) => r.name !== "" && r.charge > 0 && r.count > 0,
      ) &&
      functionHall.generators.every((r) => r.name !== "") &&
      functionHall.powerMeters.every((r) => r.name !== "")
    );
  };

  // Hook Functions
  React.useEffect(() => {
    if (editFunctionHall) {
      setFunctionHall(editFunctionHall);
    }
  }, [editFunctionHall]);

  return (
    <ChakraModal
      closeCallback={() => {
        setFunctionHall(emptyFunctionHall);
        closeCallback();
      }}
      open={open}
      title={"Add Function Hall"}
      action={() => {
        cta(functionHall);
      }}
      actionText={"Submit"}
      isButtonDisabled={!validateFunctionHall()}
    >
      <LabelledInput
        required
        name={"name"}
        value={functionHall.name}
        setValue={(_val: string) => {
          setFunctionHall({ ...functionHall, name: _val });
        }}
      />
      <LabelledInput
        required
        name={"address"}
        value={functionHall.address}
        setValue={(_val: string) => {
          setFunctionHall({ ...functionHall, address: _val });
        }}
      />

      <div className="flex flex-col border-t-4 mt-[10px] border-accent px-[10px]">
        <div className="flex justify-between pt-[10px]">
          <h3 className="flex text-[16px] justify-end items-center text-white">
            Inventory
          </h3>
          <div>
            <TailwindButton
              text={"Add Item +"}
              onClick={() => {
                setNewInventoryTypeList([
                  ...functionHall.inventory,
                  { name: "", count: 0, charge: 0 },
                ]);
              }}
            />
          </div>
        </div>
        {functionHall.inventory.map((type, index) => {
          return (
            <div
              key={index}
              className="flex flex-col mt-[4px] pb-[10px] border-b-2"
            >
              <LabelledInput
                required
                name={"name"}
                value={type.name}
                setValue={(_val: string) =>
                  setNewInventoryTypeList(
                    functionHall.inventory.map((iT, i) =>
                      i === index ? { ...iT, name: _val } : iT,
                    ),
                  )
                }
              />
              <div className="flex">
                <div className="flex  px-[2px]">
                  <LabelledInput
                    required
                    name={"count"}
                    value={type.count}
                    setValue={(_val: number) =>
                      setNewInventoryTypeList(
                        functionHall.inventory.map((iT, i) =>
                          i === index ? { ...iT, count: _val } : iT,
                        ),
                      )
                    }
                    inputProps={{ type: "number" }}
                  />
                </div>
              </div>
              <div className="flex items-end justify-between px-[2px]">
                <LabelledInput
                  required
                  name={"damage charges"}
                  value={type.charge}
                  setValue={(_val: number) =>
                    setNewInventoryTypeList(
                      functionHall.inventory.map((iT, i) =>
                        i === index ? { ...iT, charge: _val } : iT,
                      ),
                    )
                  }
                  inputProps={{ type: "number" }}
                />
                <div>
                  <TailwindButton
                    text={<DeleteIcon />}
                    onClick={() => {
                      setNewInventoryTypeList(
                        functionHall.inventory.filter((_, i) => i !== index),
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col px-[10px] mt-[10px] border-t-4 border-accent">
        <div className="flex justify-between pt-[10px]">
          <h3 className="flex text-[16px] justify-end items-center text-white">
            Power Meters
          </h3>
          <div>
            <TailwindButton
              text={"Add Item +"}
              onClick={() => {
                setNewPowerMeterList([
                  ...functionHall.powerMeters,
                  { name: "" },
                ]);
              }}
            />
          </div>
        </div>
        {functionHall.powerMeters.map((powerMeter, index) => {
          return (
            <div
              key={index}
              className="flex flex-col mt-[4px] pb-[10px] border-b-2"
            >
              <LabelledInput
                required
                name={"name"}
                value={powerMeter.name}
                setValue={(_val: string) =>
                  setNewPowerMeterList(
                    functionHall.powerMeters.map((iT, i) =>
                      i === index ? { ...iT, name: _val } : iT,
                    ),
                  )
                }
              />
              <div className="flex items-end justify-end mt-[8px] px-[2px]">
                <TailwindButton
                  text={<DeleteIcon />}
                  onClick={() => {
                    setNewPowerMeterList(
                      functionHall.powerMeters.filter((_, i) => i !== index),
                    );
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col px-[10px] mt-[10px] border-t-4 border-accent">
        <div className="flex justify-between pt-[10px]">
          <h3 className="flex text-[16px] justify-end items-center text-white">
            Generators
          </h3>
          <div>
            <TailwindButton
              text={"Add Item +"}
              onClick={() => {
                setNewGeneratorList([...functionHall.generators, { name: "" }]);
              }}
            />
          </div>
        </div>
        {functionHall.generators.map((generator, index) => {
          return (
            <div
              key={index}
              className="flex flex-col mt-[4px] pb-[10px] border-b-2"
            >
              <LabelledInput
                required
                name={"name"}
                value={generator.name}
                setValue={(_val: string) =>
                  setNewGeneratorList(
                    functionHall.generators.map((iT, i) =>
                      i === index ? { ...iT, name: _val } : iT,
                    ),
                  )
                }
              />
              <div className="flex items-end justify-end mt-[8px] px-[2px]">
                <TailwindButton
                  text={<DeleteIcon />}
                  onClick={() => {
                    setNewGeneratorList(
                      functionHall.generators.filter((_, i) => i !== index),
                    );
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col px-[10px] mt-[10px] border-t-4 border-accent">
        <div className="flex justify-between pt-[10px]">
          <h3 className="flex text-[16px] justify-end items-center text-white">
            Rooms
          </h3>
          <div>
            <TailwindButton
              text={"Add Item +"}
              onClick={() => {
                setNewRoomList([...functionHall.rooms, { name: "" }]);
              }}
            />
          </div>
        </div>
        {functionHall.rooms.map((room, index) => {
          return (
            <div
              key={index}
              className="flex flex-col mt-[4px] pb-[10px] border-b-2"
            >
              <LabelledInput
                required
                name={"name"}
                value={room.name}
                setValue={(_val: string) =>
                  setNewRoomList(
                    functionHall.rooms.map((iT, i) =>
                      i === index ? { ...iT, name: _val } : iT,
                    ),
                  )
                }
              />
              <div className="flex items-end justify-end mt-[8px] px-[2px]">
                <TailwindButton
                  text={<DeleteIcon />}
                  onClick={() => {
                    setNewRoomList(
                      functionHall.rooms.filter((_, i) => i !== index),
                    );
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </ChakraModal>
  );
};

export default AddOrUpdateFunctionHallModal;
