import { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import ResultFilterBar from "../../../components/general/ResultFilterBar";
import Tableform from "../../../components/general/Tableform";
import { API } from "../../../api";
import { errorToast, successToast } from "../../../hooks/useToast";
import Loader from "../../../components/general/Loader";
import { tickerColumns } from "../../../data/tickerColumns";

const TickerComponent = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [searchFilter, setSearchFilter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [allcategories, setAllCategories] = useState(null);

  const getData = async () => {
    try {
      const response = await API.getTickers();
      setAllCategories(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Can not fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await API.deleteTicker(id);
      successToast(response?.data?.message);
      getData();
    } catch (error) {
      errorToast("Can not delete tick");
    }
  };

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Tickers"}
        previous={"Dashboard"}
        currentpage={"Ticker"}
        btntext={"Add Ticker"}
        btnlink={"/dashboard/management/ticker/add"}
      />
      <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
        <ResultFilterBar
          setitemPerPage={setitemPerPage}
          setfilterdata={setAllCategories}
          filterdata={allcategories}
          setSearchFilter={setSearchFilter}
        />
        {loading ? (
          <Loader />
        ) : (
          <>
            {allcategories && (
              <Tableform
                filterdata={allcategories}
                tablecolumns={tickerColumns}
                itemPerPage={itemPerPage}
                searchFilter={searchFilter}
                pagename={"edit"}
                preview={false}
                getData={getData}
                handleDelete={handleDelete}
                isDelete={true}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TickerComponent;
