import React, { useEffect, useState } from "react";
import { useQuery } from "../../../hooks/queryParam";
import { API } from "../../../api";
import { errorToast, successToast } from "../../../hooks/useToast";
import Header from "../../../components/dashboard/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { orderStatusEnum } from "../../../data/orderEnum";
import InfoCard from "../../../components/general/InfoCard";
import OrderItem from "./OrderItem";
import SelectList from "../../../components/general/SelectList";

const EditOrders = () => {
  const query = useQuery();
  const id = query.get("id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");

  const [orderData, setOrderData] = useState(null);
  const { setValue, handleSubmit } = useForm();

  const getData = async () => {
    try {
      const response = await API.getSingleOrder(id);
      setOrderData(response?.data?.data);
    } catch (error) {
      errorToast(error, "Failed to load data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await API.orderUpdateStatus(id, data);
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);

      console.log(error);
      errorToast(error, "Can not change status at the moment");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (orderData) {
      setOrderStatus(orderData?.status);
      setValue("status", orderData?.status);
    }
  }, [orderData]);

  const handleOrderStatusChange = (e) => {
    setOrderStatus(e.target.value);
    setValue("status", e.target.value);
  };

  return (
    <div className="page-area mt-10    min-h-screen">
      <Header
        pagetitle={"Order"}
        previous={"Dashboard"}
        currentpage={"Update Order"}
      />

      <form
        className="grid grid-col-1 gap-6 p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {orderData && (
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8 shadow-lg">
            <div className="flex justify-start items-center gap-6 flex-wrap">
              <div
                className={`py-2 px-4 ${
                  orderData?.orderStatus === "PENDING"
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                } rounded-full shadow-md`}
              >
                <p className="text-white text-sm font-semibold">
                  {orderData?.orderStatus}
                </p>
              </div>
              <div className={`py-2 px-4 bg-indigo-600 rounded-full shadow-md`}>
                <div className="flex justify-center gap-2 items-center">
                  <p className="text-white text-sm font-semibold">Order No:</p>
                  <p className="text-white text-sm">{orderData?.name}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <InfoCard title="User Name" value={orderData?.userName} />
              <InfoCard title="User Contact" value={orderData?.userPhone} />
              <InfoCard title="User Email" value={orderData?.userEmail} />
              <InfoCard title="Order Date" value={orderData?.date} />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Order Items
              </h3>
              {orderData.orderItems.map((item, index) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl w-full py-6 px-8 shadow-lg mt-6">
          <p className="text-white text-xl font-semibold">Sub Total Price</p>
          <p className="text-white text-3xl font-bold mt-2">
          AED{orderData?.totalPrice}
          </p>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl w-full py-6 px-8 shadow-lg mt-6">
          <p className="text-white text-xl font-semibold">Delivery</p>
          <p className="text-white text-3xl font-bold mt-2">
          AED {orderData?.deliveryCharges}
          </p>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl w-full py-6 px-8 shadow-lg mt-6">
          <p className="text-white text-xl font-semibold">Total Price</p>
          <p className="text-white text-3xl font-bold mt-2">
          AED  {orderData?.totalAndDelivery}
          </p>
        </div>
        <SelectList
          value={orderStatus}
          onChange={handleOrderStatusChange}
          options={orderStatusEnum}
        />

        <div className="w-full md:w-1/4 mt-8">
          <div className="flex gap-4">
            <ButtonComponent
              type="submit"
              text="Save"
              loading={loading}
              isActive={true}
              btnclass="bg-emerald-500 hover:bg-emerald-600 text-white"
            />
            <ButtonComponent
              text="Cancel"
              isActive={true}
              btnclass="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleCancel}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditOrders;
