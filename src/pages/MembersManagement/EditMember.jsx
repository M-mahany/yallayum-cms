import React, { useEffect, useState } from "react";
import Header from "../../components/dashboard/Header";
import InputField from "../../components/general/InputField";
import ButtonComponent from "../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Editmember } from "../../validations/addmember";
import { API } from "../../api";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../../hooks/useToast";
import { useQuery } from "../../hooks/queryParam";
import Loader from "../../components/general/Loader";
import InfoCard from "../../components/general/InfoCard";

const EditMember = () => {
   const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState(true);
  const navigate = useNavigate();
  let query = useQuery();
  let id = query.get("id");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Editmember) });

  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await API.getSingleUsers(id);
      setData(response?.data?.data);
      setPageData(false);
    } catch (error) {
      errorToast(error, "Can not fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await API.updateUser(id, formData);
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
        pagetitle={"Members"}
        previous={"Dashboard"}
        currentpage={"Edit Members"}
      />
      {data ? (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8 flex flex-col gap-5">
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
              <InfoCard title="Name" value={data?.name} />
              <InfoCard title="Email" value={data?.email} />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
              <InfoCard title="Contact Number" value={data?.phoneNumber} />
              <InfoCard title="Email" value={data?.date} />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-3 gap-4  ">
              <InputField
                label="Status"
                type="select"
                options={[true, false]}
                placeholder="Status"
                defaultValue={data?.isActive ? true : false}
                errors={errors}
                name="isActive"
                register={register}
                text = {["Active", "Blocked"]}
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
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EditMember;
