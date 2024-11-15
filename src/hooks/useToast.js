import { toast } from "react-toastify";

export const successToast = (response) => {
  toast(response || "Done", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    backgroundColor: "crimson",
  });
};

export const errorToast = (error, defaultError) => {
  toast.error(error?.response?.data?.message || defaultError);
};
