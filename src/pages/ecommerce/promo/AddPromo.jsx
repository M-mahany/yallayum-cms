import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorToast, successToast } from "../../../hooks/useToast";

import { addPromoSchema } from "../../../validations/promoValidations";

const AddPromo = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addPromoSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await API.registerPromo(data);
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
        pagetitle={"Promo Code"}
        previous={"Dashboard"}
        currentpage={"Add Promo Code"}
      />
      <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
            <InputField
              label="Promo Code Name"
              type="text"
              errortext={"Please Enter name of Promo Code"}
              placeholder="Promo code"
              errors={errors}
              name="name"
              register={register}
            />
            <InputField
              label="Usage Limit"
              type="number"
              placeholder="limit"
              errortext={"Please usage limit of this promo code"}
              errors={errors}
              name="limit"
              register={register}
            />
            <InputField
              label="Discount in %"
              type="number"
              placeholder="percentage"
              errortext={"Please specify discount in percentage"}
              errors={errors}
              name="percentage"
              register={register}
            />

            <InputField
              label="Currently Active?"
              type="select"
              options={[true, false]}
              placeholder="Status"
              errortext={"Is this promo active ?"}
              errors={errors}
              name="isActive"
              register={register}
            />
            <InputField
              label="Show on website?"
              type="select"
              options={[true, false]}
              placeholder="Status"
              errors={errors}
              name="discountAd"
              errortext={"Do you want to show this on website?"}
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

export default AddPromo;
