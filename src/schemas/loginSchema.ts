import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email Required").email("Invalid Email"),
  password: yup.string().required("Password Required"),
});
