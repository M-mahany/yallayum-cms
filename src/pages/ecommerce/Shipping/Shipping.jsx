import React, { useEffect, useState } from 'react';
import Header from '../../../components/dashboard/Header';
import { Avatar, Button } from '@nextui-org/react';
import { API } from '../../../api';
import Loader from '../../../components/general/Loader';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { errorToast, successToast } from '../../../hooks/useToast';
import { State } from 'country-state-city';
import { CiLocationOff } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const [allZones, setAllZones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fetchZones = async () => {
    try {
      setIsLoading(true);
      const res = await API.getAllZones();
      setAllZones(res.data.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await API.deleteZone(id);
      setAllZones((prev) => prev.filter((item) => item.id !== id));
      successToast(res?.data?.message);
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={'Shipping'}
        previous={'Dashboard'}
        currentpage={'Shipping'}
        btntext={'Add Zone'}
        btnlink={'/dashboard/store/shipping/add'}
      />
      <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
        {isLoading ? (
          <Loader />
        ) : allZones?.length > 0 ? (
          <>
            {allZones.map((data) => (
              <div className="p-6 shadow-md rounded-xl border-1 flex items-center justify-between">
                <div className="pr-4 flex flex-col items-center justify-center gap-2">
                  <div className="flex gap-2">
                    <Avatar
                      alt={data.countries[0]?.country}
                      className="w-6 h-6"
                      src={`https://flagcdn.com/${(
                        data.countries[0]?.country.toLocaleLowerCase() || ''
                      ).toLocaleLowerCase()}.svg`}
                    />{' '}
                    <span> {data.countries[0]?.country}</span>
                  </div>
                  <p className="text-lg whitespace-nowrap">{data?.name}</p>
                </div>
                <div className="flex flex-col gap-2 pl-4 border-l-1">
                  <p className="text-slate-500 leading-normal">
                    {data?.states.map((state) => State.getStateByCode(state?.state).name).join(', ')}
                  </p>
                </div>
                <div className="flex pl-4 border-l-1 gap-2">
                  <div className="flex justify-center flex-col items-center pr-6 min-w-[187px] gap-2">
                    {data?.shippingMethods.map((method) => (
                      <p className="font-bold leading-none text-sm">
                        {method?.name} - AED {method?.flatRate || method?.freeOverAmount}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 pl-2 border-l-1">
                  <Button
                    isIconOnly
                    className="bg-transparent text-blue-500 text-xl w-6 h-6"
                    onClick={() => navigate(`${data?.id}`)}
                  >
                    <FaRegEdit />
                  </Button>
                  <Button
                    isIconOnly
                    className="bg-transparent text-[#FC4242] text-xl w-6 h-6"
                    onClick={() => handleDelete(data?.id)}
                  >
                    <AiOutlineDelete />
                  </Button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="border-2 border-[#fad2d2] rounded-2xl p-12 h-64 flex items-center justify-center flex-col gap-2">
            <CiLocationOff className="text-[#FC4242] text-4xl" />
            <p className="text-[#FC4242] text-base">No Zones added yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shipping;
