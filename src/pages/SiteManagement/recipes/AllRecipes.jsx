import React, { useEffect, useState } from "react";
import { API } from "../../../api";
import { errorToast, successToast } from "../../../hooks/useToast";
import Header from "../../../components/dashboard/Header";
import ResultFilterBar from "../../../components/general/ResultFilterBar";
import Tableform from "../../../components/general/Tableform";
import Loader from "../../../components/general/Loader";
import GeneralModal from "../../../components/general/GeneralModal";
import { blogSectionHeading } from "../../../validations/blogs";
import { recipesColumn } from "../../../data/recipesColumn";

const AllRecipes = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [searchFilter, setSearchFilter] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSection, setLoadingSection] = useState(false);

  const [allrecipes, setAllRecipes] = useState(null);

  const getData = async () => {
    try {
      let response = await API.getAllRecipes();
      setAllRecipes(response?.data?.data?.recipes);
      response = await API.getRecipeHeading();
      setSectionData(response?.data?.data);
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
      const response = await API.deleteRecipe(id);
      successToast(response?.data?.message);
      getData();
    } catch (error) {
      errorToast("Can not delete Blog");
    }
  };

  const submitSection = async (formData) => {
    setLoadingSection(true);
    try {
      const response = await API.updateRecipeHeading(sectionData?.id, formData);
      successToast(response?.data?.message);
      setLoadingSection(false);
    } catch (error) {
      setLoadingSection(false);
      errorToast(error, "Cannot update data");
    }
  };
  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Site Management"}
        previous={"Dashboard"}
        currentpage={"Recipes"}
        btntext={"Add Recipes "}
        btnlink={"add"}
      />
      <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
        <ResultFilterBar
          setitemPerPage={setitemPerPage}
          setfilterdata={setAllRecipes}
          filterdata={allrecipes}
          setSearchFilter={setSearchFilter}
        />

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="mt-4">
              <GeneralModal
                sectionData={sectionData}
                btntitle={"Edit Recipes Section"}
                title={"Edit Section"}
                names={["head", "span", "paragh"]}
                submitSection={submitSection}
                loading={loadingSection}
                validationSchema={blogSectionHeading}
              />
            </div>
            {allrecipes && (
              <Tableform
                filterdata={allrecipes}
                tablecolumns={recipesColumn}
                itemPerPage={itemPerPage}
                searchFilter={searchFilter}
                pagename={"edit"}
                preview={false}
                tableheading=""
                updateApiPath="updatefeedBackStatus"
                updateItem="isResolved"
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

export default AllRecipes;
