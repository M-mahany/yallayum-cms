import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorToast, successToast } from "../../../hooks/useToast";
import GeneralImageUpload from "../../../components/general/GeneralImageUpload";
import { AddFlavor } from "../../../validations/customproduct";

const AddCustomFlavor = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddFlavor) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("images", image);
      let response = await API.uploadImages(formData);
      const uploadedUrl = response?.data?.data[0];
      response = await API.createFlavor({
        ...data,
        imageUrl: uploadedUrl,
      });
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Cannot add category");
    }
  };
  const handleCancle = () => {
    navigate(-1);
  };

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Custom Product"}
        previous={"Dashboard"}
        currentpage={"Add Flovor"}
      />
      <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
            <InputField
              label="Flavor Name"
              type="text"
              isInvalid={isInvalid}
              isRequired={true}
              placeholder="Flavor Name"
              errortext="Flavor Name Is Required"
              errors={errors}
              name="name"
              register={register}
            />
            <InputField
              label="Price Per 10 grams"
              type="number"
              isInvalid={isInvalid}
              isRequired={true}
              placeholder="Price Name"
              errortext="Price Is Required"
              errors={errors}
              name="price"
              register={register}
            />
          </div>
          <div className="w-full">
            <GeneralImageUpload
              heading={"Upload Image"}
              image={image}
              setImage={setImage}
              name="imageUrl"
              errors={errors}
              register={register}
              setValue={setValue}
            />
          </div>

          <div className="w-full md:w-1/4 mt-4">
            <div className="flex gap-3">
              <ButtonComponent
                type="submit"
                text="Save"
                loading={loading}
                isActive={true}
              />
              <ButtonComponent
                text="Cancel"
                isActive={true}
                btnclass={"bg-red-500"}
                onClick={() => handleCancle()}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCustomFlavor;
