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
import { useQuery } from '../../../hooks/queryParam';
import IterateUpdate from './IterateUpdate';
import { productScehma } from '../../../validations/productValidations';
import UploadVideo from './UploadVideo';
import IngredientsInput from '../../../components/general/IngredientsInput';
import ColorPickerBttn from '../../../components/general/ColorPickerBttn';

const EditProducts = () => {
  let query = useQuery();
  let id = query.get('id');
  const [product, setProduct] = useState(null);
  const [color, setColor] = useState(null);

  const [variations, setVariations] = useState([
    {
      id: '',
      categoryId: '',
      price: '',
      salePrice: '',
      weight: '',
      imageUrl: '',
      gallery: [],
    },
  ]);

  const [ingredientsData, setIngredientsData] = useState([
    {
      id: '',
      imageUrl: '',
      head: '',
      paragh: '',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    register,
  } = useForm(
    { resolver: yupResolver(productScehma) },
    {
      defaultValues: {
        name: product?.name || '',
        slug: product?.slug || '',
        shortDescription: product?.shortDescription || '',
        longDescription: product?.longDescription || '',
        ingredients: product?.ingredients || '',
      },
    }
  );

  useEffect(() => {
    if (product) {
      setValue('shortDescription', product?.shortDescription);
      setValue('name', product?.name);
      setValue('slug', product?.slug);
      setValue('longDescription', product?.longDescription);
      setValue('ingredients', product?.ingredients);
      setColor(product?.color ?? null);
    }
  }, [product]);

  const [categories, setCategories] = useState(null);

  const getData = async () => {
    try {
      let response = await API.getAllCategories();
      const data = response?.data?.data;
      const filterdata = data?.filter((item) => item?.name !== 'All Products' && !item?.customProduct);
      setCategories(filterdata);

      response = await API.getSingleProduct(id);
      setProduct(response?.data?.data);
      setVariations(response?.data?.data?.productVariation);
      setIngredientsData(response?.data?.data?.ingredientsData);
    } catch (error) {
      errorToast(error, 'Can not fetch categories');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [video, setVideo] = useState(product?.videoUrl);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updatedVariations = await Promise.all(
        variations.map(async (variation) => {
          let updatedVariation = { ...variation };

          if (typeof updatedVariation.imageUrl === 'string' && updatedVariation.imageUrl.includes('https')) {
            updatedVariation.imageUrl = updatedVariation.imageUrl.substring(updatedVariation.imageUrl.indexOf('https'));
          } else if (updatedVariation.imageUrl[0] instanceof File) {
            let formData = new FormData();
            formData.append('images', updatedVariation.imageUrl[0]);
            const response = await API.uploadImages(formData);
            const uploadedUrl = response?.data?.data[0];
            updatedVariation.imageUrl = uploadedUrl;
          }
          const updatedGallery = [];
          for (const image of updatedVariation.gallery) {
            if (typeof image === 'string' && image.includes('https')) {
              updatedGallery.push(image.substring(image.indexOf('https')));
            } else if (image instanceof File) {
              let formData = new FormData();
              formData.append('images', image);
              const response = await API.uploadImages(formData);
              const uploadedUrl = response?.data?.data[0];
              updatedGallery.push(uploadedUrl);
            }
          }
          updatedVariation.gallery = updatedGallery;

          updatedVariation.price = parseFloat(updatedVariation.price);
          updatedVariation.salePrice = parseFloat(updatedVariation.salePrice);
          updatedVariation.weight = parseFloat(updatedVariation.weight);

          return updatedVariation;
        })
      );

      const updatedIngredientsData = await Promise.all(
        ingredientsData.map(async (variation) => {
          let updatedVariation = { ...variation };

          if (typeof updatedVariation.imageUrl === 'string' && updatedVariation.imageUrl.includes('https')) {
            updatedVariation.imageUrl = updatedVariation.imageUrl.substring(updatedVariation.imageUrl.indexOf('https'));
          } else if (updatedVariation.imageUrl[0] instanceof File) {
            let formData = new FormData();
            formData.append('images', updatedVariation.imageUrl[0]);
            const response = await API.uploadImages(formData);
            const uploadedUrl = response?.data?.data[0];
            updatedVariation.imageUrl = uploadedUrl;
          }

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
          ingredientsData: updatedIngredientsData,
        };
      } else {
        payload = {
          ...data,
          videoUrl: product?.videoUrl || null,
          productVariation: updatedVariations,
          ingredientsData: updatedIngredientsData,
        };
      }
      if (color) {
        payload.color = color;
      }

      const response = await API.updateProduct(id, payload);
      setLoading(false);
      successToast(response?.data?.message);
      navigate('/dashboard/store/products');
    } catch (error) {
      setLoading(false);
      errorToast(error, 'Cannot upload product');
      console.error('Error uploading images:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleAddVariation = () => {
    setVariations((prevVariations) => [
      ...prevVariations,
      {
        id: '',
        categoryId: '',
        price: '',
        salePrice: '',
        weight: '',
        imageUrl: '',
        gallery: [],
      },
    ]);
  };
  const handleAddingredeintsData = () => {
    setIngredientsData((prevVariations) => [
      ...prevVariations,
      {
        id: '',
        imageUrl: '',
        head: '',
        paragh: '',
      },
    ]);
  };

  const handleRemoveVariation = (id) => {
    const updatedVariations = variations.filter((variation) => variation.id !== id);
    setVariations(updatedVariations);
  };
  const handleRemoveIngredients = (id) => {
    const updatedVariations = ingredientsData.filter((variation) => variation.id !== id);
    setIngredientsData(updatedVariations);
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
  const handleInputChangeIngredients = (index, field, value) => {
    const updatedVariations = [...ingredientsData];
    updatedVariations[index][field] = value;
    setIngredientsData(updatedVariations);
  };

  return (
    <div className="page-area mt-10">
      <Header pagetitle={'Exams'} previous={'Dashboard'} currentpage={'Add Exams'} />
      {product && (
        <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <InputField
              label="Title"
              type="text"
              placeholder="Product Title"
              errors={errors}
              name="name"
              register={register}
              defaultValue={product?.name}
            />
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
              <InputField
                label="Slug"
                type="text"
                placeholder="slug of product"
                errors={errors}
                name="slug"
                register={register}
                defaultValue={product?.slug}
              />
            </div>
            <div className="grid grid-col-1  gap-4  mt-8 mb-4">
              <Editor
                label="Short Description"
                errors={errors}
                name="shortDescription"
                register={register}
                setValue={setValue}
                defaultValue={product?.shortDescription}
              />
            </div>
            <div className="grid grid-col-1  gap-4  mt-8 mb-4">
              <Editor
                label="Long Description"
                errors={errors}
                name="longDescription"
                register={register}
                setValue={setValue}
                defaultValue={product?.longDescription}
              />
            </div>
            <div className="grid grid-col-1  gap-4  mt-8 mb-4">
              <Editor
                label="Ingredients"
                errors={errors}
                name="ingredients"
                register={register}
                setValue={setValue}
                defaultValue={product?.ingredients}
              />
            </div>

            <h2 className="text-2xl font-bold py-4">Ingredients List </h2>

            {ingredientsData && (
              <>
                {ingredientsData.map((variation, index) => (
                  <div
                    key={`variation-${variation.id}`}
                    className="w-full  p-6 rounded-[20px] bg-[#FAF1DC]/40  flex flex-wrap flex-col gap-6 mb-4"
                  >
                    <div className="w-full">
                      <IterateUpdate
                        heading={'Image'}
                        isSingle={true}
                        initialImages={variation.imageUrl ? [variation.imageUrl] : []}
                        onImagesChange={(newImages) => handleInputChangeIngredients(index, 'imageUrl', newImages)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                      <IngredientsInput
                        type={'text'}
                        placeholder={'Enter Heading'}
                        value={variation.head}
                        handleInputChangeIngredients={handleInputChangeIngredients}
                        name={'head'}
                        index={index}
                        label={'Heading'}
                      />
                      <IngredientsInput
                        type={'text'}
                        placeholder={'Enter paragh'}
                        value={variation.paragh}
                        handleInputChangeIngredients={handleInputChangeIngredients}
                        name={'paragh'}
                        index={index}
                        label={'Paragraph'}
                      />
                    </div>

                    {index !== 0 && (
                      <Button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded w-fit float-right"
                        onClick={() => handleRemoveIngredients(variation.id)}
                      >
                        Remove List
                      </Button>
                    )}
                  </div>
                ))}
              </>
            )}

            <div className="grid grid-col-1 gap-4 mt-8 mb-4">
              <div className="flex justify-start items-center gap-4">
                <p>Add List</p>
                <div
                  className="w-8 h-8 cursor-pointer hover:bg-themePrimary-0 transition-all rounded-full bg-themeBtn-0 flex justify-center items-center"
                  onClick={handleAddingredeintsData}
                >
                  <p className="text-2xl mb-[4px] text-white">+</p>
                </div>
              </div>
            </div>

            <UploadVideo setVideo={setVideo} videoUrl={product?.videoUrl} />
            <ColorPickerBttn setColor={setColor} color={color} />

            {variations && (
              <>
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

                      <CategoryDropdown
                        categories={categories}
                        onChange={(e) => handleCategoryChange(e, index)}
                        defaultValue={variation.categoryId}
                      />
                    </div>
                    <div className="w-full">
                      <IterateUpdate
                        heading={'Featured Image'}
                        isSingle={true}
                        initialImages={variation.imageUrl ? [variation.imageUrl] : []}
                        onImagesChange={(newImages) => handleInputChange(index, 'imageUrl', newImages)}
                      />
                    </div>
                    <div className="w-full">
                      <IterateUpdate
                        heading={'Gallery'}
                        isSingle={false}
                        initialImages={variation.gallery ? variation.gallery : []}
                        onImagesChange={(newImages) => handleInputChange(index, 'gallery', newImages)}
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
              </>
            )}

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
      )}
    </div>
  );
};

export default EditProducts;
