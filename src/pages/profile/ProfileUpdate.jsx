import React, { useEffect, useState } from "react";
import Header from "../../components/dashboard/Header";
import InputField from "../../components/general/InputField";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../hooks/queryParam";
import { API } from "../../api";
import { errorToast, successToast } from "../../hooks/useToast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../validations/account";
import { setUser } from "../../store/slices/userSlice";

const EditExam = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(updateProfile) });
  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await API.updateProfile( formData);
      dispatch(setUser(response?.data?.data));
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Can not update your profile");
    }
  };

  const handleCancle = () => {
    navigate(-1);
  };

  return (
    <div className="page-area mt-10">
      <Header pagetitle={"Edit"} previous={"Profile"} />

      {data && (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
              <InputField
                label="First Name"
                type="text"
                isInvalid={isInvalid}
                isRequired={true}
                defaultValue={data?.firstName}
                placeholder="First Name"
                errortext="Exam Name Is Required"
                errors={errors}
                name="firstName"
                register={register}
              />

              <InputField
                label="Last Name"
                type="text"
                isInvalid={isInvalid}
                isRequired={true}
                defaultValue={data?.lastName}
                placeholder="Last Name"
                errortext="Last Name is Required"
                errors={errors}
                name="lastName"
                register={register}
              />
            </div>

            <InputField
              label="Email"
              type="text"
              isInvalid={isInvalid}
              isRequired={true}
              defaultValue={data?.email}
              placeholder="Email"
              errortext="Email Is Required"
              errors={errors}
              name="email"
              register={register}
            />
            <div className="w-full md:w-1/4 mt-4">
              <div className="flex gap-3">
                <ButtonComponent
                  text="Save"
                  type={"submit"}
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

export default EditExam;
