import * as Yup from "yup";
import dayjs from "dayjs";

// Validation schema
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^\d+$/, "Phone Number must contain only digits"),
  work: Yup.string().required("Occupation is required"),
  city: Yup.string().required("City is required"),
  nationality: Yup.string().required("Nationality is required"),
  birthdate: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .typeError("Birthdate is required")
    .required("Birthdate is required")
    .max(
      dayjs().startOf("day").toDate(),
      "Birthdate cannot be today or in the future"
    ),
});
