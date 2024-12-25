"use client";

import ImgCrop from "antd-img-crop";
import { Upload, UploadFile, UploadProps } from "antd";
import NextImage from "next/image";
import { UserData } from "@/types/profile";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import editIcon from "@/assets/images/edit-icon-2.svg";

interface ImageUploaderProps {
  userData: UserData;
  onFileChange: (_file: RcFile | null) => void;
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

export default ImageUploader;
