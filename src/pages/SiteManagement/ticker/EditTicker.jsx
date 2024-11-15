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
import { tickerSchema } from "../../../validations/tickerValidation";



const EditTicker = () => {
  const [loading, setLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  let query = useQuery();
  let id = query.get("id");
  let tickerData = JSON.parse(query.get("object"));
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm(
    { resolver: yupResolver(tickerSchema) },
    {
      defaultValues: {
        name: tickerData?.name,
        arbiName: tickerData?.arbiName,
      },
    }
  );

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await API.updateTicker(tickerData?.id, formData);
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
        currentpage={"Edit Tick"}
      />

      {tickerData && (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
              <InputField
                defaultValue={tickerData?.name}
                label="Tick"
                type="text"
                errortext={"Please Enter tick"}
                placeholder="Enter tick"
                errors={errors}
                name="name"
                register={register}
              />
              <InputField
                defaultValue={tickerData?.arbiName}
                label="Arbi Translation"
                type="text"
                errortext={"Please Enter arbi translation"}
                placeholder="Enter tick"
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
      )}
    </div>
  );
};

export default EditTicker;
