import React, { useEffect, useState } from "react";
import { useQuery } from "../../../hooks/queryParam";
import { API } from "../../../api";
import { errorToast, successToast } from "../../../hooks/useToast";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../../components/general/ButtonComponent";
import InfoCard from "../../../components/general/InfoCard";

const EditReviews = () => {
  const query = useQuery();
  const id = query.get("id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);

  const [review, setReview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const getData = async () => {
    try {
      const response = await API.getSingleReview(id);
      setReview(response?.data?.data);
    } catch (error) {
      errorToast(error, "Failed to load data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    if (!data?.adminReply) {
      delete data?.adminReply;
    }

    try {
      const response = await API.updateProductReview(id, {
        adminReply: data?.adminReply,
        isApproved: data?.isApproved === "true" ? true : false,
      });

      successToast(response?.data?.message, "Updated");
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleCancle = () => {
    navigate(-1);
  };
  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Review"}
        previous={"Dashboard"}
        currentpage={"Edit Review"}
      />

      <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        {review && (
          <div className="page-comp bg-white shadow-md mt-10 rounded-xl px-8 py-8">
            <div className="grid grid-col-1 sm:grid-cols-3 gap-4 mt-4">
              <InfoCard title="User Name" value={review?.userName} />
              <InfoCard title="Stars given" value={review?.stars} />
              <InfoCard title="Date" value={review?.date} />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
              <InfoCard title="Product Name" value={review?.name} />
              <InfoCard title="Product Price" value={review?.productPrice} />
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-4 items-center ">
              <div className="image-wrapper w-full sm:w-[20%]">
                <img
                  src={review?.imageUrl}
                  alt="image"
                  width={200}
                  height={200}
                  className="max-w-[300px] w-full rounded-md"
                />
              </div>
              <div className="content-wrapper w-full sm:w-[80%]">
                <InfoCard title="User Review" value={review?.userReview} />
              </div>
            </div>
            <div className="grid grid-col-1 sm:grid-cols-3 gap-4 mt-4 items-center  w-full  ">
              <div className="text-area col-span-2">
                <InputField
                  label="Give A reply"
                  type="textarea"
                  placeholder="Place type for reply"
                  errors={errors}
                  name="adminReply"
                  register={register}
                  defaultValue={review?.adminReply}
                />
              </div>
              <InputField
                label="Approve"
                type="select"
                placeholder="Place type for reply"
                options={[true, false]}
                errors={errors}
                name="isApproved"
                register={register}
                text={["approve", " decline"]}
                defaultValue={review?.isApproved}
              />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4  w-full  "></div>
          </div>
        )}

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
      </form>
    </div>
  );
};

export default EditReviews;
