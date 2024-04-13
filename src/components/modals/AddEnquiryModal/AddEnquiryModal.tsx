import React from "react";
import "./AddEnquiryModal.css";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import { UserRoleEnum } from "../../../enums/UserRoleEnum";
import { EnquiryCreateWrapper } from "../../../types/FunctionHall/Enquiry";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import ChakraSelect from "../../ChakraSelect";
import moment from "moment";
import { Estimate } from "../../../types/FunctionHall/Estimate";
import httpClient from "../../../config/AxiosInterceptors";
import { toast } from "react-toastify";
import {
  getPartOfDayEnumFromString,
  PartOfDayEnum,
} from "../../../enums/PartOfDayEnum";

interface AddEnquiryModalProps {
  closeCallback: Function;
  open: boolean;
  functionHallId?: string;
  editEnquiry?: EnquiryCreateWrapper;
  addEstimate?: boolean;
  enquiryId?: string;
  latestEstimate?: Estimate;
}

const AddEnquiryModal: React.FC<AddEnquiryModalProps> = ({
  open,
  closeCallback,
  editEnquiry,
  addEstimate,
  enquiryId,
  latestEstimate,
}) => {
  // Objects
  const latestDate = new Date();
  const emptyEnquiry: EnquiryCreateWrapper = {
    createdAt: "",
    enquiryType: "",
    estimates: [],
    fromDate: latestDate,
    toDate: latestDate,
    functionHall: "",
    isBooking: false,
    name: "",
    isFloating: false,
    primaryContactName: "",
    primaryContactNumber: 0,
    pax: 0,
    primaryReference: "",
    secondaryContactName: "",
    secondaryReference: "",
    updatedAt: "",
    partOfDay: PartOfDayEnum.MORNING,
  };

  const emptyEstimate: Estimate = {
    generatorTariff: 0,
    maintenanceCharges: 0,
    additionalGuestRoomTariff: 0,
    applicableTaxes: 0,
    electricityTariff: 0,
    furnitureUtilityCharges: 0,
    hallTariff: 0,
    securityTariff: 0,
  };

  const { functionHalls, enquiryTypes } = useStoreState(
    (state) => state.functionHallStore,
  );
  const { users } = useStoreState((state) => state.peopleStore);
  const { fetchEnquiries } = useStoreActions(
    (actions) => actions.functionHallStore,
  );

  // Variables

  // State Variables - Hooks
  const [enquiry, setEnquiry] = React.useState(emptyEnquiry);
  const [estimate, setEstimate] = React.useState(emptyEstimate);
  const [type, setType] = React.useState("SINGLE");
  // Functions
  const createEnquiry = () => {
    httpClient
      .post("/function-hall/enquiry/", {
        ...enquiry,
        estimates: [estimate],
        isFloating: type === "FLOATING",
      })
      .then(() => {
        fetchEnquiries();
        toast(`Enquiry created`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        closeCallback();
      });
  };

  const updateEnquiry = () => {
    //console.log({ ...enquiry, estimates: [] });
    httpClient
      .put("/function-hall/enquiry/", {
        ...enquiry,
        primaryContactNumber: parseInt(enquiry.primaryContactNumber.toString()),
        isFloating: type === "FLOATING",
        estimates: [],
      })
      .then(() => {
        fetchEnquiries();
        toast(`Enquiry updated`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        closeCallback();
      });
  };

  const addEstimateToEnquiry = () => {
    httpClient
      .post(`/function-hall/enquiry/estimate/${enquiryId!}`, estimate)
      .then(() => {
        fetchEnquiries();
        toast(`Estimate Added`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        closeCallback();
      });
  };

  const validateEnquiry: () => boolean = () => {
    return (
      enquiry.name !== "" &&
      enquiry.functionHall !== "" &&
      enquiry.fromDate !== undefined &&
      enquiry.toDate !== undefined &&
      enquiry.enquiryType !== "" &&
      enquiry.primaryContactName !== "" &&
      enquiry.primaryContactNumber != 0
    );
  };

  const validateEstimate: () => boolean = () => {
    return (
      estimate.generatorTariff > 0 &&
      estimate.securityTariff > 0 &&
      estimate.hallTariff > 0 &&
      estimate.furnitureUtilityCharges > 0 &&
      estimate.maintenanceCharges > 0 &&
      estimate.additionalGuestRoomTariff > 0 &&
      estimate.electricityTariff > 0 &&
      estimate.applicableTaxes > 0
    );
  };

  // Hook Functions
  React.useEffect(() => {
    if (editEnquiry?._id) {
      setEnquiry(editEnquiry);
    }
  }, [editEnquiry]);
  React.useEffect(() => {
    if (latestEstimate) {
      setEstimate(latestEstimate);
    }
  }, [latestEstimate]);
  React.useEffect(() => {
    if (
      enquiry.fromDate &&
      enquiry.toDate &&
      new Date(enquiry.fromDate).toDateString() ===
        new Date(enquiry.toDate).toDateString()
    ) {
      if (type === "FLOATING") setType("FLOATING");
      else setType("SINGLE");
    } else {
      setType("MULTI");
    }
  }, [enquiry]);
  React.useEffect(() => {
    if (type === "SINGLE" || type === "FLOATING") {
      setEnquiry({
        ...enquiry,
        fromDate: enquiry.fromDate,
        toDate: enquiry.fromDate,
      });
    }
  }, [type]);

  return (
    <ChakraModal
      closeCallback={() => {
        setEnquiry(emptyEnquiry);
        closeCallback();
      }}
      open={open}
      title={
        !!editEnquiry
          ? "Update Enquiry"
          : !!addEstimate
          ? "Add Estimate"
          : "Add Enquiry"
      }
      action={() => {
        !!editEnquiry
          ? updateEnquiry()
          : !!addEstimate
          ? addEstimateToEnquiry()
          : createEnquiry();
      }}
      actionText={"Submit"}
      isButtonDisabled={
        !!editEnquiry
          ? !validateEnquiry()
          : !!addEstimate
          ? !validateEstimate()
          : !(validateEnquiry() && validateEstimate())
      }
    >
      <Stack spacing={3}>
        {!addEstimate && (
          <>
            <h3 className="flex text-[16px] justify-end text-white mt-[10px] pt-[10px]">
              General Information
            </h3>
            <LabelledInput
              required
              name="name"
              value={enquiry.name}
              setValue={(_val: string) => {
                setEnquiry({ ...enquiry, name: _val });
              }}
            />
            <ChakraSelect
              required
              name="function hall"
              value={enquiry.functionHall}
              values={functionHalls.map((fH) => ({
                name: fH.name,
                value: fH._id!,
              }))}
              onValueChange={(value) => {
                setEnquiry({ ...enquiry, functionHall: value });
              }}
            />
            <RadioGroup
              value={type}
              onChange={(e) => {
                setType(e);
              }}
              className="p-[8px] my-[4px]"
            >
              <Stack spacing={4} direction="row">
                <Radio value="SINGLE">Single Day</Radio>
                <Radio value="MULTI">Multi Day</Radio>
                <Radio value="FLOATING">Floating</Radio>
              </Stack>
            </RadioGroup>
            {type === "MULTI" && (
              <>
                <LabelledInput
                  required
                  name="from"
                  value={moment(enquiry.fromDate).format("yyyy-MM-DD")}
                  setValue={(_val: string) => {
                    setEnquiry({ ...enquiry, fromDate: new Date(_val) });
                  }}
                  inputProps={{ type: "date" }}
                />
                <LabelledInput
                  required
                  name="to"
                  value={moment(enquiry.toDate).format("yyyy-MM-DD")}
                  setValue={(_val: string) => {
                    setEnquiry({ ...enquiry, toDate: new Date(_val) });
                  }}
                  inputProps={{ type: "date" }}
                />
              </>
            )}
            {(type === "SINGLE" || type === "FLOATING") && (
              <LabelledInput
                required
                name="event date"
                value={moment(enquiry.fromDate).format("yyyy-MM-DD")}
                setValue={(_val: string) => {
                  const x = new Date(_val);
                  setEnquiry({
                    ...enquiry,
                    fromDate: x,
                    toDate: x,
                  });
                }}
                inputProps={{ type: "date" }}
              />
            )}
            <ChakraSelect
              name="primary reference"
              value={enquiry.primaryReference}
              values={users
                .filter((user) => user.role === UserRoleEnum.SUPER_ADMIN)
                .map((fH) => ({
                  name: fH.name,
                  value: fH._id!,
                }))}
              onValueChange={(value) => {
                setEnquiry({ ...enquiry, primaryReference: value });
              }}
            />
            <LabelledInput
              name="secondary reference"
              value={enquiry.secondaryReference!}
              setValue={(_val: string) => {
                setEnquiry({ ...enquiry, secondaryReference: _val });
              }}
            />
            <ChakraSelect
              required
              name="enquiry type"
              value={enquiry.enquiryType}
              values={enquiryTypes.map((fH) => ({
                name: fH.name,
                value: fH._id!,
              }))}
              onValueChange={(value) => {
                setEnquiry({ ...enquiry, enquiryType: value });
              }}
            />
            <ChakraSelect
              name="part of day"
              value={enquiry.partOfDay}
              values={[
                PartOfDayEnum.MORNING,
                PartOfDayEnum.AFTERNOON,
                PartOfDayEnum.NIGHT,
              ].map((fH) => ({
                name: fH.split("_").join("/").toLowerCase(),
                value: fH.toString(),
              }))}
              onValueChange={(value: string) => {
                setEnquiry({
                  ...enquiry,
                  partOfDay: getPartOfDayEnumFromString(value)!,
                });
              }}
            />
            <LabelledInput
              required
              name="muhurtam"
              value={enquiry.muhurtam!}
              setValue={(_val: string) => {
                setEnquiry({ ...enquiry, muhurtam: _val });
              }}
              inputProps={{ type: "time" }}
            />
            <LabelledInput
              required
              name="pax"
              value={enquiry.pax}
              setValue={(_val: number) => {
                setEnquiry({ ...enquiry, pax: _val });
              }}
              inputProps={{ type: "number" }}
            />
            <h3 className="flex text-[16px] justify-end text-white border-t-2 mt-[10px] pt-[10px]">
              Contact Information
            </h3>
            <LabelledInput
              required
              name="primary contact name"
              value={enquiry.primaryContactName}
              setValue={(_val: string) => {
                setEnquiry({ ...enquiry, primaryContactName: _val });
              }}
            />
            <LabelledInput
              required
              name="primary contact number"
              value={enquiry.primaryContactNumber}
              setValue={(_val: number) => {
                setEnquiry({ ...enquiry, primaryContactNumber: _val });
              }}
              inputProps={{ type: "number" }}
            />
            <LabelledInput
              name="secondary contact name"
              value={enquiry.secondaryContactName!}
              setValue={(_val: string) => {
                setEnquiry({ ...enquiry, secondaryContactName: _val });
              }}
            />
            <LabelledInput
              name="secondary contact number"
              value={enquiry.secondaryContactNumber!}
              setValue={(_val: number) => {
                setEnquiry({ ...enquiry, secondaryContactNumber: _val });
              }}
              inputProps={{ type: "number" }}
            />
          </>
        )}
        {!editEnquiry && (
          <>
            <h3
              className={`flex text-[16px] justify-end text-white mt-[10px] pt-[10px] ${
                !!addEstimate ? "" : "border-t-2"
              }`}
            >
              Estimation
            </h3>
            <LabelledInput
              name="hall tariff"
              required
              value={estimate.hallTariff}
              setValue={(_val: number) => {
                setEstimate({ ...estimate, hallTariff: _val });
              }}
              inputProps={{ type: "number" }}
              inputLeftAddon={"₹"}
            />
            <LabelledInput
              required
              name="furniture utility charges"
              value={estimate.furnitureUtilityCharges}
              setValue={(_val: number) => {
                setEstimate({ ...estimate, furnitureUtilityCharges: _val });
              }}
              inputProps={{ type: "number" }}
              inputLeftAddon={"₹"}
            />
            <LabelledInput
              required
              name="maintenance charges"
              value={estimate.maintenanceCharges}
              setValue={(_val: number) => {
                setEstimate({ ...estimate, maintenanceCharges: _val });
              }}
              inputProps={{ type: "number" }}
              inputLeftAddon={"₹"}
            />
            <LabelledInput
              required
              name="applicable taxes"
              value={estimate.applicableTaxes}
              setValue={(_val: number) => {
                setEstimate({ ...estimate, applicableTaxes: _val });
              }}
              inputProps={{ type: "number" }}
              inputLeftAddon={"₹"}
            />
            <LabelledInput
              required
              name="additional guest room tariff"
              value={estimate.additionalGuestRoomTariff}
              setValue={(_val: number) => {
                setEstimate({ ...estimate, additionalGuestRoomTariff: _val });
              }}
              inputProps={{ type: "number" }}
              inputLeftAddon={"₹"}
              inputRightAddon={"/room"}
            />
            <LabelledInput
              required
              name="electricity tariff"
              value={estimate.electricityTariff}
              setValue={(_val: number) => {
                setEstimate({ ...estimate, electricityTariff: _val });
              }}
              inputProps={{ type: "number" }}
              inputLeftAddon={"₹"}
              inputRightAddon={"/unit"}
            />
            <LabelledInput
              required
              name="security tariff"
              value={estimate.securityTariff}
              setValue={(_val: number) => {
                setEstimate({ ...estimate, securityTariff: _val });
              }}
              inputProps={{ type: "number" }}
              inputLeftAddon={"₹"}
              inputRightAddon={"/guard"}
            />
            <LabelledInput
              required
              name="generator tariff"
              value={estimate.generatorTariff}
              setValue={(_val: number) => {
                setEstimate({ ...estimate, generatorTariff: _val });
              }}
              inputProps={{ type: "number" }}
              inputLeftAddon={"₹"}
              inputRightAddon={"/generator"}
            />
            <LabelledInput
              name="total estimate (excl. additional charges)"
              value={
                Number(estimate.hallTariff) +
                Number(estimate.furnitureUtilityCharges) +
                Number(estimate.maintenanceCharges) +
                Number(estimate.applicableTaxes)
              }
              setValue={() => {}}
              inputProps={{ type: "number", isDisabled: true }}
              inputLeftAddon={"₹"}
            />
          </>
        )}
      </Stack>
    </ChakraModal>
  );
};

export default AddEnquiryModal;
