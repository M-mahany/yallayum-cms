import React, { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import PopupModal from "./PopupModal";
import { Button, ModalBody, Tooltip } from "@nextui-org/react";
import { API } from "../../api";
import { errorToast, successToast } from "../../hooks/useToast";

const Tableactionsicons = ({
  id,
  pagename,
  ispreview,
  isDelete = false,
  object,
  modalheading,
  updateApiPath,
  updateItem,
  getData,
  handleDelete = () => {},
}) => {
  const [loading, setLoading] = useState(false);

  const updateFeedbackStatus = async (id) => {
    const updatedIsResolved = !object[updateItem];
    setLoading(true);
    try {
      const response = await API[updateApiPath](id, {
        [updateItem]: updatedIsResolved,
      });
      successToast(response?.data?.message);
      getData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Can not update feedback status");
    }
  };

  const renderObjectDetails = () => {
    return (
      <table className="table-auto">
        <tbody className="">
          {Object.entries(object).map(([key, value]) => (
            <tr key={key} className="border-b-1 ">
              <td className=" mb-2 py-2">
                <strong>{key}:</strong>
              </td>
              <td className=" mb-2 py-2">
                {key === "isResolved"
                  ? value
                    ? "Resolved"
                    : "Pending"
                  : typeof value === "boolean"
                  ? value.toString()
                  : value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex justify-center items-center gap-4">
      {ispreview && (
        <>
          <PopupModal
            title={modalheading}
            id={id}
            updateFeedbackStatus={updateFeedbackStatus}
          >
            <ModalBody>{renderObjectDetails()}</ModalBody>
          </PopupModal>
        </>
      )}

      {object ? (
        <Tooltip
          showArrow={true}
          color="secondary"
          placement="left-start"
          content="Click to edit "
        >
          {!ispreview && (
            <Link
              to={`${pagename}?id=${id}&object=${JSON.stringify(object)}`}
              className="text-blue-500"
            >
              <RiEdit2Line className="text-2xl cursor-pointer hover:scale-150 transition-all" />
            </Link>
          )}
        </Tooltip>
      ) : (
        <Tooltip
          showArrow={true}
          color="secondary"
          placement="left-start"
          content="Click to edit "
        >
          <Link to={`${pagename}?id=${id}`} className="text-blue-500">
            <RiEdit2Line className="text-2xl" />
          </Link>
        </Tooltip>
      )}
      {isDelete && (
        <Tooltip
          showArrow={true}
          color="danger"
          placement="left-start"
          content="Are you sure you want to delete this? "
        >
          <div>
            <RiDeleteBin6Line
              onClick={() => handleDelete(id)}
              className="text-red-500 text-2xl cursor-pointer hover:scale-150 transition-all"
            />
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default Tableactionsicons;
