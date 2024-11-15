import React, { useState } from "react";
import { Image } from "@nextui-org/react";
import { Logo } from "../../assets";
import { useForm } from "react-hook-form";
import InputField from "../../components/general/InputField";
import ButtonComponent from "../../components/general/ButtonComponent";

const ForgotPassword = () => {
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
    <div className="forgotpassword-page  h-[100vh] w-full ">
      <div className="container">
        <div className="container  mx-auto py-20 px-2.5 sm:px-0 h-[100vh] w-full flex  justify-center items-center">
          <div className="w-[360px] max-w-[750px] min- mx-auto ">
            <div className="logo-area flex flex-wrap justify-center mb-24">
              <Image src={Logo} alt={Logo} className="w-full" />
            </div>

            <div className="form-area">
              <h1 className="text-center text-3xl sm:text-4xl font-normal mb-7">
                Forgot Password
              </h1>
              <p className="text-center text-md">
                Enter your email address and we will send you a link reset your
                password.
              </p>
              <form
                className="grid grid-col-1 gap-6 my-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <InputField
                  label="Your Email"
                  type="email"
                  isInvalid={isInvalid}
                  isRequired={true}
                  placeholder="Enter Your Email Address"
                  errors={errors}
                  errortext="Email Not Valid"
                  name="email"
                  register={register}
                />
                <div className="w-full md:w-3/6 mx-auto">
                  <ButtonComponent text="Reset Password" loading={loading} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
