import React from "react";
import pattern from "@/public/images/modalBackPattern.svg";
import Image from "next/image";
import uploadIcon from "@/public/images/uploadIcon.svg";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axiosInstance from "@/app/utils/axiosInstance";
import { message } from "antd";

type Props = {
  handleClose: () => void;
  giftId: string;
};

const ShareGiftModal = ({ handleClose, giftId }: Props) => {
  const [email, setEmail] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted with email:", email);
    if (email.length > 10) {
      try {
        const res = await axiosInstance.post(`user-gift/${giftId}/share`, {
          receiver: email,
        });
        console.log(res);
        if (res.status === 200 || res.status === 201) {
          message.success("Gift sent successfully");
          handleClose();
        } else {
          message.error("Something went wrong");
        }
        setEmail("");
      } catch (error) {
        console.log(error);
        message.error("Something went wrong");
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="absolute z-10 top-0 left-0  w-full h-full flex items-center justify-center "
    >
      <div className="w-full lg:w-[727px] p-4 lg:p-6  relative h-[446px] !overflow-hidden  !rounded-xl flex items-center justify-center">
        <Image
          src={pattern}
          alt="pattern"
          className="absolute top-0 left-0 !w-[800px] h-full object-cover"
        />
        <IoMdCloseCircleOutline
          onClick={handleClose}
          className="absolute top-6 right-3 lg:right-6 cursor-pointer"
          size={25}
        />
        <div className="z-20 lg:px-14 flex flex-col items-center justify-center gap-4">
          <Image
            src={uploadIcon}
            alt="uploadIcon"
            className="w-[100px] h-[100px] object-cover"
          />
          <h2 className="text-neutral-700 text-2xl font-bold">Share Gift</h2>
          <p className="text-stone-500 text-center text-base font-bold">
            You can share the complimentary gift with your friends by entering
            your friends Email .
          </p>
          <div className="w-full">
            <label
              htmlFor="email"
              className="relative mx-4 my-4 text-sm text-gray-400"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your friend email"
              className="w-full h-[50px] rounded-lg border border-[#00000010] px-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full h-[52px] rounded-lg bg-[#017afd] text-white text-2xl font-normal    "
          >
            Send Gift
          </button>
        </div>
      </div>
    </form>
  );
};

export default ShareGiftModal;
