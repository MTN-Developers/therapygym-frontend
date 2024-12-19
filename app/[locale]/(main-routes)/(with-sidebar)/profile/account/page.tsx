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

interface FormData {
  email: string;
  country: string;
  phone: string;
}

// Updated schema with country and phone fields
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

  const {
    register,
    handleSubmit,
    control,
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

  const onSubmit = (data: FormData) => {
    console.log("Updated data:", data);
    // Handle your update logic here (e.g., dispatch another thunk with updated data)
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    userData && (
      <div className="p-4 w-full">
        <h2 className="text-[#164194] mb-4 text-2xl lg:text-4xl font-bold leading-normal">
          Account Page
        </h2>

        <div className="flex max-w-[570px] mb-8 items-center justify-between">
          <h3 className="text-[#164194] font-bold text-lg lg:text-[28px] leading-normal">
            Edit Account
          </h3>
          <button
            form="accountForm"
            type="submit"
            className="flex w-[127px] h-[42px] justify-center font-bold items-center gap-2.5 text-white bg-[#017AFD] rounded-md"
          >
            Update
          </button>
        </div>

        <form id="accountForm" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-6">
            <div className="max-w-[570px] border-2 rounded-lg min-h-[58px] p-0 flex items-center justify-between relative shadow-sm">
              <span className="absolute -top-3 bg-white px-2 left-5 text-gray-500">
                Email
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
          <div className="mb-6 max-w-[570px] border-2 rounded-lg min-h-[58px] p-0 flex items-center justify-between relative ">
            <CountrySelect
              control={control}
              error={errors["country"]?.message as string}
              name={"country"}
            />
          </div>

          {/* Phone Field */}
          <div className="mb-6">
            <div className="max-w-[570px] border-2 rounded-lg min-h-[58px] p-0 flex items-center justify-between relative shadow-sm">
              <span className="absolute -top-3 bg-white px-2 left-5 text-gray-500">
                Phone
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
