import React, { useEffect, useState } from 'react';
import Header from '../../../components/dashboard/Header';
import InputField from '../../../components/general/InputField';
import { useForm } from 'react-hook-form';
import ButtonComponent from '../../../components/general/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../api';
import { errorToast, successToast } from '../../../hooks/useToast';
import { yupResolver } from '@hookform/resolvers/yup';
import Editor from '../../../components/general/Editor';
import { Button } from '@nextui-org/react';
import VariationInput from '../../../components/general/VariationInput';
import CategoryDropdown from './VariationDropdown';
import IterateUpload from './IterateUpload';
import { productScehma } from '../../../validations/productValidations';
import Tiptap from '../../../components/general/TipEditor';
import UploadVideo from './UploadVideo';
import ColorPickerBttn from '../../../components/general/ColorPickerBttn';

const AddProduct = () => {
  const [variationId, setVariationId] = useState(0);
  const [variations, setVariations] = useState([
    {
      id: variationId,
      categoryId: '',
      price: null,
      salePrice: null,
      weight: '',
      imageUrl: '',
      gallery: [],
    },
  ]);
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    register,
  } = useForm({ resolver: yupResolver(productScehma) });

  const [categories, setCategories] = useState(null);

  const getCategories = async () => {
    try {
      const response = await API.getAllCategories();
      const data = response?.data?.data;
      const filterdata = data?.filter((item) => item?.name !== 'All Products' && !item?.customProduct);
      setCategories(filterdata);
    } catch (error) {
      errorToast(error, 'Can not fetch categories');
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const [video, setVideo] = useState(null);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updatedVariations = await Promise.all(
        variations.map(async (variation) => {
          let formData = new FormData();
          let updatedVariation = { ...variation };

          if (variation.imageUrl) {
            formData.append('images', variation.imageUrl[0]);
            const response = await API.uploadImages(formData);
            const uploadedUrls = response?.data?.data;

            updatedVariation.imageUrl = uploadedUrls[0];
          }

          if (variation.gallery.length > 0) {
            let galleryUrls = [];

            for (const image of variation.gallery) {
              let galleryFormData = new FormData();
              galleryFormData.append('images', image);

              const galleryResponse = await API.uploadImages(galleryFormData);
              const galleryUploadedUrls = galleryResponse?.data?.data;
              galleryUrls.push(galleryUploadedUrls[0]);
            }

            updatedVariation.gallery = galleryUrls;
          }

          updatedVariation.price = parseFloat(updatedVariation.price);
          updatedVariation.salePrice = parseFloat(updatedVariation.salePrice);
          updatedVariation.weight = parseFloat(updatedVariation.weight);
          delete updatedVariation.id;

          return updatedVariation;
        })
      );

      let videoUrl;

      if (video) {
        const formDataVideo = new FormData();
        formDataVideo.append('video', video);

        const response = await API.uploadVideo(formDataVideo);

        videoUrl = response?.data?.data;
      }

      let payload;

      if (videoUrl) {
        payload = {
          ...data,
          videoUrl: videoUrl,
          productVariation: updatedVariations,
        };
      } else {
        payload = {
          ...data,
          productVariation: updatedVariations,
        };
      }
      if (color) {
        payload.color = color;
      }

      const response = await API.uploadProduct(payload);
      setLoading(false);
      successToast(response?.data?.message);
      navigate('/dashboard/store/products');
    } catch (error) {
      setLoading(false);

      errorToast(error, 'Can not upload product');
      console.error('Error uploading images:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleAddVariation = () => {
    setVariationId(variationId + 1);
    setVariations((prevVariations) => [
      ...prevVariations,
      {
        id: variationId + 1,
        categoryId: '',
        price: '',
        salePrice: '',
        weight: '',
        imageUrl: '',
        gallery: [],
      },
    ]);
  };

  const handleRemoveVariation = (id) => {
    const updatedVariations = variations.filter((variation) => variation.id !== id);
    setVariations(updatedVariations);
  };

  const handleCategoryChange = (event, index) => {
    const { value } = event.target;
    const updatedVariations = [...variations];
    updatedVariations[index].categoryId = value;
    setVariations(updatedVariations);
  };

  const handleInputChange = (index, field, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index][field] = value;
    setVariations(updatedVariations);
  };

  return (
    <div className="page-area mt-10">
      <Header pagetitle={'Exams'} previous={'Dashboard'} currentpage={'Add Exams'} />
      <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
          <InputField
            label="Title"
            type="text"
            placeholder="Product Title"
            errors={errors}
            name="name"
            register={register}
          />
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
            <InputField
              label="Slug"
              type="text"
              placeholder="slug of product"
              errors={errors}
              name="slug"
              register={register}
            />
          </div>
          <div className="grid grid-col-1  gap-4  mt-8 mb-4">
            <Editor
              label="Short Description"
              errors={errors}
              name="shortDescription"
              register={register}
              setValue={setValue}
            />
          </div>
          <div className="grid grid-col-1  gap-4  mt-8 mb-4">
            <Editor
              label="Long Description"
              errors={errors}
              name="longDescription"
              register={register}
              setValue={setValue}
            />
          </div>
          <div className="grid grid-col-1  gap-4  mt-8 mb-4">
            <Editor label="Ingredients" errors={errors} name="ingredients" register={register} setValue={setValue} />
          </div>
          <div className="grid grid-col-1  gap-4  mt-8 mb-4">
            <UploadVideo setVideo={setVideo} />
          </div>
          <ColorPickerBttn setColor={setColor} color={color} />

          {variations.map((variation, index) => (
            <div
              key={`variation-${variation.id}`}
              className="w-full  p-6 rounded-[20px] bg-[#FAF1DC]/40  flex flex-wrap flex-col gap-6 mb-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <VariationInput
                  type={'number'}
                  placeholder={'Enter sale price of your product'}
                  value={variation.price}
                  handleInputChange={handleInputChange}
                  name={'price'}
                  index={index}
                  label={'Price'}
                />
                <VariationInput
                  type={'number'}
                  placeholder={'Enter price of your product'}
                  value={variation.salePrice}
                  handleInputChange={handleInputChange}
                  name={'salePrice'}
                  index={index}
                  label={'Sale Price'}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <VariationInput
                  type={'number'}
                  placeholder="Enter weight of your product"
                  value={variation.weight}
                  handleInputChange={handleInputChange}
                  name={'weight'}
                  index={index}
                  label={'Weight in grams'}
                />

                <CategoryDropdown categories={categories} onChange={(e) => handleCategoryChange(e, index)} />
              </div>
              <div className="w-full">
                <IterateUpload
                  heading={'Featured Image'}
                  isSingle={true}
                  images={variation.imageUrl}
                  setImages={(newImages) => handleInputChange(index, 'imageUrl', newImages)}
                />
              </div>
              <div className="w-full">
                <IterateUpload
                  heading={'Gallery'}
                  images={variation.gallery}
                  setImages={(newImages) => handleInputChange(index, 'gallery', newImages)}
                />
              </div>

              {index !== 0 && (
                <Button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded w-fit float-right"
                  onClick={() => handleRemoveVariation(variation.id)}
                >
                  Remove Variation
                </Button>
              )}
            </div>
          ))}

          <div className="grid grid-col-1 gap-4 mt-8 mb-4">
            <div className="flex justify-start items-center gap-4">
              <p>Add Variations</p>
              <div
                className="w-8 h-8 cursor-pointer hover:bg-themePrimary-0 transition-all rounded-full bg-themeBtn-0 flex justify-center items-center"
                onClick={handleAddVariation}
              >
                <p className="text-2xl mb-[4px] text-white">+</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 mt-4">
            <div className="flex gap-3">
              <ButtonComponent type="submit" text="Save" loading={loading} isActive={true} />
              <ButtonComponent text="Cancel" isActive={true} btnclass={'bg-red-500'} onClick={handleCancel} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
