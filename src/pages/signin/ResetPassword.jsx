import { Image } from "@nextui-org/react";
import React, { useState } from "react";
import { Logo } from "../../assets";
import InputField from "../../components/general/InputField";
import ButtonComponent from "../../components/general/ButtonComponent";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="reset-password-page  h-[100vh] w-full ">
      <div className="container">
        <div className="container  mx-auto py-20 px-2.5 sm:px-0 h-[100vh] w-full flex  justify-center items-center">
          <div className="w-[360px] max-w-[750px] min- mx-auto ">
            <div className="logo-area flex flex-wrap justify-center mb-24">
              <Image src={Logo} alt={Logo} className="w-full" />
            </div>

            <div className="form-area">
              <h1 className="text-center text-3xl sm:text-4xl font-normal mb-7">
                Reset Password
              </h1>

              <form
                className="grid grid-col-1 gap-6 my-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <InputField
                  label="New Password"
                  type="password"
                  isInvalid={isInvalid}
                  isRequired={true}
                  placeholder="Enter Password"
                  errors={errors}
                  errortext="Password Is Required"
                  name="password"
                  register={register}
                />
                <InputField
                  label="Confirm Password"
                  type="password"
                  isInvalid={isInvalid}
                  isRequired={true}
                  placeholder="Enter Password"
                  errors={errors}
                  errortext="Confirm Pasword Is Required"
                  name="confirmpassword"
                  register={register}
                />
                <div className="w-full md:w-3/6 mx-auto">
                  <ButtonComponent
                    type={"submit"}
                    text="Save"
                    loading={loading}
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

export default ResetPassword;
