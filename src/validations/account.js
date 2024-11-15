import * as yup from "yup";
const updateProfile = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
});

const changePassword = yup.object().shape({
  oldPassword: yup.string().required(),
  password: yup.string().required(),
  newPassword: yup
    .string()
    .required("Confirm New Password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

export { updateProfile, changePassword };
