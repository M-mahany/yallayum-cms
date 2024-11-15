import React, { useEffect, useState } from "react";
import Header from "../../components/dashboard/Header";
import { API } from "../../api";
import Loader from "../../components/general/Loader";
import Tableform from "../../components/general/Tableform";
import { errorToast } from "../../hooks/useToast";
import ResultFilterBar from "../../components/general/ResultFilterBar";
import { newslettercolumn } from "../../data/newslettercolumn";

const Newsletter = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [filterdata, setfilterdata] = useState();
  const [searchFilter, setSearchFilter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [allcategories, setAllCategories] = useState(null);

  const getData = async () => {
    try {
      const response = await API.getAllNewsletter();
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
  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Site Management"}
        previous={"Dashboard"}
        currentpage={"Newsletter"}
     
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
                tablecolumns={newslettercolumn}
                itemPerPage={itemPerPage}
                searchFilter={searchFilter}
                pagename={"/"}
                preview={false}
                tableheading="Newsletter"
                updateApiPath="updateReportStatus"
                updateItem="isResolved"
                getData={getData}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
