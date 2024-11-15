import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../hooks/queryParam";
import InputField from "../../../components/general/InputField";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { API } from "../../../api";
import { errorToast, successToast } from "../../../hooks/useToast";
import { yupResolver } from "@hookform/resolvers/yup";
import { editPromoSchema } from "../../../validations/promoValidations";

const EditPromo = () => {
  const [loading, setLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  let query = useQuery();
  let id = query.get("id");
  let promoData = JSON.parse(query.get("object"));
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm(
    { resolver: yupResolver(editPromoSchema) },
    {
      defaultValues: {
        name: promoData?.name,
        customProduct: promoData?.customProduct,
        imageUrl: promoData?.imageUrl,
      },
    }
  );

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await API.updatePromo(promoData?.id, formData);
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Can not update exam data");
    }
  };

  const handleCancle = () => {
    navigate(-1);
  };

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Edit"}
        previous={"Dashboard"}
        currentpage={"Edit Promo"}
      />

      {promoData && (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
              <InputField
                label="Category Name"
                type="text"
                isInvalid={isInvalid}
                isRequired={true}
                defaultValue={promoData?.name}
                placeholder="Category Name"
                errortext="Category Name Is Required"
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
                defaultValue={promoData?.limit}
                register={register}
              />
              <InputField
                label="Discount in %"
                type="number"
                placeholder="percentage"
                errortext={"Please specify discount in percentage"}
                errors={errors}
                name="percentage"
                defaultValue={promoData?.percentage}
                register={register}
              />

              <InputField
                label="Currently Active?"
                type="select"
                options={[true, false]}
                placeholder="Status"
                errortext={"Is this promo active ?"}
                errors={errors}
                defaultValue={promoData?.isActive}
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
                defaultValue={promoData?.discountAd}
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
      )}
    </div>
  );
};

export default EditPromo;
