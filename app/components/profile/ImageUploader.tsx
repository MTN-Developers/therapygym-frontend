import { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import NextImage from "next/image";
import axiosInstance from "@/app/utils/axiosInstance";
import "react-image-crop/dist/ReactCrop.css";
import { RcFile } from "antd/es/upload";
import editIcon from "@/assets/images/edit-icon-2.svg";
import { fetchUserProfile } from "@/app/store/slices/userProfileSlice";
import { useAppDispatch } from "@/app/store/store";

interface ImageUploaderProps {
  userData: { profile: { avatar: string } };
  onFileChange: (_file: RcFile | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  userData,
  onFileChange,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    userData.profile?.avatar || "https://via.placeholder.com/110"
  );
  const [showCropModal, setShowCropModal] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    width: 300,
    height: 300,
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modalImage, setModalImage] = useState<string>("");
  const dispatch = useAppDispatch();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setModalImage(reader.result?.toString() || "");
        setShowCropModal(true);
      });
      reader.readAsDataURL(e.target.files[0]);
      setSelectedFile(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const crop = centerAspectCrop(width, height);
    setCrop(crop);
  };

  const centerAspectCrop = (mediaWidth: number, mediaHeight: number): Crop => {
    const cropWidth = Math.min(300, mediaWidth);
    const cropHeight = Math.min(300, mediaHeight);

    return {
      unit: "px" as const, // Explicitly set as a literal type
      width: cropWidth,
      height: cropHeight,
      x: (mediaWidth - cropWidth) / 2,
      y: (mediaHeight - cropHeight) / 2,
    };
  };

  const getCroppedImg = async (
    image: HTMLImageElement,
    crop: PixelCrop
  ): Promise<Blob> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
        },
        "image/jpeg",
        1
      );
    });
  };

  const handleCropComplete = async () => {
    if (!imgRef.current || !completedCrop || !selectedFile) return;

    try {
      const croppedBlob = await getCroppedImg(imgRef.current, completedCrop);
      const file = new File([croppedBlob], selectedFile.name, {
        type: "image/jpeg",
      });

      const previewUrl = URL.createObjectURL(croppedBlob);
      setPreviewUrl(previewUrl);
      onFileChange(file as RcFile);

      // Make API request to upload the cropped image
      const formData = new FormData();
      formData.append("image", file);

      await axiosInstance.patch("/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowCropModal(false);
      dispatch(fetchUserProfile()); // Update user profile after successful crop and upload
    } catch (e) {
      console.error("Error creating crop:", e);
    }
  };

  return (
    <div className="relative w-fit mb-6">
      <div className="relative w-[110px] h-[110px] rounded-full overflow-hidden flex items-center justify-center bg-gray-200 shadow-sm">
        <div className="relative w-full h-full">
          <NextImage
            src={previewUrl}
            alt="User Image"
            fill
            className="object-cover"
          />
          <input
            ref={fileInputRef}
            type="file"
            onChange={onSelectFile}
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
      <button
        type="button"
        className="absolute bottom-0 right-0 w-6 h-6 rounded-md shadow-sm flex items-center justify-center"
        onClick={() => fileInputRef.current?.click()}
      >
        <NextImage
          src={editIcon}
          alt="Edit"
          width={16}
          height={16}
          className="text-blue-400"
        />
      </button>

      {/* Crop Modal */}
      {showCropModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Edit Image</h3>
            <div className="max-h-[60vh] overflow-auto mb-4">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                circularCrop
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={modalImage}
                  onLoad={onImageLoad}
                  className="object-contain   max-w-full"
                />
              </ReactCrop>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md"
                onClick={() => setShowCropModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleCropComplete}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
