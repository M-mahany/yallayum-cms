import * as yup from "yup";
const editFlavor = yup.object().shape({
  name: yup.string().required("Category name is required"),
  price: yup.number().required("Status is required"),
  imageUrl: yup.mixed().required("Image is required"),
});

const AddFlavor = yup.object().shape({
  name: yup.string().required("Category name is required"),
  price: yup.number().required("Status is required"),
  imageUrl: yup.mixed().required("Image is required"),
});

export { AddFlavor, editFlavor };
