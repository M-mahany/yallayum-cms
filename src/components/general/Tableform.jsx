import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import Tableactionsicons from "./Tableactionsicons";
import { Button } from "@nextui-org/react";
import { formatLastLogin } from "../../utils/date";

const Tableform = ({
  tableheading,
  itemPerPage,
  filterdata,
  tablecolumns,
  searchFilter,
  pagename,
  preview,
  updateApiPath,
  updateItem,
  getData,
  handleDelete,
  isDelete,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [searchFilter, itemPerPage]);

  const filteredData =
    searchFilter && searchFilter.trim() !== ""
      ? filterdata?.filter((item) => item?.name?.includes(searchFilter))
      : filterdata;

  const pages = Math.ceil(filteredData?.length / itemPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const start = (page - 1) * itemPerPage;
  const end = page * itemPerPage;

  const items = filteredData?.slice(start, end);

  let count = 1;
  return (
    <div className="Tableform border rounded-xl py-6 px-1 md:px-4 mt-10">
      {tableheading && (
        <>
          <h2 className="text-xl font-medium uppercase text-black mb-4">
            {tableheading}
          </h2>
          <hr className="border-b-1 rounded-none border-[#F5F5F5]" />
        </>
      )}
      <div className="mt-4">
        <Table
          aria-label="Example table with client async pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              {pages > 1 && (
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={handlePageChange}
                />
              )}
            </div>
          }
        >
          <TableHeader>
            {tablecolumns?.map((tablecol) => (
              <TableColumn
                className={
                  tablecol?.label === "Statement" ? "min-w-[550px]" : ""
                }
                key={tablecol.key}
              >
                {tablecol.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody items={items}>
            {items?.map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                {tablecolumns?.map((datacolumn) => (
                  <TableCell
                    key={datacolumn?.key}
                    className="font-normal text-sm"
                  >
                    {datacolumn?.key === "num" ? count++ : null}

                    {datacolumn?.key !== "actions" ? (
                      datacolumn?.key === "isLive" ||
                      datacolumn?.key === "isTrial" ||
                      datacolumn?.key === "isApproved" ||
                      datacolumn?.key === "customProduct" ||
                      datacolumn?.key === "subscription" ? (
                        item[datacolumn?.key] ? (
                          <Button
                            variant="bordered"
                            isDisabled
                            className="bg-transparent text-[#3FD639] border-[#3FD639] !opacity-100"
                          >
                            Approved
                          </Button>
                        ) : (
                          <Button
                            variant="bordered"
                            isDisabled
                            className="bg-transparent text-[#FF3A3A] border-[#FF3A3A] !opacity-100"
                          >
                            Not Approved
                          </Button>
                        )
                      ) : datacolumn?.key === "isBlocked" ? (
                        item[datacolumn?.key] ? (
                          <Button
                            variant="bordered"
                            isDisabled
                            className="bg-transparent text-[#FF3A3A] border-[#FF3A3A] !opacity-100"
                          >
                            Inactive
                          </Button>
                        ) : (
                          <Button
                            variant="bordered"
                            isDisabled
                            className="bg-transparent text-[#3FD639] border-[#3FD639] !opacity-100"
                          >
                            Active
                          </Button>
                        )
                      ) : datacolumn?.key === "orderStatus" ? (
                        <Button
                          variant="bordered"
                          isDisabled
                          className={`bg-transparent ${item[datacolumn?.key] === "PENDING" ? "text-red-500 border-red-500" : "text-[#3FD639] border-[#3FD639]"} !opacity-100`}

                        >
                          {item[datacolumn?.key]}
                        </Button>
                      ) : datacolumn?.key === "imageUrl" ? (
                        <>
                          <img
                            src={item[datacolumn?.key]}
                            width={100}
                            height={400}
                          />
                        </>
                      ) : (
                        // Use innerText to strip HTML tags and entities
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item[datacolumn?.key],
                          }}
                        />
                      )
                    ) : (
                      <Tableactionsicons
                        id={item?.id}
                        pagename={pagename}
                        ispreview={preview}
                        object={item}
                        modalheading={tableheading}
                        updateApiPath={updateApiPath}
                        updateItem={updateItem}
                        getData={getData}
                        handleDelete={handleDelete}
                        isDelete={isDelete}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Tableform;
