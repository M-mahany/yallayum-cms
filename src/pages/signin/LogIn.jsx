import React, { useState } from 'react';
import InputField from '../../components/general/InputField';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ButtonComponent from '../../components/general/ButtonComponent';
import { API } from '../../api';
import { errorToast, successToast } from '../../hooks/useToast';
import { setCookie } from '../../hooks/useCookies';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../validations/login';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import { blackLogo } from '../../assets';

const LogIn = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await API.adminLogin(data);
      successToast(response?.data?.message);
      setLoading(false);
      setCookie('token', response?.data?.data?.token);
      dispatch(setUser(response?.data?.data));
      navigate('/dashboard/');
    } catch (error) {
      setLoading(false);
      errorToast(error, 'Can not log In at the moment');
    }
  };

  return (
    <div className="login-page h-[100vh] w-full flex  justify-center items-center  ">
      <div className="max-w-[650px] rounded-[25px] bg-themeSecondry-0 h-fit mx-auto py-20 px-2.5 sm:px-0  w-full ">
        <div className="w-[360px] max-w-[750px]   mx-auto ">
          <div className="logo-area flex flex-wrap justify-center mb-8">
            <img src={blackLogo} alt={blackLogo} className="w-full" />
          </div>

          <div className="form-area">
            <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label="Email"
                type="text"
                isInvalid={isInvalid}
                isRequired={true}
                placeholder="Enter email"
                errors={errors}
                errortext="Please Enter email"
                name="email"
                register={register}
              />
              <InputField
                label="Password"
                type="password"
                isInvalid={isInvalid}
                isRequired={true}
                placeholder="Enter Password"
                errors={errors}
                errortext="password is required"
                name="password"
                register={register}
              />
              <div className="w-full md:w-3/6 mx-auto">
                <ButtonComponent type={'submit'} text="Login" loading={loading} isActive={true} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
