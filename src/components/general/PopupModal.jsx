import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { VscPreview } from "react-icons/vsc";

const PopupModal = ({ children, title, id, updateFeedbackStatus }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdate = async () => {
    await updateFeedbackStatus(id);
    onClose();
  };

  return (
    <>
      <Tooltip
        showArrow={true}
        color="success"
        placement="left-start"
        content="Click to preview"
        className="text-white"
      >
        <Button onPress={onOpen} color="none" size="xs" className="popup-btn">
          <VscPreview className="text-green-500 text-2xl" />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          {children}
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button
              className="bg-themePrimary-0 text-white shadow-lg shadow-indigo-500/20"
              onPress={handleUpdate}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PopupModal;
