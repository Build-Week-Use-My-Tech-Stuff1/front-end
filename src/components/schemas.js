import * as yup from "yup";

export const USER_LOGIN_SCHEMA = yup.object().shape({
  username: yup
    .string()
    .min(5, "You must have at least 5 characters in your username")
    .max(20, "You are limited to 20 characters for your username")
    .required("This field is required"),
  password: yup.string().required("This field is required"),
});

export const USER_REGISTRATION_SCHEMA = yup.object().shape({
  username: yup
    .string()
    .min(5, "You must have at least 5 characters in your username")
    .max(20, "You are limited to 20 characters for your username")
    .required("This field is required"),
  password: yup.string().required("This field is required"),
  passwordConfirm: yup.string().required("This field is required"),
  firstName: yup.string().min(2).required("This field is required"),
  lastName: yup.string().min(2).required("This field is required"),
});

export const listCreationSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "Your item name should have at least 5 characters.")
    .max(20, "Your item name should not exceed 20 characters.")
    .required("Item name is required."),
  description: yup.string().required("Description is required."),
  condition: yup.string().required("Condition is required."),
  price: yup
    .number()
    .min(0.01, "Minimum of 0.01")
    .required("Price is required"),
  period: yup
    .number()
    .min(1, "Minimum of 1 month renting period.")
    .required("Rental Period is required."),
});
