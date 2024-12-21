"use client";

import React, { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { Spin, Upload, UploadFile, UploadProps } from "antd";
import type { RcFile } from "antd/es/upload";
import NextImage from "next/image";
import editIcon from "@/assets/images/edit-icon-2.svg";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/app/store/store";
import Image from "next/image";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import colseIcon from "@/assets/images/close-circle.svg";
import yellowTriangle from "@/assets/images/yellow-triangle.svg";
import * as yup from "yup";
import { fetchUserProfile } from "@/app/store/slices/userProfileSlice";
import { UserData } from "@/types/profile";
import { useTranslations } from "next-intl";
import axiosInstance from "@/app/utils/axiosInstance";

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

  const t = useTranslations("ProfilePages.Edit Page");
  const [showPopup, setShowPopup] = useState(true);
  const [avatarFile, setAvatarFile] = useState<RcFile | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    defaultValues: {
      name: "",
      date_of_birth: "",
      bio: "",
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      reset({
        name: userData?.name || "",
        date_of_birth: userData?.profile?.date_of_birth || "",
        bio: userData?.profile?.bio || "",
        facebook: userData?.profile?.facebook_url || "",
        twitter: userData?.profile?.x_url || "",
        instagram: userData?.profile?.instagram_url || "",
        linkedin: userData?.profile?.linkedin_url || "",
      });
    }
  }, [userData, reset]);

  const onSubmit = async (formData: FormData) => {
    try {
      console.log("Starting form submission");
      const data = new FormData();

      console.log("Avatar file state:", avatarFile);

      if (avatarFile) {
        console.log("Appending avatar file:", avatarFile.name);
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
                  type="submit"
                  className="flex w-[127px] h-[42px] justify-center font-bold items-center gap-2.5 text-white bg-[#017AFD] rounded-md"
                >
                  {t("Update")}
                </button>
              </div>

              {fields.map((field) => (
                <div key={field.name} className="mb-6">
                  <div className="max-w-[570px] border-2 rounded-lg min-h-[58px] p-0 flex items-center justify-between relative shadow-sm">
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

            {showPopup && (
              <div className="hidden bg-white lg:flex text-center flex-col items-center justify-center fixed bottom-4 right-4 p-4 rounded-lg shadow-sm border max-w-[260px] border-yellow-500">
                <Image
                  src={colseIcon}
                  alt="close"
                  className="absolute top-4 cursor-pointer right-4"
                  onClick={() => setShowPopup(false)}
                />
                <Image src={yellowTriangle} alt="yellow triangle" />
                <p className="w-full">{t("Warning")}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;

interface ImageUploaderProps {
  userData: UserData;
  onFileChange: (file: RcFile | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  userData,
  onFileChange,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "defaultProfilePicture.jpg",
      url: userData.profile?.avatar || "https://via.placeholder.com/110",
      status: "done",
    },
  ]);

  // Converts a file to a base64 dataURL for immediate preview
  const getSrcFromFile = (file: UploadFile): Promise<string> => {
    return new Promise((resolve) => {
      const originFile = file.originFileObj as RcFile;
      if (!originFile) return resolve("");
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(originFile);
    });
  };

  const handleChange: UploadProps["onChange"] = async (info) => {
    // We only want 1 file in the list, so take the last item
    let updatedFileList = info.fileList.slice(-1);

    // Convert any new file to a dataURL so we can display it immediately
    if (updatedFileList.length > 0) {
      const lastFile = updatedFileList[0];
      if (!lastFile.url && lastFile.originFileObj) {
        const src = await getSrcFromFile(lastFile);
        lastFile.url = src; // Assign the dataURL to file.url
      }
    }

    // Update local state
    setFileList(updatedFileList);

    // If user has at least one file, pass the raw file up
    if (updatedFileList.length > 0 && updatedFileList[0].originFileObj) {
      onFileChange(updatedFileList[0].originFileObj as RcFile);
    } else {
      onFileChange(null);
    }
  };

  const handlePreview: UploadProps["onPreview"] = async (file) => {
    // open a new tab with the full-size preview
    const url = file.url || (await getSrcFromFile(file));
    if (!url) return;
    window.open(url, "_blank");
  };

  const currentImageUrl = fileList[0]?.url;

  return (
    <div className="relative w-fit mb-6">
      <div className="relative w-[110px] h-[110px] rounded-full overflow-hidden flex items-center justify-center bg-gray-200 shadow-sm">
        <ImgCrop
          cropShape="round"
          showGrid
          rotationSlider
          aspectSlider
          showReset
        >
          <Upload
            listType="picture-card"
            multiple={false}
            maxCount={1}
            fileList={fileList}
            onChange={handleChange}
            onPreview={handlePreview}
            showUploadList={false}
            beforeUpload={() => false} // Don't auto-upload
          >
            {currentImageUrl ? (
              <NextImage
                src={currentImageUrl}
                alt="User Image"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500">
                No Image
              </div>
            )}
          </Upload>
        </ImgCrop>
      </div>
      <button
        type="button"
        className="absolute bottom-0 right-0 w-6 h-6 rounded-md shadow-sm flex items-center justify-center"
      >
        <NextImage
          src={editIcon}
          alt="Edit"
          width={16}
          height={16}
          className="text-blue-400"
        />
      </button>
    </div>
  );
};
