import * as yup from "yup";
const editPromoSchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
  limit: yup.number().required("Usage limit is Required"),
  percentage: yup.number().required("Percentage limit is Required"),
  isActive: yup.boolean().required("Status is required"),
  discountAd: yup.boolean().required("Status is required"),
});

const addPromoSchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
  limit: yup.number().required("Usage limit is Required"),
  percentage: yup.number().required("Percentage limit is Required"),
  isActive: yup.boolean().required("Status is required"),
  discountAd: yup.boolean().required("Status is required"),
});

export { addPromoSchema, editPromoSchema };
