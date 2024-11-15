import * as yup from "yup";

const productScehma = yup.object().shape({
  name: yup.string().required("Title is required"),
  slug: yup.string().required("Slug is required"),
  shortDescription: yup.string().required("Short Description is required"),
  longDescription: yup.string().required("Long Description is required"),
  ingredients: yup.string().required("Ingredients are required"),
});

export { productScehma };
