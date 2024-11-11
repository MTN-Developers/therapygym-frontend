"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Input, DatePicker, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import registerBanner from "../../../assets/images/login-banner.svg";

import Link from "next/link";
import CountrySelect from "@/app/components/CountrySelect";
import { validationSchema } from "@/app/utils/RegisterationValidation";
import { RegisterFormData } from "@/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

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

  const onSubmit = async (data: RegisterFormData) => {
    // console.log("Form Data:", data); // Log form data

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
        {
          ...data,
          birthdate: dayjs(data.birthdate).format("YYYY-MM-DD"),
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
      <div className="w-screen min-h-screen p-[34px] flex items-center content-center">
        <div className="w-full h-full rounded-3xl flex justify-between ">
          <div className="flex items-center justify-center flex-1">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:w-[683px] min-h-[600px] w-[250px] flex flex-col items-center justify-center gap-y-4"
            >
              <div>
                <h1 className="text-[50px] text-[#0b7cf8] font-[700] font-sans">
                  Register
                </h1>
                <p className="text-center text-gray-600">
                  Join us and start your journey
                </p>
              </div>
              {/* Name */}
              <Controller
                control={control}
                name="name"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    className="max-w-[364px]"
                    size="large"
                    placeholder="Full Name"
                    prefix={<UserOutlined />}
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
                    className="max-w-[364px]"
                    size="large"
                    placeholder="Email"
                    prefix={<MailOutlined />}
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-[14px]">
                  {errors.email.message}
                </p>
              )}
              {/* Username */}
              <Controller
                control={control}
                name="username"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    className="max-w-[364px]"
                    size="large"
                    placeholder="Username"
                    prefix={<UserOutlined />}
                    {...field}
                  />
                )}
              />
              {errors.username && (
                <p className="text-red-500 text-[14px]">
                  {errors.username.message}
                </p>
              )}
              {/* Password */}
              <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field }) => (
                  <Input.Password
                    size="large"
                    className="max-w-[364px]"
                    placeholder="Password"
                    prefix={<LockOutlined />}
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-[14px]">
                  {errors.password.message}
                </p>
              )}
              {/* Confirm Password */}
              <Controller
                control={control}
                name="password_confirmation"
                defaultValue=""
                render={({ field }) => (
                  <Input.Password
                    size="large"
                    className="max-w-[364px]"
                    placeholder="Confirm Password"
                    prefix={<LockOutlined />}
                    {...field}
                  />
                )}
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-[14px]">
                  {errors.password_confirmation.message}
                </p>
              )}
              {/* Phone */}
              <Controller
                control={control}
                name="phone"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    className="max-w-[364px]"
                    size="large"
                    placeholder="Phone Number"
                    prefix={<PhoneOutlined />}
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
              {/* Work */}
              <Controller
                control={control}
                name="work"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    className="max-w-[364px]"
                    size="large"
                    placeholder="Occupation"
                    {...field}
                  />
                )}
              />
              {errors.work && (
                <p className="text-red-500 text-[14px]">
                  {errors.work.message}
                </p>
              )}
              {/* City */}
              <Controller
                control={control}
                name="city"
                defaultValue=""
                render={({ field }) => (
                  <Input
                    className="max-w-[364px]"
                    size="large"
                    placeholder="City"
                    {...field}
                  />
                )}
              />
              {errors.city && (
                <p className="text-red-500 text-[14px]">
                  {errors.city.message}
                </p>
              )}
              {/* Nationality */}
              <CountrySelect
                control={control}
                error={errors["nationality"]?.message as string}
                name={"nationality"}
              />
              {/* Birthdate */}
              <Controller
                control={control}
                name="birthdate"
                render={({ field }) => (
                  <DatePicker
                    className="max-w-[364px] w-full"
                    size="large"
                    placeholder="Birthdate"
                    format="YYYY-MM-DD"
                    disabledDate={(current) => {
                      // Disable today and future dates
                      return current && current >= dayjs().startOf("day");
                    }}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date ? date.toDate() : null)
                    }
                  />
                )}
              />
              {errors.birthdate && (
                <p className="text-red-500 text-[14px]">
                  {errors.birthdate.message}
                </p>
              )}
              {/* Register Button */}
              <Button
                type="primary"
                size="large"
                className="md:w-[364px] w-[250px]"
                htmlType="submit"
                loading={loading}
              >
                Register
              </Button>
              <Link
                href={"/login"}
                className="text-blue-400 hover:cursor-pointer hover:text-blue-600 underline"
              >
                Already have an account?
              </Link>
            </form>
          </div>
          <div className="lg:flex items-center hidden">
            <Image
              src={registerBanner}
              width={683}
              height={700}
              alt="banner image"
              style={{
                width: "683px",
                height: "600px",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default RegisterPage;
