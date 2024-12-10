import { useTranslations } from "next-intl";
import * as Yup from "yup";

export const useValidationSchema = () => {
  const t = useTranslations("SignupValidation");

  return Yup.object().shape({
    name: Yup.string().required(t("NameRequired")),
    email: Yup.string().email(t("InvalidEmail")).required(t("EmailRequired")),
    password: Yup.string()
      .min(8, t("PasswordMin"))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, t("PasswordPattern"))
      .required(t("PasswordRequired")),
    gender: Yup.string()
      .required(t("GenderRequired"))
      .oneOf(["male", "female"], t("GenderInvalid")),
    phone: Yup.string()
      .required(t("PhoneRequired"))
      .matches(/^\d+$/, t("PhoneDigitsOnly")),
    country: Yup.string().required(t("CountryRequired")),
    country_code: Yup.string().required(t("CountryCodeRequired")),
  });
};
