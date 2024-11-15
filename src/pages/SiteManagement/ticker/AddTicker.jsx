import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorToast, successToast } from "../../../hooks/useToast";

import { tickerSchema } from "../../../validations/tickerValidation";
const AddTicker = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(tickerSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await API.registerTicker(data);
      successToast(response?.data?.message);
      setLoading(false);
      handleCancle();
    } catch (error) {
      setLoading(false);
      console.log(error);
      errorToast(error);
    }
  };
  const handleCancle = () => {
    navigate(-1);
  };

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Ticker"}
        previous={"Dashboard"}
        currentpage={"Add Tick"}
      />
      <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
            <InputField
              label="Tick"
              type="text"
              errortext={"Please Enter tick"}
              placeholder="Enter tick"
              errors={errors}
              name="name"
              register={register}
            />
            <InputField
              label="Arbi Translation"
              type="text"
              placeholder="Enter arbi translation"
              errortext={"Please enter arbi translation"}
              errors={errors}
              name="arbiName"
              register={register}
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

export default AddTicker;
