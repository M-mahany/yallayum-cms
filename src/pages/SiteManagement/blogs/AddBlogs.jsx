import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorToast, successToast } from "../../../hooks/useToast";
import Editor from "../../../components/general/Editor";
import { addBlogsSchema } from "../../../validations/blogs";
import { Button } from "@nextui-org/react";
import { generateSlug } from "../../../utils/slug";
import GeneralImageUpload from "../../../components/general/GeneralImageUpload";

const AddBlogs = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addBlogsSchema) });

  const onSubmit = async (data) => {
    try {
      if (image) {
        setLoading(true);
        const formdata = new FormData();
        formdata.append("images", image);
        const upload = await API.uploadImages(formdata);

        const response = await API.createBlogs({
          ...data,
          imageUrl: upload?.data?.data[0],
        });
        successToast(response?.data?.message);
        setLoading(false);
        navigate(-1);
      }
    } catch (error) {
      setLoading(false);
      errorToast(error, "Cannot add blog");
    }
  };
  const handleCancle = () => {
    navigate(-1);
  };

  const handleSlug = () => {
    const title = getValues("name");
    setValue("slug", generateSlug(title));
  };

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Blogs"}
        previous={"Dashboard"}
        currentpage={"Add Blogs"}
      />
      <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
          <div className="grid grid-col-1  gap-4  ">
            <InputField
              label="Title"
              type="text"
              placeholder="Title of your blog"
              errors={errors}
              name="name"
              register={register}
            />
          </div>

          <div className="grid grid-col-1 sm:grid-cols-3  gap-4  items-end   mb-4">
            <InputField
              label="Slug"
              type="text"
              placeholder="generate or enter your slug"
              errors={errors}
              name="slug"
              register={register}
            />

            <Button
              onClick={handleSlug}
              className="bg-themeBtn-0 text-white max-w-[100px]   "
            >
              Generate
            </Button>
            <InputField
              label="By"
              type="text"
              placeholder="Yallayum"
              errors={errors}
              name="by"
              register={register}
            />
          </div>
          <div className="grid grid-col-1   gap-4  mt-8 mb-4">
            <GeneralImageUpload
              heading={"Upload Image"}
              image={image}
              setImage={setImage}
              name="imageUrl"
              errors={errors}
              register={register}
              setValue={setValue}
            />
          </div>
          <div className="grid grid-col-1   gap-4  mt-8 mb-4">
            <Editor
              label="Short Discription"
              errors={errors}
              name="short_description"
              register={register}
              setValue={setValue}
            />
          </div>

          <div className="grid grid-col-1   gap-4  mt-8 mb-4">
            <Editor
              label="Description"
              errors={errors}
              name="description"
              register={register}
              setValue={setValue}
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

export default AddBlogs;
