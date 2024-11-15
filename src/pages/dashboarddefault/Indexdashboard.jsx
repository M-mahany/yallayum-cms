import React, { useEffect, useState } from "react";
import Overview from "../../components/general/Overview";
import Header from "../../components/dashboard/Header";
import { API } from "../../api";
import { errorToast } from "../../hooks/useToast";
import Loader from "../../components/general/Loader";

const Indexdashboard = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  const getData = async () => {
    try {
      const response = await API.getStatistics();
      setDashboardData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Can not fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="page-area mt-10">
      <Header pagetitle={"Dashboard"} />

      {loading ? (
        <Loader />
      ) : (
        <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
          <Overview dashboardData={dashboardData} />
        </div>
      )}
    </div>
  );
};

export default Indexdashboard;
