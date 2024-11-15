import * as yup from "yup";
const tickerSchema = yup.object().shape({
  name: yup.string().required("Tick name is required"),
  arbiName: yup.string().required("Arbi translation is required"),
});

export { tickerSchema };
