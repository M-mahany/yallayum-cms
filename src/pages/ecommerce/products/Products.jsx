import { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import ResultFilterBar from "../../../components/general/ResultFilterBar";
import Tableform from "../../../components/general/Tableform";
import { API } from "../../../api";
import { errorToast } from "../../../hooks/useToast";
import Loader from "../../../components/general/Loader";
import { productColumns } from "../../../data/ProductColumns";

const Products = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [searchFilter, setSearchFilter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState(null);

  const getData = async () => {
    try {
      const response = await API.getProducts();
      setAllProducts(response?.data?.data);
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
        pagetitle={"Products"}
        previous={"Dashboard"}
        currentpage={"Products"}
        btntext={"Add Product"}
        btnlink={"add"}
      />
      <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
        <ResultFilterBar
          setitemPerPage={setitemPerPage}
          setfilterdata={setAllProducts}
          filterdata={allProducts}
          setSearchFilter={setSearchFilter}
        />
        {loading ? (
          <Loader />
        ) : (
          <>
            {allProducts && (
              <Tableform
                filterdata={allProducts}
                tablecolumns={productColumns}
                itemPerPage={itemPerPage}
                searchFilter={searchFilter}
                pagename={"edit"}
                preview={false}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
