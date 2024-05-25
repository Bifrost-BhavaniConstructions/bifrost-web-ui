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
  Tag,
  TagLabel,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import ChakraSelect from "@/components/ChakraSelect";
import { Badge } from "@/components/ui/badge";
import LabelledInput from "@/components/LabelledFormInputs/LabelledInput";
import { UserRoleEnum } from "@/enums/UserRoleEnum";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/ui/drawer";

interface ChakraModalProps {
  open: boolean;
  closeCallback: Function;
  children: React.ReactNode;
  title: string;
  description?: string;
  actionText?: string;
  extraButtonText?: string;
  action: Function;
  extraButtonAction?: Function;
  modalProps?: ModalProps;
  minH?: number;
  isButtonDisabled?: boolean;
  isExtraButtonDisabled?: boolean;
  extraButtonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  zIndex?: number;
}

const ChakraModal: React.FC<ChakraModalProps> = ({
  open,
  closeCallback,
  children,
  title,
  description,
  action,
  actionText,
  modalProps,
  minH = 400,
  isButtonDisabled,
  isExtraButtonDisabled,
  extraButtonText,
  extraButtonAction,
  extraButtonVariant = "default",
  zIndex,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Functions
  const closeModal = () => {
    closeCallback();
  };

  // Hook Functions

  return (
    <>
      {isDesktop ? (
        <Dialog
          open={open}
          onOpenChange={(open) => {
            console.log(open);
            if (!open) {
              closeModal();
            }
          }}
        >
          <DialogOverlay style={{ zIndex: zIndex ? zIndex : 1500 }} />
          <DialogContent
            className={cn("sm:max-w-[425px] md:max-w-[600px]")}
            style={{ zIndex: zIndex ? zIndex : 1500 }}
          >
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="px-[16px] overflow-y-auto max-h-[500px]">
              {children}
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                className="font-normal"
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
              >
                Close
              </Button>
              {extraButtonText && extraButtonText !== "" && (
                <Button
                  className={cn("font-normal ml-[8px]")}
                  variant={extraButtonVariant}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (extraButtonAction) extraButtonAction();
                  }}
                  disabled={isExtraButtonDisabled}
                >
                  {extraButtonText}
                </Button>
              )}
              {actionText && actionText !== "" && (
                <Button
                  variant="default"
                  className="font-normal ml-[8px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    action();
                  }}
                  disabled={isButtonDisabled}
                >
                  {actionText}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={open}
          dismissible
          onOpenChange={(op) => {
            if (!op) closeModal();
          }}
        >
          <DrawerOverlay
            className={cn(zIndex ? `z-[${zIndex}]` : "z-[1500]")}
          />
          <DrawerContent className={cn(zIndex ? `z-[${zIndex}]` : "z-[1500]")}>
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <div className="px-[16px] overflow-y-auto max-h-[500px]">
              {children}
            </div>
            <DrawerFooter>
              <DrawerClose className="w-full">
                <Button
                  variant="ghost"
                  className="font-normal"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                  }}
                >
                  Close
                </Button>
              </DrawerClose>
              {extraButtonText && extraButtonText !== "" && (
                <Button
                  className={cn("font-normal ml-[8px]")}
                  variant={extraButtonVariant}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (extraButtonAction) extraButtonAction();
                  }}
                  disabled={isExtraButtonDisabled}
                >
                  {extraButtonText}
                </Button>
              )}
              {actionText && actionText !== "" && (
                <Button
                  variant="default"
                  className="font-normal ml-[8px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    action();
                  }}
                  disabled={isButtonDisabled}
                >
                  {actionText}
                </Button>
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default ChakraModal;
