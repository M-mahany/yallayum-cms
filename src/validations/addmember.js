import * as yup from "yup";
const Editmember = yup.object().shape({
  isActive: yup.boolean().required("Status is required"),
});

export { Editmember };
