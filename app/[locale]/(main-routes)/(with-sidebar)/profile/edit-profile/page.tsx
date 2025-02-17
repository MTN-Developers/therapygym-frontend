"use client";

import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import type { RcFile } from "antd/es/upload";
import editIcon from "@/assets/images/edit-icon-2.svg";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/app/store/store";
import Image from "next/image";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { fetchUserProfile } from "@/app/store/slices/userProfileSlice";
import { useTranslations } from "next-intl";
import axiosInstance from "@/app/utils/axiosInstance";
import ImageUploader from "@/app/components/profile/ImageUploader";
import WarningBox from "@/app/components/profile/WarningBox";

interface FormData {
  name: string;
  date_of_birth: string;
  bio: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

const schema = yup.object().shape({
  name: yup.string().notRequired(),
  date_of_birth: yup.string().notRequired(),
  bio: yup.string().notRequired(),
  facebook: yup.string().url("Must be a valid URL").notRequired(),
  twitter: yup.string().url("Must be a valid URL").notRequired(),
  instagram: yup.string().url("Must be a valid URL").notRequired(),
  linkedin: yup.string().url("Must be a valid URL").notRequired(),
});

const Page = () => {
  const dispatch = useAppDispatch();
  const { userData, error, loading } = useSelector(
    (state: RootState) => state.userProfile
  );

  const [initialValues, setInitialValues] = useState<FormData>({
    name: "",
    date_of_birth: "",
    bio: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });

  const t = useTranslations("ProfilePages.Edit Page");
  const [showPopup, setShowPopup] = useState(false); // Initially hidden
  const [popupVisible, setPopupVisible] = useState(false); // For animation
  const [avatarFile, setAvatarFile] = useState<RcFile | null>(null);
  const [isModified, setIsModified] = useState(false); // State to track changes

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    defaultValues: initialValues,
  });

  const watchedFields = watch(); // Watch all form fields for changes

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    // Compare watched fields with userData to detect modifications
    const hasChanged = Object.keys(watchedFields).some((key) => {
      const fieldKey = key as keyof FormData;
      return watchedFields[fieldKey] !== (userData?.[fieldKey] || "");
    });
    setIsModified(hasChanged || Boolean(avatarFile)); // Also consider avatar changes
  }, [watchedFields, userData, avatarFile]);

  useEffect(() => {
    if (userData) {
      const newInitialValues = {
        name: userData?.name || "",
        date_of_birth: userData?.profile?.date_of_birth || "",
        bio: userData?.profile?.bio || "",
        facebook: userData?.profile?.facebook_url || "",
        twitter: userData?.profile?.x_url || "",
        instagram: userData?.profile?.instagram_url || "",
        linkedin: userData?.profile?.linkedin_url || "",
      };

      setInitialValues(newInitialValues);
      reset(newInitialValues);
    }
  }, [userData, reset]);

  useEffect(() => {
    const hasChanges = Object.keys(watchedFields).some((key) => {
      const fieldKey = key as keyof FormData;
      const currentValue = watchedFields[fieldKey];
      const initialValue = initialValues[fieldKey];

      // Check if the field has been modified and its value is different
      return dirtyFields[fieldKey] && currentValue !== initialValue;
    });

    setIsModified(hasChanges || Boolean(avatarFile));
  }, [watchedFields, initialValues, dirtyFields, avatarFile]);

  useEffect(() => {
    // Show the popup with animation after 2 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
      setPopupVisible(true); // Trigger animation
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const onSubmit = async (formData: FormData) => {
    try {
      // console.log("Starting form submission");
      const data = new FormData();

      // console.log("Avatar file state:", avatarFile);

      if (avatarFile) {
        // console.log("Appending avatar file:", avatarFile.name);
        data.append("image", avatarFile, avatarFile.name);
      }

      if (formData.name) data.append("name", formData.name);
      if (formData.date_of_birth) {
        const isoDOB = new Date(formData.date_of_birth).toISOString();
        data.append("date_of_birth", isoDOB);
      }
      if (formData.bio) data.append("bio", formData.bio);
      if (formData.facebook) data.append("facebook_url", formData.facebook);
      if (formData.twitter) data.append("x_url", formData.twitter);
      if (formData.instagram) data.append("instagram_url", formData.instagram);
      if (formData.linkedin) data.append("linkedin_url", formData.linkedin);

      console.log("Making API request with form data");
      const response = await axiosInstance.patch("/user", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API response:", response);

      dispatch(fetchUserProfile());
      setIsModified(false); // Reset modification state
    } catch (err) {
      console.error("Failed to update user data:", err);
    }
  };

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "date_of_birth", label: "Date of Birth", type: "date" },
    { name: "bio", label: "Bio", type: "text" },
    { name: "facebook", label: "Facebook", type: "text" },
    { name: "twitter", label: "Twitter", type: "text" },
    { name: "instagram", label: "Instagram", type: "text" },
    { name: "linkedin", label: "LinkedIn", type: "text" },
  ] as const;

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {loading && (
        <div className="h-screen grid place-items-center">
          <Spin />
        </div>
      )}
      {userData && !loading && (
        <div className="p-4 w-full">
          <h2 className="text-[#164194] mb-4 text-3xl font-bold leading-normal">
            {t("Edit Page")}
          </h2>

          <div className="flex items-end justify-between">
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
              <ImageUploader userData={userData} onFileChange={setAvatarFile} />

              <div className="flex max-w-[570px] mb-8 items-center justify-between">
                <h3 className='text-[#164194] [font-family:"Smooch_Sans"] text-lg lg:text-[32px] font-bold leading-[normal]'>
                  {t("Edit Profile Data")}
                </h3>
                <button
                  disabled={!isModified} // Disable if no changes are made
                  type="submit"
                  className={`flex w-[127px] h-[42px] justify-center font-bold ${
                    isModified
                      ? "text-white bg-[#017AFD] cursor-pointer"
                      : "bg-gray-300 text-white cursor-not-allowed"
                  } items-center gap-2.5  rounded-md`}
                >
                  {t("Update")}
                </button>
              </div>

              {fields.map((field) => (
                <div key={field.name} className="mb-6">
                  <div className="lg:max-w-[570px] max-w-full  border-2 rounded-lg min-h-[58px] p-0 flex items-center justify-between relative shadow-sm">
                    <span className="absolute -top-3 bg-white px-2 left-5 text-gray-500">
                      {field.label}
                    </span>
                    <input
                      type={field.type}
                      {...register(field.name)}
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
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name]?.message}
                    </p>
                  )}
                </div>
              ))}
            </form>
            {/* Warning box */}
            {showPopup && (
              <WarningBox
                popupVisible={popupVisible}
                setShowPopup={setShowPopup}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
