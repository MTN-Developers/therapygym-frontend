"use client";

import React, { useState } from "react";
import ImgCrop from "antd-img-crop";
import { Upload, UploadFile, UploadProps } from "antd";
import type { RcFile } from "antd/es/upload";
import NextImage from "next/image";
import editIcon from "@/assets/images/edit-icon-2.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Image from "next/image";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import colseIcon from "@/assets/images/close-circle.svg";
import yellowTriangle from "@/assets/images/yellow-triangle.svg";
import * as yup from "yup";

// Define FormData with matching field types (using string for date_of_birth)
interface FormData {
  name: string;
  date_of_birth: string;
  bio: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

// Yup schema matching FormData types
// Update the Yup schema accordingly
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  date_of_birth: yup.string().required("Date of Birth is required"),
  bio: yup.string().notRequired(),
  facebook: yup.string().url("Must be a valid URL").notRequired(),
  twitter: yup.string().url("Must be a valid URL").notRequired(),
  instagram: yup.string().url("Must be a valid URL").notRequired(),
  linkedin: yup.string().url("Must be a valid URL").notRequired(),
});

const Page = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    defaultValues: {
      name: user.name || "",
      date_of_birth: user.date_of_birth || "", // Add a default value or make it optional in the type
      bio: user.bio || "",
      facebook: user.facebook || "",
      twitter: user.twitter || "",
      instagram: user.instagram || "",
      linkedin: user.linkedin || "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Values:", data);
  };

  const fields: { name: keyof FormData; label: string; type: string }[] = [
    { name: "name", label: "Name", type: "text" },
    { name: "date_of_birth", label: "Date of Birth", type: "date" },
    { name: "bio", label: "Bio", type: "text" },
    { name: "facebook", label: "Facebook", type: "text" },
    { name: "twitter", label: "Twitter", type: "text" },
    { name: "instagram", label: "Instagram", type: "text" },
    { name: "linkedin", label: "LinkedIn", type: "text" },
  ];

  return (
    <div className="p-4 w-full">
      <h2 className="text-[#164194] mb-4 text-3xl font-bold leading-normal">
        Edit Page
      </h2>
      <div className="flex items-end justify-between">
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
          <ImageUploader user={user} />
          <div className="flex max-w-[570px] mb-8 items-center justify-between">
            <h3 className='text-[#164194] [font-family:"Smooch_Sans"] text-lg lg:text-[32px] font-bold leading-[normal]'>
              Edit profile data
            </h3>
            <button
              type="submit"
              className="flex w-[127px] h-[42px] justify-center font-bold items-center gap-2.5 text-white bg-[#017AFD] rounded-md"
            >
              Update
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
                  {errors[field.name]?.message as string}
                </p>
              )}
            </div>
          ))}
        </form>
        <div className="hidden lg:flex text-center  flex-col items-center justify-center fixed bottom-4 right-4 p-4 rounded-lg shadow-sm border max-w-[260px] border-yellow-500">
          <Image
            src={colseIcon}
            alt="close"
            className="absolute top-4 right-4"
          />
          <Image src={yellowTriangle} alt="yellow triangle" />
          <p className="w-full">
            please notice that any changes made in the profile date or the
            profile section will be reflected on the main profile page instant
            so please make sure to update the right field{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;

interface Props {
  user: any;
}

const ImageUploader: React.FC<Props> = ({ user }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "defaultProfilePicture.jpg",
      url: "https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
      status: "done",
    },
  ]);

  const getSrcFromFile = (file: UploadFile): Promise<string> => {
    return new Promise((resolve) => {
      const originFile = file.originFileObj as RcFile;
      if (!originFile) return resolve("");
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(originFile);
    });
  };

  type UploadOnChangeParam = Parameters<
    NonNullable<UploadProps["onChange"]>
  >[0];

  const handleChange = async (info: UploadOnChangeParam) => {
    const newFileList = info.fileList;
    const updatedFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.url && file.originFileObj) {
          const src = await getSrcFromFile(file);
          return { ...file, url: src };
        }
        return file;
      })
    );
    setFileList(updatedFileList);
  };

  const handlePreview = async (file: UploadFile) => {
    const src = file.url || (await getSrcFromFile(file));
    if (!src) return;
    const imgWindow = window.open(src);
    if (imgWindow) {
      const imgElement = document.createElement("img");
      imgElement.src = src;
      imgWindow.document.write(imgElement.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  const currentImageUrl = fileList[fileList.length - 1]?.url;

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
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            onPreview={handlePreview}
            showUploadList={false}
            beforeUpload={() => false}
          >
            {currentImageUrl ? (
              <NextImage
                src={currentImageUrl}
                alt="User Image"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <span className="text-gray-500">No Image</span>
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
