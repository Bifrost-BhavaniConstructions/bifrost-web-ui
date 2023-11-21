import React from "react";
import "./AddOrUpdateCardModal.css";
import ChakraModal from "../ChakraModal";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import { Card } from "../../../types/SiteManagement/Card";
import moment from "moment";

interface AddOrUpdateCardModalProps {
  open: boolean;
  closeCallback: Function;
  cta: (card: Card) => void;
  editCard?: Card;
}

const AddOrUpdateCardModal: React.FC<AddOrUpdateCardModalProps> = ({
  closeCallback,
  open,
  cta,
  editCard,
}) => {
  // Objects
  const emptyCard: Card = {
    number: "",
    name: "",
    nameOnCard: "",
    expiry: "",
    assignmentHistory: [],
  };

  // Variables
  const [card, setCard] = React.useState<Card>(emptyCard);
  // Functions
  const validateCard: () => boolean = () => {
    return card.name !== "" && card.number !== "";
  };

  // Hook Functions
  React.useEffect(() => {
    if (editCard) {
      setCard(editCard);
    }
  }, [editCard]);

  return (
    <ChakraModal
      closeCallback={() => {
        setCard(emptyCard);
        closeCallback();
      }}
      open={open}
      title={"Add Card"}
      action={() => {
        cta(card);
      }}
      actionText={"Submit"}
      isButtonDisabled={!validateCard()}
    >
      <LabelledInput
        required
        name={"name"}
        value={card.name}
        setValue={(_val: string) => {
          setCard({ ...card, name: _val });
        }}
      />
      <LabelledInput
        required
        name={"number"}
        value={card.number}
        setValue={(_val: string) => {
          setCard({ ...card, number: _val });
        }}
      />
      <LabelledInput
        required
        name="expiry"
        value={moment(card.expiry).format("yyyy-MM")}
        setValue={(_val: string) => {
          setCard({ ...card, expiry: _val });
        }}
        inputProps={{ type: "month" }}
      />
      <LabelledInput
        required
        name={"name on card"}
        value={card.nameOnCard}
        setValue={(_val: string) => {
          setCard({ ...card, nameOnCard: _val });
        }}
      />
    </ChakraModal>
  );
};

export default AddOrUpdateCardModal;
