import React, { useState } from 'react';
import Header from '../../../components/dashboard/Header';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../../hooks/queryParam';
import InputField from '../../../components/general/InputField';
import ButtonComponent from '../../../components/general/ButtonComponent';
import { API } from '../../../api';
import { errorToast, successToast } from '../../../hooks/useToast';
import { yupResolver } from '@hookform/resolvers/yup';
import { editPromoSchema } from '../../../validations/promoValidations';
import { Checkbox } from '@nextui-org/react';

const EditPromo = () => {
  const [loading, setLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  let query = useQuery();
  let id = query.get('id');
  let promoData = JSON.parse(query.get('object'));
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm(
    { resolver: yupResolver(editPromoSchema) },
    {
      defaultValues: {
        name: promoData?.name,
        customProduct: promoData?.customProduct,
        imageUrl: promoData?.imageUrl,
      },
    }
  );

  const onSubmit = async (formData) => {
    setLoading(true);
    if (formData?.type === 'PERCENTAGE') {
      delete formData?.fixed;
    }
    if (formData?.type === 'FIXED') {
      delete formData?.percentage;
    }
    try {
      const response = await API.updatePromo(promoData?.id, formData);
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, 'Can not update exam data');
    }
  };

  const handleCancle = () => {
    navigate(-1);
  };

  return (
    <div className="page-area mt-10">
      <Header pagetitle={'Edit'} previous={'Dashboard'} currentpage={'Edit Promo'} />

      {promoData && (
        <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <div className="relative flex justify-center items-end px-4 py-2 rounded-xl border-2 w-[120px] mb-4">
              <span className="absolute top-[-13px] left-2 block text-slate-400 text-xs font-bold bg-white p-1">
                Current Usage
              </span>
              <p className="text-slate-700 text-2xl">
                {promoData?.currentUsage ?? 0} <span className="text-slate-400">/</span>
                <span className="text-slate-400 text-lg">{promoData?.limit + promoData?.currentUsage ?? 0}</span>
              </p>
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
              <InputField
                label="Category Name"
                type="text"
                isInvalid={isInvalid}
                isRequired={true}
                defaultValue={promoData?.name}
                placeholder="Category Name"
                errortext="Category Name Is Required"
                errors={errors}
                name="name"
                register={register}
              />
              <InputField
                label="Usage Limit"
                type="number"
                placeholder="limit"
                errortext={'Please usage limit of this promo code'}
                errors={errors}
                name="limit"
                defaultValue={promoData?.limit}
                register={register}
              />
              <InputField
                label="Promo Type"
                type="select"
                options={['PERCENTAGE', 'FIXED']}
                placeholder="percentage"
                errortext={'Please choose discount type'}
                errors={errors}
                name="type"
                defaultValue={promoData?.type}
                register={register}
              />
              {(watch('type') === 'PERCENTAGE' || (promoData?.type === 'PERCENTAGE' && !watch('type'))) && (
                <InputField
                  label="Discount in %"
                  type="number"
                  placeholder="percentage"
                  errortext={'Please specify discount in percentage'}
                  errors={errors}
                  defaultValue={promoData?.percentage}
                  name="percentage"
                  register={register}
                />
              )}

              {(watch('type') === 'FIXED' || (promoData?.type === 'FIXED' && !watch('type'))) && (
                <InputField
                  label="Discount in figures (AED)"
                  type="number"
                  placeholder="ex: 200"
                  errortext={'Please specify discount fixed amount'}
                  errors={errors}
                  name="fixed"
                  defaultValue={promoData?.fixed}
                  register={register}
                />
              )}
              <InputField
                label="Currently Active?"
                type="select"
                options={[true, false]}
                placeholder="Status"
                errortext={'Is this promo active ?'}
                errors={errors}
                defaultValue={promoData?.isActive}
                name="isActive"
                register={register}
              />
              <InputField
                label="Show on website?"
                type="select"
                options={[true, false]}
                placeholder="Status"
                errors={errors}
                name="discountAd"
                defaultValue={promoData?.discountAd}
                errortext={'Do you want to show this on website?'}
                register={register}
              />
              <Checkbox
                className="col-span-2"
                name="isCombinable"
                color="danger"
                defaultSelected={promoData?.isCombinable ?? false}
                {...register('isCombinable', { required: false })}
              >
                <p className="text-sm font-medium">Combinable discount</p>
                <p className="text-[#8F8F8F] text-sm font-medium">
                  Allow bundle discount to be combined with other discount.
                </p>
              </Checkbox>
            </div>

            <div className="w-full md:w-1/4 mt-4">
              <div className="flex gap-3">
                <ButtonComponent type="submit" text="Save" loading={loading} isActive={true} />
                <ButtonComponent text="Cancel" isActive={true} btnclass={'bg-red-500'} onClick={() => handleCancle()} />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditPromo;
