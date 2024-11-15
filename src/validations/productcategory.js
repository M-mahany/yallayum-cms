import * as yup from "yup";
const editCategory = yup.object().shape({
  name: yup.string().required("Category name is required"),
  customProduct: yup.boolean().required("Status is required"),
  imageUrl: yup.mixed().required("Image is required"),
});

const AddCategory = yup.object().shape({
  name: yup.string().required("Category name is required"),
  customProduct: yup.boolean().required("Status is required"),
  imageUrl: yup.mixed().required("Image is required"),
});

export { AddCategory, editCategory };
