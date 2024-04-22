import React from "react";
import "./ChakraModal.css";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

interface ChakraModalProps {
  open: boolean;
  closeCallback: Function;
  children: React.ReactNode;
  title: string;
  actionText?: string;
  action: Function;
  modalProps?: ModalProps;
  minH?: number;
  isButtonDisabled?: boolean;
}

const ChakraModal: React.FC<ChakraModalProps> = ({
  open,
  closeCallback,
  children,
  title,
  action,
  actionText,
  modalProps,
  minH = 400,
  isButtonDisabled,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Functions
  const closeModal = () => {
    closeCallback();
    onClose();
  };

  // Hook Functions
  React.useEffect(() => {
    if (open) {
      onOpen();
    } else {
      closeModal();
    }
  }, [open]);

  return (
    <>
      <Modal
        isCentered
        size="2xl"
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onClose={closeModal}
        {...modalProps}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
        <ModalContent className="bg-background">
          <ModalHeader className="font-bold text-[16px]">{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody minH={`${minH}px`}>{children}</ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              className="font-normal"
              onClick={closeModal}
            >
              Close
            </Button>
            {actionText && actionText !== "" && (
              <Button
                variant="default"
                className="font-normal ml-[8px]"
                onClick={() => {
                  action();
                }}
                disabled={isButtonDisabled}
              >
                {actionText}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChakraModal;
