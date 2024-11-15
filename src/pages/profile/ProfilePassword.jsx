import { Image } from "@nextui-org/react";
import React, { useState } from "react";
import { Logo } from "../../assets";
import InputField from "../../components/general/InputField";
import ButtonComponent from "../../components/general/ButtonComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePassword } from "../../validations/account";
import { API } from "../../api";
import { errorToast, successToast } from "../../hooks/useToast";

const ProfilePassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(changePassword) });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await API.changePassword({
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
      });
      reset();
      setLoading(false);
      successToast("Password Changed Successfully");
    } catch (error) {
      errorToast(error, "Can not Change Password");
      setLoading(false);
    }
  };
  return (
    <div className="page-area mt-10 h-full">
      <div className="">
        <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
          <div className=" ">
            <div className="form-area">
              <h1 className="text-left text-3xl sm:text-4xl font-normal mb-7">
                Change Password
              </h1>

              <form
                className="grid grid-col-1 gap-6 my-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <InputField
                  label="Old Password"
                  type="password"
                  placeholder="Enter your current Password"
                  errortext="Current password is Required"
                  errors={errors}
                  name="oldPassword"
                  register={register}
                />
                <InputField
                  label="New Password"
                  type="password"
                  placeholder="Enter Your New Password"
                  errortext="New Password Is Required"
                  errors={errors}
                  name="password"
                  register={register}
                />
                <InputField
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm Your New Password"
                  errortext={errors?.newPassword?.message}
                  errors={errors}
                  name="newPassword"
                  register={register}
                />
                <div className="w-full md:w-1/4 mt-4">
                  <ButtonComponent
                    type={"submit"}
                    text="Change"
                    loading={loading}
                    isActive={true}

                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePassword;
