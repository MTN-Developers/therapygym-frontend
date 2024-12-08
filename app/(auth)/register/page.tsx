"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import loginBannerMob from "../../../assets/images/login-banner-mob.png";
import loginBanner from "../../../assets/images/login-banner.jpg";
import logo from "@/assets/images/logo-mtn-blank.svg";
import facebook from "@/assets/images/facebook.svg";
import twitter from "@/assets/images/Twitter.svg";
import google from "@/assets/images/google.svg";

import { useRouter } from "next/navigation";
import { Button, Input, message, Select } from "antd";

import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Link from "next/link";
import CountrySelect from "@/app/components/auth/CountrySelect";
import { validationSchema } from "@/app/utils/RegisterationValidation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import * as yup from "yup";
const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // console.log("Validation Errors:", errors); // Log validation errors

  type RegisterFormData = yup.InferType<typeof validationSchema>;

  const onSubmit = async (data: RegisterFormData) => {
    // console.log("Form Data:", data); // Log form data

    setLoading(true);

    try {
      console.log("sent data was", data);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          country: data.country,
          gender: data.gender,
        }
      );

      if (response.status === 201 || response.status === 200) {
        message.success("Registration successful");
        router.push("/login");
      } else {
        message.error("Registration failed");
      }
    } catch (error: unknown) {
      console.error("Registration error:", error);
      // Extract and display the error message
      // Handle Axios errors
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.error;
          message.error(
            errorMessage || "An error occurred during registration"
          );
        } else {
          message.error("An error occurred during registration");
        }
      } else {
        message.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    if (isAuthenticated) {
      router.push("/dashboard");
      setLoader(false);
    }
    setLoader(false);
  }, [router, isAuthenticated]);

  if (loader) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen lg:h-screen  flex items-center justify-center">
        <div className="w-full h-full rounded-3xl flex flex-col-reverse lg:flex lg:flex-row-reverse  lg:justify-between ">
          <div className="flex justify-center items-center lg:items-start lg:justify-start flex-1 bg-gradient-to-br from-blue-400 to-white lg:bg-none">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="    flex flex-col pt-[20px]   px-[18px] lg:px-[58px] items-start justify-start gap-y-3"
            >
              <Image src={logo} alt="logo" className="lg:hidden block" />
              <div>
                <h1 className="text-4xl lg:mb-6 lg:text-[50px] [font-family:'Smooch_Sans'] text-[#0b7cf8] font-[700] ">
                  Sign up now
                </h1>
                <p className="text-start text-[32px] text-white lg:text-gray-700">
                  Welcome to mtn live{" "}
                </p>
              </div>
              {/* Name */}
              <Controller
                control={control}
                name="name"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    className="lg:w-[590px] border border-[#8d8a8a] bg-transparent focus:bg-transparent h-[55px] font-bold"
                    size="large"
                    placeholder="First name"
                    // prefix={<UserOutlined />}
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500  text-[14px]">
                  {errors.name.message}
                </p>
              )}
              {/* Email */}
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    className="lg:w-[590px] border border-[#8d8a8a] h-[55px] bg-transparent focus:bg-transparent font-bold"
                    size="large"
                    placeholder="Email Address"
                    // prefix={<MailOutlined />}
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-[14px]">
                  {errors.email.message}
                </p>
              )}
              {/* Gender */}
              {/* <Controller
                control={control}
                name="gender"
                defaultValue=""
                render={({ field }) => (
                  <Select
                    placeholder="Select a person"
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="label"
                    className="h-[55px] w-full bg-transparent rounded-lg border border-[#8d8a8a] focus:bg-transparent lg:w-[590px]"
                    onChange={(value) => field.onChange(value)}
                    options={[
                      {
                        value: "jack",
                        label: "Jack",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
                )}
              /> */}
              <Controller
                control={control}
                name="gender"
                defaultValue=""
                render={({ field }) => (
                  <Select
                    placeholder="Gender"
                    allowClear
                    optionFilterProp="label"
                    className="h-[55px] w-full bg-transparent rounded-lg border border-[#8d8a8a] focus:bg-transparent lg:w-[590px]"
                    onChange={(value) => field.onChange(value)}
                    options={[
                      {
                        value: "male",
                        label: "Male",
                      },
                      {
                        value: "female",
                        label: "Female",
                      },
                    ]}
                  />
                )}
              />
              {errors.gender && (
                <p className="text-red-500 text-[14px]">
                  {errors.gender.message}
                </p>
              )}
              <div className="flex flex-col-reverse lg:flex-row-reverse w-full items-center justify-between gap-4">
                {/* Phone */}
                <div className="w-full">
                  <Controller
                    control={control}
                    name="phone"
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        className="w-full bg-transparent border border-[#8d8a8a] focus:bg-transparent h-[55px] font-bold"
                        size="large"
                        placeholder="Phone Number"
                        // prefix={<PhoneOutlined />}
                        value={field.value}
                        onChange={(e) => {
                          // Filter out non-numeric characters
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-[14px]">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Nationality */}
                <CountrySelect
                  control={control}
                  error={errors["country"]?.message as string}
                  name={"country"}
                />
              </div>
              {/* Password */}
              <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field }) => (
                  <Input.Password
                    size="large"
                    className="lg:w-[590px] border border-[#8d8a8a] !bg-transparent !focus:bg-transparent h-[55px] font-bold"
                    placeholder="Password"
                    // prefix={<LockOutlined />}
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-[14px]">
                  {errors.password.message}
                </p>
              )}
              <p className="w-full text-center text-sm text-gray-500">
                By signing up you agree to mtn{" "}
                <span className="text-blue-500 underline">
                  terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-blue-500 underline">privacy policy</span>{" "}
              </p>
              <Button
                type="primary"
                size="large"
                className="lg:w-[590px] w-full h-[55px] text-[26px]  "
                htmlType="submit"
                loading={loading}
              >
                Create Account
              </Button>
              <div className="flex w-full flex-col gap-4 items-center justify-center lg:hidden mb-[20px] ">
                <p className="text-gray-500">or</p>
                <div className="flex w-full items-center justify-center gap-[48px]">
                  <Image src={twitter} alt="twitter" />
                  <Image src={facebook} alt="facebook" />
                  <Image src={google} alt="google" />
                </div>
              </div>
              <Link
                href={"/login"}
                className="text-gray-700 w-full text-center hover:cursor-pointer hover:text-blue-600 underline"
              >
                Already have an account?{" "}
                <span className="text-blue-500 underline ">Log in</span>
              </Link>
            </form>
          </div>
          <div className="hidden lg:flex  items-center  ">
            <Image
              src={loginBanner}
              width={683}
              height={700}
              alt="banner image"
              className="w-auto object-cover hidden lg:block h-screen"
            />
            <Image
              src={loginBannerMob}
              alt="banner mob"
              className="w-full lg:hidden"
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default RegisterPage;
