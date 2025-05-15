import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .matches(/^[A-Za-z\s]+$/, "Only Letters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .matches(/^[A-Za-z\s]+$/, "Only Letters"),
  email: yup.string().required("Email Required").email("Invalid Email"),
  password: yup
    .string()
    .required("Password Required")
    .min(8, "Minimum 8 Letters"),
  passwordConfirmation: yup
    .string()
    .required("Password Confirmation Required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
