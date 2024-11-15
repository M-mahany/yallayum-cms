import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";

import InputField from "./InputField";
import { useForm } from "react-hook-form";
import ButtonComponent from "./ButtonComponent";
import { yupResolver } from "@hookform/resolvers/yup";

const GeneralModal = ({
  btntitle,
  title,
  names,
  sectionData,
  submitSection,
  loading,
  validationSchema
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver:yupResolver(validationSchema)});

  return (
    <div className="EditSizeModal">
      <Tooltip
        showArrow={true}
        color="success"
        placement="left-start"
        content="Click to preview"
        className="text-white"
      >
        <Button
          onPress={onOpen}
          color="none"
          size="xs"
          className="bg-themeBtn-0 py-4 px-2 rounded-lg min-w-[170px] flex items-center justify-center text-center text-white font-medium capitalize gap-1"
        >
          {btntitle}
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <form
            className="grid grid-col-1 gap-6"
            onSubmit={handleSubmit(submitSection)}
          >
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <div className="error-group grid grid-cols-1 justify-start gap-4 items-end w-full">
                {names?.map((name) => (
                  <div key={name} className="w-full">
                    <InputField
                      label={name?.charAt(0).toUpperCase() + name?.slice(1)}
                      type={name === "paragh" ? "textarea" : "text"}
                      placeholder={name?.charAt(0)?.toUpperCase() + name?.slice(1)}
                      errors={errors}
                      defaultValue={sectionData[name]}
                      name={name}
                      register={register}
                    />
                  </div>
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-end items-center gap-4">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <ButtonComponent
                  type="submit"
                  text="Save"
                  loading={loading}
                  isActive={true}
                />
              </div>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GeneralModal;
