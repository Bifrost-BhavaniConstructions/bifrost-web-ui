import React from "react";
import "./ChakraModal.css";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  ModalProps,
} from "@chakra-ui/react";

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
        size="sm"
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onClose={closeModal}
        {...modalProps}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
        <ModalContent bg="brand.main-bg">
          <ModalHeader className="font-bold text-[16px]">{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody minH={`${minH}px`}>{children}</ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              className="font-normal text-[12px]"
              onClick={closeModal}
            >
              Close
            </Button>
            {actionText && (
              <Button
                variant="solid"
                bg="brand.low-bg"
                className="font-normal text-[12px]"
                onClick={() => {
                  action();
                }}
                isDisabled={isButtonDisabled}
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
