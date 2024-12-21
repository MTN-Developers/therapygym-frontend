"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/app/store/store";
import { fetchUserProfile } from "@/app/store/slices/userProfileSlice";
import { Spin } from "antd";
import Image from "next/image";
import editIcon from "@/assets/images/edit-icon-2.svg";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CountrySelect from "@/app/components/auth/CountrySelect";
import { useTranslations } from "next-intl";
import axiosInstance from "@/app/utils/axiosInstance"; // Adjust path if needed

interface FormData {
  email: string;
  country: string;
  phone: string;
}

// Validation schema for email, country, phone
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  country: yup.string().required("Country is required"),
  phone: yup.string().required("Phone is required"),
});

const Page = () => {
  const dispatch = useAppDispatch();
  const { userData, error, loading } = useSelector(
    (state: RootState) => state.userProfile
  );

  // Localization
  const t = useTranslations("ProfilePages.AccountPage");

  const {
    register,
    handleSubmit,
    control, // For CountrySelect
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    defaultValues: {
      email: "",
      country: "",
      phone: "",
    },
  });

  // Fetch user info on mount
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Once userData is available, reset the form fields
  useEffect(() => {
    if (userData) {
      reset({
        email: userData.email || "",
        country: userData.country || "",
        phone: userData.phone || "",
      });
    }
  }, [userData, reset]);

  // Submit handler: send a PATCH to /user
  const onSubmit = async (data: FormData) => {
    try {
      // The payload structure depends on your backend.
      // If it expects { email, country, phone }, send exactly that.
      const payload = {
        email: data.email,
        country: data.country,
        phone: data.phone,
      };

      // Make a PATCH request to update user
      await axiosInstance.patch("/user", payload);

      // Refresh user profile in Redux
      dispatch(fetchUserProfile());
    } catch (err) {
      // Handle error, e.g., show a notification or log to console
      console.error("Failed to update account info:", err);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    userData && (
      <div className="p-4 w-full">
        <h2 className="text-[#164194] mb-4 text-2xl lg:text-4xl font-bold leading-normal">
          {t("Account")}
        </h2>

        <div className="flex max-w-[570px] mb-8 items-center justify-between">
          <h3 className="text-[#164194] font-bold text-lg lg:text-[28px] leading-normal">
            {t("Edit Account")}
          </h3>
          {/* We bind form="accountForm" so the button triggers onSubmit */}
          <button
            form="accountForm"
            type="submit"
            className="flex w-[127px] h-[42px] justify-center font-bold items-center gap-2.5 text-white bg-[#017AFD] rounded-md"
          >
            {t("Update")}
          </button>
        </div>

        <form id="accountForm" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-6">
            <div className="max-w-[570px] border-2 rounded-lg min-h-[58px] p-0 flex items-center justify-between relative shadow-sm">
              <span className="absolute -top-3 bg-white px-2 left-5 text-gray-500">
                {/* {t("Email")} e.g., localize "Email" */} email
              </span>
              <input
                type="email"
                {...register("email")}
                className="border-none focus:outline-none focus:ring-0 !min-h-[56px] rounded-lg px-4 flex-1"
              />
              <Image
                src={editIcon}
                alt="edit"
                width={16}
                height={16}
                className="mx-4"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Country Field */}
          <div className="mb-6">
            <div className="max-w-[570px] border-2 rounded-lg min-h-[58px] p-0 flex items-center justify-between relative shadow-sm">
              {/* If you have a localized label, use t("Country") here */}
              <CountrySelect
                control={control}
                error={errors["country"]?.message as string}
                name={"country"}
              />
              <Image
                src={editIcon}
                alt="edit"
                width={16}
                height={16}
                className="mx-4"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="mb-6">
            <div className="max-w-[570px] border-2 rounded-lg min-h-[58px] p-0 flex items-center justify-between relative shadow-sm">
              <span className="absolute -top-3 bg-white px-2 left-5 text-gray-500">
                {/* {t("Phone")} */} phone
              </span>
              <input
                type="text"
                {...register("phone")}
                className="border-none focus:outline-none focus:ring-0 !min-h-[56px] rounded-lg px-4 flex-1"
              />
              <Image
                src={editIcon}
                alt="edit"
                width={16}
                height={16}
                className="mx-4"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </form>
      </div>
    )
  );
};

export default Page;
