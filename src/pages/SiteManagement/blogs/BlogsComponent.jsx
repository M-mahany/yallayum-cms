import React, { useEffect, useState } from "react";
import { API } from "../../../api";
import { errorToast, successToast } from "../../../hooks/useToast";
import Header from "../../../components/dashboard/Header";
import ResultFilterBar from "../../../components/general/ResultFilterBar";
import Tableform from "../../../components/general/Tableform";
import Loader from "../../../components/general/Loader";
import { blogsColumn } from "../../../data/blogsColumn";
import GeneralModal from "../../../components/general/GeneralModal";
import { blogSectionHeading } from "../../../validations/blogs";

const BlogsComponent = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [searchFilter, setSearchFilter] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSection, setLoadingSection] = useState(false);

  const [allblogs, setAllBlogs] = useState(null);

  const getData = async () => {
    try {
      let response = await API.getAllBlogs();
      setAllBlogs(response?.data?.data?.blogs);
      response = await API.getBlogHeading();
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
      const response = await API.deleteBlogs(id);
      successToast(response?.data?.message);
      getData();
    } catch (error) {
      errorToast("Can not delete Blog");
    }
  };

  const submitSection = async (formData) => {
    setLoadingSection(true);
    try {
      const response = await API.updateBlogHeading(sectionData?.id, formData);
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
        currentpage={"Blogs"}
        btntext={"Add Blogs "}
        btnlink={"add"}
      />
      <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
        <ResultFilterBar
          setitemPerPage={setitemPerPage}
          setfilterdata={setAllBlogs}
          filterdata={allblogs}
          setSearchFilter={setSearchFilter}
        />

        {loading ? (
          <Loader />
        ) : (
          <>
            {sectionData && (
              <div className="mt-4">
                <GeneralModal
                  sectionData={sectionData}
                  btntitle={"Edit Blog Section"}
                  title={"Edit Section"}
                  names={["head", "span", "paragh"]}
                  submitSection={submitSection}
                  loading={loadingSection}
                  validationSchema={blogSectionHeading}
                />
              </div>
            )}
            {allblogs && (
              <Tableform
                filterdata={allblogs}
                tablecolumns={blogsColumn}
                itemPerPage={itemPerPage}
                searchFilter={searchFilter}
                pagename={"edit"}
                preview={false}
                tableheading="Blogs"
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

export default BlogsComponent;
