"use client";

import React, { useEffect, useState } from "react";
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
import axiosInstance from "@/app/utils/axiosInstance";
import WarningBox from "@/app/components/profile/WarningBox";

interface FormData {
  email: string;
  country: string;
  phone: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  country: yup.string().required("Country is required"),
  phone: yup.string().required("Phone is required"),
});

const Page = () => {
  const dispatch = useAppDispatch();
  const [showPopup, setShowPopup] = useState(false); // Initially hidden
  const [popupVisible, setPopupVisible] = useState(false); // For animation

  const { userData, error, loading } = useSelector(
    (state: RootState) => state.userProfile
  );
  const t = useTranslations("ProfilePages.AccountPage");

  // Add state for tracking initial values and modifications
  const [initialValues, setInitialValues] = useState<FormData>({
    email: "",
    country: "",
    phone: "",
  });
  const [isModified, setIsModified] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    defaultValues: initialValues,
  });

  const watchedFields = watch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    // Show the popup with animation after 2 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
      setPopupVisible(true); // Trigger animation
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Set initial values when userData is loaded
  useEffect(() => {
    if (userData) {
      const newInitialValues = {
        email: userData.email || "",
        country: userData.country || "",
        phone: userData.phone || "",
      };
      setInitialValues(newInitialValues);
      reset(newInitialValues);
    }
  }, [userData, reset]);

  // Track modifications
  useEffect(() => {
    const hasChanges = Object.keys(watchedFields).some((key) => {
      const fieldKey = key as keyof FormData;
      const currentValue = watchedFields[fieldKey];
      const initialValue = initialValues[fieldKey];

      // Check if the field has been modified and its value is different
      return dirtyFields[fieldKey] && currentValue !== initialValue;
    });

    setIsModified(hasChanges);
  }, [watchedFields, initialValues, dirtyFields]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        email: data.email,
        country: data.country,
        phone: data.phone,
      };

      await axiosInstance.patch("/user", payload);
      dispatch(fetchUserProfile());
      setIsModified(false); // Reset modification state after successful update
    } catch (err) {
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
          <button
            form="accountForm"
            type="submit"
            disabled={!isModified}
            className={`flex w-[127px] h-[42px] justify-center font-bold items-center gap-2.5 rounded-md ${
              isModified
                ? "text-white bg-[#017AFD] cursor-pointer"
                : "bg-gray-300 text-white cursor-not-allowed"
            }`}
          >
            {t("Update")}
          </button>
        </div>

        <form id="accountForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <div className="max-w-[570px] border-2 rounded-lg min-h-[58px] p-0 flex items-center justify-between relative shadow-sm">
              <span className="absolute -top-3 bg-white px-2 left-5 text-gray-500">
                email
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

          <div className="mb-6">
            <div className="max-w-[570px] border-2 rounded-lg min-h-[58px] p-0 flex items-center justify-between relative shadow-sm">
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

          <div className="mb-6">
            <div className="max-w-[570px] border-2 rounded-lg min-h-[58px] p-0 flex items-center justify-between relative shadow-sm">
              <span className="absolute -top-3 bg-white px-2 left-5 text-gray-500">
                phone
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
        {/* Warning box */}
        {showPopup && (
          <WarningBox popupVisible={popupVisible} setShowPopup={setShowPopup} />
        )}
      </div>
    )
  );
};

export default Page;
