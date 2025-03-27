"use client";
import React, { useState } from "react";
import { Steps, Button, message, Spin } from "antd";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useValidationSchema } from "@/app/utils/RegisterationValidation";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useCheckPhone } from "@/app/hooks/useCheckPhone";
import { setCookie } from "cookies-next";
import { useAppDispatch } from "@/app/store/store";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { LoadingOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import lockIcon from "@/assets/images/lock-icon.svg";
import { login } from "@/app/store/slices/authSlice";
import PaymentForm from "@/app/components/payment/PaymentForm";
import { Package, PackagesResponse } from "@/types/publicCoursePackages";

// Components
import CountryCodeSelect from "@/app/components/auth/CountryCodeSelect";
import FormField from "@/app/components/auth/register/FormField";
// import TermsAndPrivacy from "@/app/components/auth/register/TermsAndPrivacy";
import ChangeLanguage from "@/app/components/shared/ChangeLanguage";
import useSWR from "swr";
import { getOne } from "@/services/server";
import PaymentInvoice from "@/app/components/payment/PaymentInvoice";

const GENDER_OPTIONS = (t) => [
  { value: "male", label: t("Male") },
  { value: "female", label: t("Female") },
];

interface PromoCode {
  code: string;
  discount_percentage: number;
}

const PaymentStepper = ({
  selectedPackage,
  courseId,
  promoCodeList,
}: {
  selectedPackage: Package;
  courseId: string;
  promoCodeList: PromoCode[];
}) => {
  const [current, setCurrent] = useState(0);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [_registeredEmail, setRegisteredEmail] = useState("");
  const [_registeredPassword, setRegisteredPassword] = useState("");

  const dispatch = useAppDispatch();
  const { locale } = useTranslationContext();
  const t = useTranslations("RegisterPage");
  const loginT = useTranslations("Login");
  const paymentT = useTranslations("PaymentPage");
  const { handleCheckPhoneNumber } = useCheckPhone();

  const validationSchema = useValidationSchema();

  const {
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const commonInputClass =
    "lg:w-[590px] border border-[#8d8a8a] bg-transparent focus:bg-transparent h-[55px] font-bold";

  // Handle registration form submission
  const onRegisterSubmit = async (data) => {
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
          project_name: "normal_lead_TGS",
        }
      );

      if (response.status === 201 || response.status === 200) {
        message.success(t("RegistrationSuccess"));
        setRegisteredEmail(data.email);
        setRegisteredPassword(data.password);
        setIsRegistered(true);

        // Automatically login after registration
        await handleLogin(data.email, data.password);
      } else {
        message.error(t("RegistrationFailed"));
      }
    } catch (error) {
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
          message.error(errorMessage || t("UnexpectedError"));
        }
      } else {
        message.error(t("UnexpectedError"));
      }
    }
  };

  // Handle login form submission
  const handleLogin = async (email = loginEmail, password = loginPassword) => {
    setIsLoginLoading(true);
    try {
      const resultAction = await dispatch(login({ email, password }));

      if (login.fulfilled.match(resultAction)) {
        message.success(loginT("Login"));

        // Set cookies
        setCookie("access_token", resultAction.payload.access_token, {
          path: "/",
        });
        setCookie("refresh_token", resultAction.payload.refresh_token, {
          path: "/",
        });
        setCookie("user", resultAction.payload.user, { path: "/" });

        // Move to payment step
        setCurrent(1);
      } else {
        message.error(resultAction.payload as string);
      }
    } catch (err) {
      console.error("Login error:", err);
      // message.error(loginT("UnexpectedError"));
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  // Render steps content
  const steps = [
    {
      title: isRegistered ? loginT("Login") : t("SignUpNow"),
      content: isRegistered ? (
        // Login Form
        <div className="w-full">
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-y-4">
            <h1 className="text-[#2983EE] text-3xl font-bold">
              {loginT("Login")}
            </h1>
            <div className="flex items-center w-full justify-between">
              <h3
                className={`text-[#0573F6] ${
                  locale == "ar" ? "font-['Cairo']" : "font-['Inter']"
                } text-3xl font-bold leading-[normal]`}
              >
                {loginT("Welcome")}
              </h3>
              <ChangeLanguage />
            </div>
            <p className="text-start text-gray-600">
              {loginT("We are glad to see you back with us")}
            </p>
            <Input
              className="w-full lg:w-[590px] h-[52px]"
              size="large"
              placeholder={loginT("Email")}
              prefix={<UserOutlined />}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <Input.Password
              size="large"
              className="w-full lg:w-[590px] h-[52px]"
              placeholder={loginT("Password")}
              prefix={
                <Image src={lockIcon} alt="lock-icon" width={14} height={14} />
              }
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Button
              type="primary"
              size="large"
              className="w-full lg:w-[590px] h-[52px]"
              htmlType="submit"
              loading={isLoginLoading}
            >
              {loginT("Login")}
            </Button>
            <Button
              type="link"
              onClick={() => setIsRegistered(false)}
              className="text-gray-500 text-sm"
            >
              {loginT("Dont have an account?")} |{" "}
              <span className="text-blue-500">{loginT("SignUp")}</span>
            </Button>
          </form>
        </div>
      ) : (
        // Registration Form
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onRegisterSubmit)}
            className="flex flex-col items-start justify-start gap-y-3"
          >
            <div className="flex items-center w-full justify-between">
              <h1 className="text-3xl text-[#0b7cf8] font-[700]">
                {t("SignUpNow")}
              </h1>
              <ChangeLanguage />
            </div>

            <p className="text-start text-xl mb-4 text-gray-700">
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
            />

            <FormField
              control={control}
              name="gender"
              label={t("Gender")}
              error={errors.gender?.message}
              component={Select}
              allowClear
              optionFilterProp="label"
              className="h-[55px] w-full bg-transparent rounded-lg border border-[#8d8a8a] focus:bg-transparent lg:w-[590px]"
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

            {/* <TermsAndPrivacy t={t} /> */}

            <Button
              type="primary"
              size="large"
              className="w-full lg:w-[590px] h-[55px] my-3"
              htmlType="submit"
              loading={isSubmitting}
            >
              {t("CreateAccount")}
            </Button>

            <Button
              type="link"
              onClick={() => setIsRegistered(true)}
              className="text-gray-500 text-sm"
            >
              {t("AlreadyHaveAccount")}{" "}
              <span className="text-blue-500">{t("Login")}</span>
            </Button>
          </form>
        </div>
      ),
    },
    {
      title: paymentT("PayNow"),
      content: (
        <div className="w-full">
          <div className="flex flex-col gap-4 mb-6">
            <p className="text-[32px] items-center gap-2 lg:text-4xl font-['Cairo'] font-medium leading-[normal] tracking-[0.72px]">
              {paymentT("PayNow")}
            </p>

            <p className="w-fit flex items-center gap-2 max-w-full text-[#8D93A1] font-['Cairo'] text-xs font-normal leading-[150%] tracking-[0.24px]">
              {paymentT("EnterDetails")}
            </p>
          </div>

          <PaymentForm
            promoCodeList={promoCodeList}
            Package={selectedPackage}
            courseId={courseId}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Steps current={current} items={steps} className="mb-8" />
      <div className="steps-content">{steps[current].content}</div>
    </div>
  );
};

// Main Page Component
const Page = ({
  params,
}: {
  params: {
    packageId: string;
    id: string;
  };
}) => {
  const { id, packageId } = params;
  // const t = useTranslations("PaymentPage");
  const [promoCodeList, setPromoCodeList] = React.useState<PromoCode[]>([]);

  const { data, isLoading } = useSWR<PackagesResponse>(
    `/package/course/${id}`,
    getOne
  );

  const selectedPackage = data?.data?.find((packag) => packag.id === packageId);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spin indicator={<LoadingOutlined />} />
      </div>
    );
  }

  if (!data?.data && isLoading === false) {
    return <>No data available</>;
  }

  if (isLoading === false && selectedPackage?.id !== packageId) {
    return <>Package not found</>;
  }

  return (
    <div className="size-full min-h-screen flex-wrap px-4 py-10 lg:p-0 gap-0 flex justify-between h-fit bg-white rounded-lg shadow-md">
      <div className="w-full lg:w-1/2 min-h-[700px] h-fit lg:flex relative">
        <div
          className="absolute w-full"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: "transparent",
          }}
        >
          <PaymentInvoice
            promoCodeList={promoCodeList}
            setPromoCodeList={setPromoCodeList}
            packageData={selectedPackage as Package}
            courseId={id}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 py-[28px]">
        <div className="w-[620px] min-h-full h-fit p-4 max-w-full flex justify-center flex-col">
          {/* <div className="flex flex-col gap-4">
            <Image
              src={"/images/mtn-live.svg"}
              width={150}
              height={150}
              className="mb-4"
              alt="MTN Live"
            />
          </div> */}

          <PaymentStepper
            selectedPackage={selectedPackage as Package}
            courseId={id}
            promoCodeList={promoCodeList}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
