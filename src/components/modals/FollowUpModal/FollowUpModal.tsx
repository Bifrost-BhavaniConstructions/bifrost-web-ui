import React from "react";
import "./FollowUpModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import httpClient from "../../../config/AxiosInterceptors";
import { toast } from "react-toastify";
import { useStoreActions } from "../../../store/hooks";
import moment from "moment";
import TailwindButton from "../../TailwindButton";
import { FollowUp } from "../../../types/FunctionHall/FollowUp";
import { PhoneIcon } from "@heroicons/react/20/solid";

interface AcceptBookingModalProps {
  open: boolean;
  closeCallback: Function;
  enquiryId: string;
  followups: FollowUp[];
  contactNumber: number;
}

const FollowUpModal: React.FC<AcceptBookingModalProps> = ({
  closeCallback,
  open,
  enquiryId,
  followups,
  contactNumber,
}) => {
  // Objects

  // Variables
  const { fetchEnquiries } = useStoreActions(
    (actions) => actions.functionHallStore,
  );

  // State Variables - Hooks
  const [remark, setRemark] = React.useState("");
  const [date, setDate] = React.useState(new Date());

  // Functions
  const addFollowUp = () => {
    httpClient
      .post(`/function-hall/enquiry/followup/${enquiryId}`, {
        remark,
        datetime: date,
      })
      .then(() => {
        fetchEnquiries();
        toast(`Followup Saved`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setDate(new Date());
        setRemark("");
      });
  };

  // Hook Functions

  return (
    <ChakraModal
      closeCallback={() => {
        setRemark("");
        closeCallback();
      }}
      open={open}
      title={"Follow Up"}
      action={() => {}}
    >
      <LabelledInput
        name={"remark"}
        value={remark}
        setValue={(_val: string) => {
          setRemark(_val);
        }}
      />
      <LabelledInput
        name={"date"}
        value={moment(date).format("yyyy-MM-DDTHH:mm")}
        setValue={(_val: string) => {
          setDate(new Date(_val));
        }}
        inputProps={{ type: "datetime-local" }}
      />
      <div className="flex w-full mt-[10px] justify-between items-end">
        <div
          onClick={() => {
            window.open("tel:" + contactNumber, "_blank");
          }}
          className="flex p-[8px] w-[30px] h-[30px] text-accent rounded-[4px] bg-low-bg"
        >
          <PhoneIcon width={14} />
        </div>
        <TailwindButton
          text={"Add Followup"}
          onClick={() => {
            addFollowUp();
          }}
          isDisabled={!(remark !== "")}
        />
      </div>
      <div className="flex flex-col">
        {followups.map((followup) => (
          <div className="flex flex-col py-[10px] border-b-2">
            <div className="flex flex-col">
              <div className="font-light text-[12px] opacity-70">remarks</div>
              <div className="flex font-semibold text-[14px]">
                {followup.remark}
              </div>
            </div>
            <div className="flex items-end">
              <div className="flex flex-grow flex-col">
                <div className="font-light text-[12px] opacity-70">time</div>
                <div className="flex font-semibold text-[14px]">
                  {new Date(followup.datetime).toLocaleString()}
                </div>
              </div>
              <div className="flex font-nomal text-[14px]">
                -{followup.user.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ChakraModal>
  );
};

export default FollowUpModal;
