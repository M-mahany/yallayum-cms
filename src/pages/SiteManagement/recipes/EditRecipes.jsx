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
import { useQuery } from "../../../hooks/queryParam";
import Loader from "../../../components/general/Loader";
import GeneralImageUpload from "../../../components/general/GeneralImageUpload";

const EditRecipes = () => {
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState(true);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  let query = useQuery();
  let id = query.get("id");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addBlogsSchema) });

  const [data, setData] = useState(null);
  const getData = async () => {
    try {
      const response = await API.getSingleRecipe(id);
      
      setData(response?.data?.data);
      setValue("short_description", response?.data?.data?.shortDescription);
      setValue("description", response?.data?.data?.description);
      setPageData(false);
    } catch (error) {
      errorToast(error, "Can not fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      let response;
      if (data?.imageUrl instanceof File) {
        setLoading(true);
        const formdata = new FormData();
        formdata.append("images", image);
        const upload = await API.uploadImages(formdata);
        response = await API.updateRecipe(id, {
          ...data,
          imageUrl: upload?.data?.data[0],
        });
      } else {
        response = await API.updateRecipe(id, {
          by: data?.by,
          description: data?.description,
          name: data?.name,
          short_description: data?.short_description,
          slug: data?.slug,
        });
      }
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Cannot add recipe");
    }
  };

  const handleCancle = () => {
    navigate(-1);
  };

  const handleSlug = () => {
    const title = getValues("name");
    const slug = generateSlug(title);
    setValue("slug", slug);
  };

  useEffect(() => {
    setValue("imageUrl", data?.imageUrl);
  }, [data]);

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Management"}
        previous={"Dashboard"}
        currentpage={"Edit Recipes"}
      />
      {data ? (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <div className="grid grid-col-1  gap-4  ">
              <InputField
                label="Title"
                type="text"
                placeholder="Title of your Blog"
                defaultValue={data?.name}
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
                defaultValue={data?.slug}
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
                defaultValue={data?.by}
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
                defaultImage={data?.imageUrl}
              />
            </div>
            <div className="grid grid-col-1   gap-4  mt-8 mb-4">
              <Editor
                label="Short Discription"
                defaultValue={data?.shortDescription}
                errors={errors}
                name="short_description"
                register={register}
                setValue={setValue}
              />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2  grid-blog gap-4    mb-4">
              <InputField
                label="Slug"
                type="text"
                defaultValue={data?.slug}
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
            </div>
            <div className="grid grid-col-1   gap-4  mt-8 mb-4">
              <Editor
                label="Description"
                defaultValue={data?.description}
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
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EditRecipes;
