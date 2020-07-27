import * as yup from "yup";

export const USER_LOGIN_SCHEMA = yup.object().describe({
  username: yup
    .string()
    .min(5, "You must have at least 5 characters in your username")
    .max(20, "You are limited to 20 characters for your username")
    .required("This field is required"),
  password: yup.string().required("This field is required"),
});

export const USER_REGISTRATION_SCHEMA = yup.object().describe({
  username: yup
    .string()
    .min(5, "You must have at least 5 characters in your username")
    .max(20, "You are limited to 20 characters for your username")
    .required("This field is required"),
  password: yup.string().required("This field is required"),
  passwordConfirm: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password"), null], "Your passwords must match"),
  firstName: yup.string().min(2).required("This field is required"),
  lastName: yup.string().min(2).required("This field is required"),
});
