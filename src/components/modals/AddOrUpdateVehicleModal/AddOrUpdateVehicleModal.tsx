import React from "react";
import "./AddOrUpdateVehicleModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import { Vehicle } from "../../../types/SiteManagement/Vehicle";
import moment from "moment/moment";

interface AddOrUpdateVehicleModalProps {
  open: boolean;
  closeCallback: Function;
  cta: (vehicle: Vehicle) => void;
  editVehicle?: Vehicle;
}

const AddOrUpdateVehicleModal: React.FC<AddOrUpdateVehicleModalProps> = ({
  closeCallback,
  open,
  cta,
  editVehicle,
}) => {
  // Objects
  const emptyVehicle: Vehicle = {
    chassis: "",
    class: "",
    fitness: new Date(),
    insurance: new Date(),
    insuranceCompany: "",
    insuranceType: "",
    make: "",
    model: "",
    number: "",
    permit: new Date(),
    puc: "",
    regValidity: new Date(),
    tax: new Date(),
    taxType: "",
    name: "",
    assignmentHistory: [],
  };

  // Variables
  const [vehicle, setVehicle] = React.useState<Vehicle>(emptyVehicle);
  // Functions
  const validateVehicle: () => boolean = () => {
    return vehicle.name !== "" && vehicle.chassis !== "";
  };

  // Hook Functions
  React.useEffect(() => {
    if (editVehicle) {
      setVehicle(editVehicle);
    }
  }, [editVehicle]);

  return (
    <ChakraModal
      closeCallback={() => {
        setVehicle(emptyVehicle);
        closeCallback();
      }}
      open={open}
      title={"Add Vehicle"}
      action={() => {
        cta(vehicle);
      }}
      actionText={"Submit"}
      isButtonDisabled={!validateVehicle()}
    >
      <LabelledInput
        required
        name={"name"}
        value={vehicle.name}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, name: _val });
        }}
      />
      <LabelledInput
        required
        name={"number"}
        value={vehicle.number}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, number: _val });
        }}
      />
      <LabelledInput
        required
        name={"chassis"}
        value={vehicle.chassis}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, chassis: _val });
        }}
      />
      <LabelledInput
        required
        name={"class"}
        value={vehicle.class}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, class: _val });
        }}
      />
      <LabelledInput
        required
        name={"model"}
        value={vehicle.model}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, model: _val });
        }}
      />
      <LabelledInput
        required
        name={"make"}
        value={vehicle.make}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, make: _val });
        }}
      />
      <LabelledInput
        required
        name={"puc"}
        value={vehicle.puc}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, puc: _val });
        }}
      />
      <LabelledInput
        required
        name={"insurance company"}
        value={vehicle.insuranceCompany}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, insuranceCompany: _val });
        }}
      />
      <LabelledInput
        required
        name={"tax type"}
        value={vehicle.taxType}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, taxType: _val });
        }}
      />
      <LabelledInput
        required
        name={"insurance type"}
        value={vehicle.insuranceType}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, insuranceType: _val });
        }}
      />
      <h3 className="flex text-[16px] justify-end text-white border-t-2 mt-[10px] pt-[10px]">
        Important Dates
      </h3>
      <LabelledInput
        required
        name="from"
        value={moment(vehicle.fitness).format("yyyy-MM-DD")}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, fitness: new Date(_val) });
        }}
        inputProps={{ type: "date" }}
      />
      <LabelledInput
        required
        name="permit"
        value={moment(vehicle.permit).format("yyyy-MM-DD")}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, permit: new Date(_val) });
        }}
        inputProps={{ type: "date" }}
      />
      <LabelledInput
        required
        name="insurance"
        value={moment(vehicle.insurance).format("yyyy-MM-DD")}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, insurance: new Date(_val) });
        }}
        inputProps={{ type: "date" }}
      />
      <LabelledInput
        required
        name="tax"
        value={moment(vehicle.tax).format("yyyy-MM-DD")}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, tax: new Date(_val) });
        }}
        inputProps={{ type: "date" }}
      />
      <LabelledInput
        required
        name="reg validity"
        value={moment(vehicle.regValidity).format("yyyy-MM-DD")}
        setValue={(_val: string) => {
          setVehicle({ ...vehicle, regValidity: new Date(_val) });
        }}
        inputProps={{ type: "date" }}
      />
    </ChakraModal>
  );
};

export default AddOrUpdateVehicleModal;
