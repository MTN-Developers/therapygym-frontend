import * as Yup from "yup";

// Validation schema
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      "Password must include lowercase, uppercase, and special character"
    )
    .required("Password is required"),
  gender: Yup.string()
    .required("Select Your Gender")
    .oneOf(["male", "female"], "Gender must be either male or female"),
  phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^\d+$/, "Phone Number must contain only digits"),
  country: Yup.string().required("Nationality is required"),
});
