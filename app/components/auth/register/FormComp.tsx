"use client";
// register form component
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Input, Select } from "antd";

//impotrs from parent

import { useRouter, useSearchParams } from "next/navigation";
import { message } from "antd";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useValidationSchema } from "@/app/utils/RegisterationValidation";

import * as yup from "yup";
import { useTranslations } from "next-intl";

import { useCheckPhone } from "@/app/hooks/useCheckPhone";
import { TriggerLogin } from "@/app/utils/triggerLogin";
import { setCookie } from "cookies-next";
import { useAppDispatch } from "@/app/store/store";

// Components
import ChangeLanguage from "@/app/components/shared/ChangeLanguage";
import CountryCodeSelect from "@/app/components/auth/CountryCodeSelect";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

// Assets
import logo from "@/assets/images/logo-mtn-blank.svg";

import SocialMediaSection from "./SocialMediaSection";
import TermsAndPrivacy from "./TermsAndPrivacy";
import FormField from "./FormField";
import Vectors from "../../profile/Vectors";

const GENDER_OPTIONS = (t) => [
  { value: "male", label: t("Male") },
  { value: "female", label: t("Female") },
];

const FromComp = () => {
  const validationSchema = useValidationSchema();
  // const searchParams = useSearchParams();
  // const project_name
  const router = useRouter();
  const { handleCheckPhoneNumber } = useCheckPhone();

  const {
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  type RegisterFormData = yup.InferType<typeof validationSchema>;

  const dispatch = useAppDispatch();
  const t = useTranslations("RegisterPage");

  const { locale } = useTranslationContext();
  const searchParams = useSearchParams();
  const project_name = searchParams.get("project_name");
  const course_id = searchParams.get("course_id");
  const package_id = searchParams.get("package_id");

  const giftcode = searchParams.get("giftcode");

  console.log("code ", giftcode);

  const commonInputClass =
    "lg:w-[590px] border border-[#8d8a8a] bg-transparent focus:bg-transparent h-[55px] font-bold";

  const onSubmit = async (data: RegisterFormData) => {
    const fullPhone = `${data.country_code}${
      data.phone.startsWith("0") ? data.phone.slice(1) : data.phone
    }`;

    const { isPhoneValid, isMsgSent, status } = await handleCheckPhoneNumber({
      phoneNumber: fullPhone,
    });

    if (!isPhoneValid || !status) {
      setError("phone", {
        type: "manual",
        message:
          locale === "en" ? "Invalid phone number" : "رقم الهاتف غير صحيح",
      });
      return;
    }
    if (!isMsgSent) {
      setError("phone", {
        type: "manual",
        message:
          locale === "en"
            ? "This number does not have a whatsapp account"
            : "هذا الرقم لا يحتوي علي حساب واتساب",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          country_code: data.country_code,
          country: data.country,
          gender: data.gender,
          ...(project_name
            ? { project_name: project_name }
            : {
                project_name: "normal_lead_TGS",
              }),
        }
      );

      console.log("response", response);

      if (response.status === 201 || response.status === 200) {
        message.success(t("RegistrationSuccess"));
        TriggerLogin({
          dispatch: dispatch,
          message,
          router,
          ...(course_id ? { course_id: course_id } : {}), // if course_id exists, add it to the object
          setCookie: setCookie,
          ...(package_id
            ? {
                package_id: package_id,
              }
            : {}),
          user: {
            email: data.email,
            password: data.password,
          },
          giftcode: giftcode,
        });
      } else if (response.status === 409) {
        message.error("Email or phone already exists");
      } else {
        message.error(t("RegistrationFailed"));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.errors) {
          const errors = error.response?.data?.errors;
          for (const key in errors) {
            const errorMessages = errors[key];
            errorMessages.forEach((msg) => {
              message.error(`Error for ${key}: ${msg}`);
            });
          }
        } else {
          const errorMessage = error.response?.data?.error;
          // message.error(errorMessage || t("UnexpectedError"));
          console.log("errorMessage", errorMessage);

          message.error("Email or phone already exists");
        }
      } else {
        message.error(t("UnexpectedError"));
      }
    } finally {
      // setLoading(false);
    }
  };
  return (
    <div className="relative flex overflow-hidden justify-center items-center lg:items-start lg:justify-start flex-1 lg:bg-none">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col pt-[20px] px-[18px] my-auto lg:px-[100px] items-start justify-start gap-y-1"
      >
        <Image src={logo} alt="logo" className="lg:hidden block z-10" />

        <div className="flex items-center w-full justify-between !z-10">
          <h1 className="text-4xl lg:mb-4 lg:text-[50px]  text-[#0b7cf8] font-[700]">
            {t("SignUpNow")}
          </h1>
          <ChangeLanguage />
        </div>

        <p className="text-start lg:text-[32px] text-2xl mb-4 text-gray-700">
          {t("WelcomeMessage")}
        </p>

        <FormField
          control={control}
          name="name"
          label={t("FirstName")}
          error={errors.name?.message}
          className={commonInputClass}
          component={Input}
          size="large"
        />

        <FormField
          control={control}
          name="email"
          label={t("EmailAddress")}
          error={errors.email?.message}
          component={Input}
          className={commonInputClass}
          size="large"
          // placeholder={t("EmailAddress")}
        />

        <FormField
          control={control}
          name="gender"
          label={t("Gender")}
          error={errors.gender?.message}
          component={Select}
          // placeholder={t("Gender")}
          allowClear
          optionFilterProp="label"
          className="h-[55px] w-full bg-transparent rounded-lg border  border-[#8d8a8a] focus:bg-transparent lg:w-[590px]"
          options={GENDER_OPTIONS(t)}
        />

        <div
          className={`flex flex-col-reverse ${
            locale === "en" ? "lg:flex-row-reverse" : "lg:flex-row"
          } w-full items-center justify-between gap-4`}
        >
          <div className="w-full">
            <FormField
              control={control}
              name="phone"
              error={errors.phone?.message}
              label={t("PhoneNumber")}
              component={Input}
              className="w-full bg-transparent border border-[#8d8a8a] focus:bg-transparent h-[55px] font-bold"
              size="large"
              // placeholder={t("PhoneNumber")}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setValue("phone", value);
              }}
            />
          </div>
          <CountryCodeSelect
            control={control}
            name="country_code"
            setValue={setValue}
            error={errors.country_code?.message}
          />
        </div>

        <FormField
          control={control}
          name="password"
          label={t("Password")}
          error={errors.password?.message}
          component={Input.Password}
          className={commonInputClass}
          size="large"
        />

        <TermsAndPrivacy t={t} />

        <Button
          type="primary"
          size="large"
          className="lg:w-[590px] w-full h-[55px] my-3 text-[26px] z-10"
          htmlType="submit"
          loading={isSubmitting}
        >
          {t("CreateAccount")}
        </Button>

        <SocialMediaSection t={t} />

        <Link
          href={`/login/${course_id ? `?redirect=/courses/${course_id}` : ""}${
            package_id ? `?package_id=${package_id}` : ""
          }`}
          className="text-gray-700 z-10 w-full text-center hover:cursor-pointer hover:text-blue-600 underline"
        >
          {t("AlreadyHaveAccount")}{" "}
          <span className="text-blue-500 underline">{t("Login")}</span>
        </Link>
      </form>

      <Vectors />
    </div>
  );
};

export default FromComp;
