import React from "react";
import "./AddOrUpdatePhoneModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import { Phone } from "../../../types/SiteManagement/Phone";

interface AddOrUpdatePhoneModalProps {
  open: boolean;
  closeCallback: Function;
  cta: (phone: Phone) => void;
  editPhone?: Phone;
}

const AddOrUpdatePhoneModal: React.FC<AddOrUpdatePhoneModalProps> = ({
  closeCallback,
  open,
  cta,
  editPhone,
}) => {
  // Objects
  const emptyPhone: Phone = {
    number: "",
    name: "",
    assignmentHistory: [],
  };

  // Variables
  const [phone, setPhone] = React.useState<Phone>(emptyPhone);
  // Functions
  const validatePhone: () => boolean = () => {
    return phone.name !== "" && phone.number !== "";
  };

  // Hook Functions
  React.useEffect(() => {
    if (editPhone) {
      setPhone(editPhone);
    }
  }, [editPhone]);

  return (
    <ChakraModal
      closeCallback={() => {
        setPhone(emptyPhone);
        closeCallback();
      }}
      open={open}
      title={"Add Phone"}
      action={() => {
        cta(phone);
      }}
      actionText={"Submit"}
      isButtonDisabled={!validatePhone()}
    >
      <LabelledInput
        required
        name={"name"}
        value={phone.name}
        setValue={(_val: string) => {
          setPhone({ ...phone, name: _val });
        }}
      />
      <LabelledInput
        required
        name={"number"}
        value={phone.number}
        setValue={(_val: string) => {
          setPhone({ ...phone, number: _val });
        }}
      />
    </ChakraModal>
  );
};

export default AddOrUpdatePhoneModal;
