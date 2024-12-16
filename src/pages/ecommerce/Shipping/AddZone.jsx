import React, { useEffect, useState } from 'react';
import Header from '../../../components/dashboard/Header';
import { Avatar, Button, Input, Select, SelectItem } from '@nextui-org/react';
import { Country, State } from 'country-state-city';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { errorToast, successToast } from '../../../hooks/useToast';
import { FaCheckDouble } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../../api';
import Loader from '../../../components/general/Loader';

const AddZone = () => {
  const [data, setData] = useState({ countries: ['AE'], shippingMethods: [] });
  const [tempShippingData, setTempShippingData] = useState({});
  const [EditIndex, setEditIndex] = useState(null);
  const [ShippingErrors, setShippingErrors] = useState({});
  const [ZoneErrors, setZoneErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { id } = useParams();

  // countries and states
  const allCountries = Country.getCountryByCode('AE');
  const states = State.getStatesOfCountry(data?.countries[0]);

  const fetchZoneById = async () => {
    try {
      setIsLoading(true);
      const response = await API.getZoneById(id);
      const { data } = response.data;
      const reformatedData = {
        ...data,
        states: data.states.map((state) => state?.state),
        countries: data?.countries.map((country) => country.country),
      };
      setData(reformatedData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      errorToast(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchZoneById();
    }
  }, []);

  // handle Zone Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const isCountryOrState = name === 'countries' || name === 'states';

    setData((prev) => ({ ...prev, [name]: isCountryOrState ? (value !== '' ? value?.split(',') : []) : value }));
  };

  // handle Shipping Method Change
  const handleShippingChange = (e) => {
    const { name, value, type } = e.target;
    setTempShippingData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  // triggers onChange to validate required fields
  useEffect(() => {
    validate(
      tempShippingData,
      [{ name: 'type' }, { name: tempShippingData?.type === 'FREE_SHIPPING' ? 'freeOverAmount' : 'flatRate' }],
      setShippingErrors
    );
  }, [tempShippingData]);

  // triggers onChange to validate required fields
  useEffect(() => {
    validate(
      data,
      [{ name: 'name' }, { name: 'states' }, { name: 'countries' }, { name: 'shippingMethods' }],
      setZoneErrors
    );
  }, [data]);

  // handles Add Shipping Method
  const handleAdd = () => {
    let newShippingMethod = tempShippingData;

    const hasMissingFields = Object.values(ShippingErrors).some((val) => val !== '');
    if (hasMissingFields) {
      setShowErrors(true);
      return;
    }
    const isDuplicate = data?.shippingMethods?.some((item) => item.type === newShippingMethod?.type);
    if (isDuplicate) {
      errorToast({}, 'Duplicate Error! Shipping Type already exist');
      return;
    }

    if (newShippingMethod?.isNew) {
      delete newShippingMethod?.isNew;
    }

    setData((prev) => ({ ...prev, shippingMethods: [...data?.shippingMethods, newShippingMethod] }));
    setTempShippingData({});
    setShowErrors(false);
  };

  // handlesEdit
  const handleEdit = (index) => {
    setEditIndex(index);
    setTempShippingData(data?.shippingMethods[index]);
  };

  //handles update shipping Method
  const handleUpdate = () => {
    const isDuplicate = data?.shippingMethods
      ?.filter((_, i) => i !== EditIndex)
      .some((item) => item.type === tempShippingData?.type);
    if (isDuplicate) {
      errorToast({}, 'Duplicate Error! Shipping Type already exist');
      return;
    }
    setData((prev) => {
      const updatedShippingMethods = [...prev.shippingMethods];
      updatedShippingMethods.splice(EditIndex, 1, tempShippingData); // Update using splice
      return {
        ...prev,
        shippingMethods: updatedShippingMethods,
      };
    });
    handleCancel();
  };

  // add new shipping method
  const handleNew = () => {
    setTempShippingData({ isNew: true });
  };

  const deleteApiShippingMethod = async (id) => {
    try {
      setIsFetching(true);
      const response = await API.deleteShippingMethod(id);
      successToast(response?.data?.message);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      errorToast(error);
    }
  };

  // Delete shipping method
  const handleDeleteShipping = (index) => {
    const targetMethod = data?.shippingMethods[index];
    if (targetMethod?.id) {
      deleteApiShippingMethod(targetMethod?.id);
    }
    setData((prev) => ({ ...prev, shippingMethods: prev.shippingMethods.filter((_, i) => i !== index) }));
    handleCancel();
  };

  // cancel adding or editing shipping method
  const handleCancel = () => {
    setTempShippingData({});
    setEditIndex(null);
  };

  // Validate CallBack fucntion
  const validate = (state, requiredFields, setErrors) => {
    let error = {};
    requiredFields.forEach((reqField) => {
      const name = reqField.name;
      if (!state[name] || state[name] === '') {
        error[name] = `${name} is required`;
      }
      if ((name === 'shippingMethods' || name === 'countries' || name === 'states') && state[name]?.length === 0) {
        error[name] = `${name} is required`;
      }
      setErrors(error);
    });
  };

  const shippingMethodDto = (item) => {
    let shippingData = {};
    if (item.type === 'FREE_SHIPPING') {
      shippingData.freeOverAmount = item?.freeOverAmount;
    } else {
      shippingData.flatRate = item?.flatRate;
    }
    if (item?.id) {
      shippingData.id = item.id;
    }
    return {
      ...shippingData,
      name: item?.name ?? item.type === 'FREE_SHIPPING' ? 'Free Shipping' : 'Flat Rate',
      type: item.type,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasMissingFields = Object.values(ZoneErrors).some((val) => val !== '');
    if (hasMissingFields) {
      setShowErrors(true);
      return;
    }
    try {
      setIsFetching(true);
      let response;
      if (id) {
        response = await API.updateZoneById(id, {
          name: data.name,
          states: data.states,
          countries: data.countries,
          shippingMethods: data?.shippingMethods.map((method) => shippingMethodDto(method)),
        });
      } else {
        response = await API.createNewZone({
          ...data,
          shippingMethods: data?.shippingMethods.map((method) => shippingMethodDto(method)),
        });
      }
      successToast(response?.data?.message);
      setIsFetching(false);
      navigate('/dashboard/store/shipping');
    } catch (error) {
      setIsFetching(false);
      errorToast(error);
    }
    // handles api
  };

  return (
    <div
      className="page-area mt-10"
      style={{ opacity: isFetching ? '0.5' : 1, pointerEvents: isFetching ? 'none' : '' }}
    >
      <Header
        pagetitle={'Shipping'}
        previous={'Dashboard'}
        currentpage={'Add Zone'}
        btnlink={'/dashboard/store/categories/add-category'}
      />
      <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
        {isLoading ? (
          <Loader />
        ) : (
          <form className="flex flex-wrap gap-[20px]" onSubmit={handleSubmit}>
            <Input
              label="Zone Name"
              type="text"
              name="name"
              value={data?.name}
              onChange={handleChange}
              errorMessage={showErrors ? ZoneErrors?.name : ''}
              isInvalid={showErrors && ZoneErrors?.name ? true : false}
            />

            <Select
              className="w-[calc(50%-10px)]"
              label="Country"
              name="countries"
              onChange={handleChange}
              selectedKeys={data?.countries ?? []}
              errorMessage={showErrors ? ZoneErrors?.countries : ''}
              isInvalid={showErrors && ZoneErrors?.countries ? true : false}
            >
              {[allCountries].map((item) => (
                <SelectItem
                  key={item?.isoCode}
                  startContent={
                    <Avatar
                      alt={item.name}
                      className="w-6 h-6"
                      src={`https://flagcdn.com/${(item?.isoCode || '').toLocaleLowerCase()}.svg`}
                    />
                  }
                >
                  {item.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              className="w-[calc(50%-10px)]"
              label="State"
              name="states"
              onChange={handleChange}
              selectionMode="multiple"
              selectedKeys={data?.states ?? []}
              errorMessage={showErrors ? ZoneErrors?.states : ''}
              isInvalid={showErrors && ZoneErrors?.states ? true : false}
            >
              {states.map((item) => (
                <SelectItem key={item?.isoCode}>{item.name}</SelectItem>
              ))}
            </Select>

            {/* Shipping Method Component */}
            <div className="flex flex-col relative w-full rounded-2xl border-slate-300 border-1 p-6 mt-6 gap-4">
              <p className="absolute top-[-14px] left-[12px] bg-white text-base px-2">Shipping Methods</p>
              {showErrors && ZoneErrors?.shippingMethods && (
                <p className="absolute top-[102%] left-[12px] text-sm text-[#FC4242]">{ZoneErrors?.shippingMethods}</p>
              )}
              {data?.shippingMethods?.map((meth, index) => (
                <>
                  {EditIndex === index ? (
                    <div className="p-4 shadow-md rounded-xl border-1 flex flex-wrap gap-[20px] flex-col items-end mt-4">
                      <div className="flex gap-[20px] flex-wrap w-full">
                        <Select
                          className="w-[calc(50%-10px)]"
                          label="Method Type"
                          name="type"
                          onChange={handleShippingChange}
                          defaultSelectedKeys={[tempShippingData?.type]}
                        >
                          <SelectItem key="FLAT_RATE">Flate Rate</SelectItem>
                          <SelectItem key="FREE_SHIPPING">Free Shipping</SelectItem>
                        </Select>
                        {tempShippingData?.type === 'FLAT_RATE' && (
                          <Input
                            className="w-[calc(50%-10px)]"
                            label={'Amount'}
                            name="flatRate"
                            type="number"
                            placeholder="13 AED"
                            onChange={handleShippingChange}
                            value={tempShippingData?.flatRate ?? ''}
                          />
                        )}
                        {tempShippingData?.type === 'FREE_SHIPPING' && (
                          <Input
                            className="w-[calc(50%-10px)]"
                            label={'Minimum Order Amount'}
                            type="number"
                            placeholder="200 AED"
                            name="freeOverAmount"
                            onChange={handleShippingChange}
                            value={tempShippingData?.freeOverAmount ?? ''}
                          />
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="bg-transparent text-[#FC4242] font-bold border-2 border-[#FC4242]"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                        <Button className="bg-[#FC4242] text-white font-bold" onClick={handleUpdate}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 shadow-md rounded-xl border-1 flex items-center justify-between">
                      <p className="text-lg">{meth?.type === 'FREE_SHIPPING' ? 'Free Shipping' : 'Flat Rate'}</p>
                      <div className="flex pl-8 border-l-2 gap-2">
                        <div className="flex justify-center flex-col items-center pr-6 min-w-[187px]">
                          <p className="font-bold leading-none text-sm">
                            {meth?.type === 'FREE_SHIPPING' ? 'Minimum Order Amount' : 'Amount'}{' '}
                          </p>
                          <p className="text-base">
                            AED {meth?.type === 'FREE_SHIPPING' ? meth?.freeOverAmount : meth?.flatRate}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 pl-8 border-l-2">
                          <Button
                            isIconOnly
                            className="bg-transparent text-blue-500 text-lg w-6 h-6"
                            onClick={() => handleEdit(index)}
                          >
                            <FaRegEdit />
                          </Button>
                          {data?.shippingMethods?.length > 1 && (
                            <Button
                              isIconOnly
                              className="bg-transparent text-[#FC4242] text-lg w-6 h-6"
                              onClick={() => handleDeleteShipping(index)}
                            >
                              <AiOutlineDelete />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}

              {/* Handles adding new Shipping Method Section */}
              {tempShippingData?.isNew && (
                <div className="p-4 shadow-md rounded-xl border-1 flex flex-wrap gap-[20px] flex-col items-end mt-4">
                  <div className="flex gap-[20px] flex-wrap w-full">
                    <Select
                      className="w-[calc(50%-10px)]"
                      label="Method Type"
                      name="type"
                      onChange={handleShippingChange}
                      errorMessage={showErrors ? ShippingErrors?.type : ''}
                      isInvalid={showErrors && ShippingErrors?.type ? true : false}
                    >
                      <SelectItem key="FLAT_RATE">Flate Rate</SelectItem>
                      <SelectItem key="FREE_SHIPPING">Free Shipping</SelectItem>
                    </Select>
                    {tempShippingData?.type === 'FLAT_RATE' && (
                      <Input
                        className="w-[calc(50%-10px)]"
                        label={'Amount'}
                        name="flatRate"
                        type="number"
                        placeholder="13 AED"
                        onChange={handleShippingChange}
                        value={tempShippingData?.flatRate ?? ''}
                        errorMessage={showErrors ? ShippingErrors?.flatRate : ''}
                        isInvalid={showErrors && ShippingErrors?.flatRate ? true : false}
                      />
                    )}
                    {tempShippingData?.type === 'FREE_SHIPPING' && (
                      <Input
                        className="w-[calc(50%-10px)]"
                        label={'Minimum Order Amount'}
                        type="number"
                        placeholder="200 AED"
                        name="freeOverAmount"
                        onChange={handleShippingChange}
                        value={tempShippingData?.freeOverAmount ?? ''}
                        errorMessage={showErrors ? ShippingErrors?.freeOverAmount : ''}
                        isInvalid={showErrors && ShippingErrors?.freeOverAmount ? true : false}
                      />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="bg-transparent text-[#FC4242] font-bold border-2 border-[#FC4242]"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button className="bg-[#FC4242] text-white font-bold" onClick={handleAdd}>
                      + Add
                    </Button>
                  </div>
                </div>
              )}
              {!tempShippingData?.isNew && data?.shippingMethods?.length < 2 && (
                <Button className="bg-[#FC4242] text-white font-bold text-lg" onClick={handleNew}>
                  + Add Shipping Method
                </Button>
              )}
            </div>
            <div className="flex justify-start mt-4 gap-4">
              <Button
                className="bg-transparent text-[#FC4242] font-bold border-2 border-[#FC4242] px-8 py-6"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button className="bg-[#FC4242] text-white font-bold text-lg px-8 py-6" type="submit">
                <FaCheckDouble />
                Save
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddZone;
