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
import {
  AddCategory,
  Category,
  editCategory,
} from "../../../validations/productcategory";
import GeneralImageUpload from "../../../components/general/GeneralImageUpload";

const EditCategory = () => {
  const [loading, setLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  let query = useQuery();
  let id = query.get("id");
  let categoryData = JSON.parse(query.get("object"));
  console.log(categoryData);
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm(
    { resolver: yupResolver(editCategory) },
    {
      defaultValues: {
        name: categoryData?.name,
        customProduct: categoryData?.customProduct,
        imageUrl: categoryData?.imageUrl,
      },
    }
  );

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      let response;
      if (image) {
        const formData = new FormData();
        formData.append("images", image);

        response = await API.uploadImages(formData);
        await API.updateCategory(id, {
          ...formData,
          imageUrl: response?.data?.data[0],
        });
      } else {
        response = await API.updateCategory(id, {
          name: formData?.name,
          customProduct: formData?.customProduct,
        });
      }
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

  useEffect(() => {
    setValue("imageUrl", categoryData?.imageUrl);
  }, [categoryData]);

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Edit"}
        previous={"Dashboard"}
        currentpage={"Edit Category"}
      />

      {categoryData && (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
              <InputField
                label="Category Name"
                type="text"
                isInvalid={isInvalid}
                isRequired={true}
                defaultValue={categoryData?.name}
                placeholder="Category Name"
                errortext="Category Name Is Required"
                errors={errors}
                name="name"
                register={register}
              />
              <InputField
                label="Custom Product"
                type="select"
                options={[true, false]}
                isInvalid={isInvalid}
                placeholder="Status"
                defaultValue={categoryData?.customProduct}
                isRequired={true}
                errortext="Status Is Required"
                errors={errors}
                name="customProduct"
                register={register}
              />
            </div>
            <div className="w-full">
              <GeneralImageUpload
                heading={"Upload Image"}
                image={image}
                setImage={setImage}
                name="imageUrl"
                errors={errors}
                register={register}
                defaultImage={categoryData?.imageUrl}
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
      )}
    </div>
  );
};

export default EditCategory;
