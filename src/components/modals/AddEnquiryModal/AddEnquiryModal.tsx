import React, { useRef } from "react";
import "./AddEnquiryModal.css";
import { Button, Stack } from "@chakra-ui/react";
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

interface AddEnquiryModalProps {
  closeCallback: Function;
  open: boolean;
  functionHallId?: string;
  editEnquiry?: EnquiryCreateWrapper;
  addEstimate?: boolean;
  enquiryId?: string;
}

const AddEnquiryModal: React.FC<AddEnquiryModalProps> = ({
  open,
  closeCallback,
  editEnquiry,
  addEstimate,
  enquiryId,
}) => {
  // Objects
  const emptyEnquiry: EnquiryCreateWrapper = {
    createdAt: "",
    enquiryType: "",
    estimates: [],
    fromDate: new Date(),
    toDate: new Date(),
    functionHall: "",
    isBooking: false,
    name: "",
    primaryContactName: "",
    primaryContactNumber: 0,
    primaryReference: "",
    secondaryContactName: "",
    secondaryReference: "",
    updatedAt: "",
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
  // Functions
  const createEnquiry = () => {
    console.log({ ...enquiry, estimates: [estimate] });
    httpClient
      .post("/function-hall/enquiry/", { ...enquiry, estimates: [estimate] })
      .then(() => {
        fetchEnquiries();
        toast(`Enquiry created`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        closeCallback();
      });
  };

  const updateEnquiry = () => {
    console.log({ ...enquiry, estimates: [] });
    httpClient
      .put("/function-hall/enquiry/", { ...enquiry, estimates: [] })
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
      enquiry.primaryReference !== "" &&
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
            <LabelledInput
              required
              name="from"
              value={moment(enquiry.fromDate).format("yyyy-MM-DDTHH:mm")}
              setValue={(_val: string) => {
                setEnquiry({ ...enquiry, fromDate: new Date(_val) });
              }}
              inputProps={{ type: "datetime-local" }}
            />
            <LabelledInput
              required
              name="to"
              value={moment(enquiry.toDate).format("yyyy-MM-DDTHH:mm")}
              setValue={(_val: string) => {
                setEnquiry({ ...enquiry, toDate: new Date(_val) });
              }}
              inputProps={{ type: "datetime-local" }}
            />
            <ChakraSelect
              required
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
              name="total estimate"
              value={
                Number(estimate.hallTariff) +
                Number(estimate.furnitureUtilityCharges) +
                Number(estimate.maintenanceCharges) +
                Number(estimate.applicableTaxes)
              }
              setValue={() => {}}
              inputProps={{ type: "number", isDisabled: true }}
              inputLeftAddon={"₹"}
              inputRightAddon={"excl. additional charges"}
            />
          </>
        )}
      </Stack>
    </ChakraModal>
  );
};

export default AddEnquiryModal;
