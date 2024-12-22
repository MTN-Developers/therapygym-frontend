// "use client";

// import { yupResolver } from "@hookform/resolvers/yup";
// import Image from "next/image";
// import React, { useState } from "react";
// import { Resolver, useForm } from "react-hook-form";
// import editIcon from "@/assets/images/edit-icon-2.svg";
// import eyeIcon from "@/assets/images/eye-icon.svg";
// import * as yup from "yup";
// import { useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";

// interface FormData {
//   oldPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// }

// const SetNewPass = () => {
//   // State to track password visibility for each field
//   const [passwordVisibility, setPasswordVisibility] = useState<
//     Record<string, boolean>
//   >({
//     oldPassword: false,
//     newPassword: false,
//     confirmPassword: false,
//   });

//   const router = useRouter();


//   const t = useTranslations("ResetPasswordPage");
//   const tValidation = useTranslations("ResetPasswordValidation");

//   const schema = yup.object().shape({
//     oldPassword: yup.string().required("Old password is required"),
//     newPassword: yup
//       .string()
//       .required(tValidation("PasswordRequired"))
//       .min(8, tValidation("PasswordMin"))
//       .matches(/[A-Z]/, tValidation("PasswordUppercase"))
//       .matches(/[a-z]/, tValidation("PasswordLowercase"))
//       .matches(/[0-9]/, tValidation("PasswordNumber"))
//       .matches(/[!@#$%^&*(),.?":{}|<>]/, tValidation("PasswordSpecial")),
//     confirmPassword: yup
//       .string()
//       .required(tValidation("ConfirmPasswordRequired"))
//       .oneOf([yup.ref("newPassword")], tValidation("PasswordsMustMatch")),
//   });

//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: yupResolver(schema) as Resolver<FormData>,
//     defaultValues: {},
//   });

//   const fields: { name: keyof FormData; label: string }[] = [
//     { name: "oldPassword", label: "Old Password" },
//     { name: "newPassword", label: "New Password" },
//     { name: "confirmPassword", label: "Confirm Password" },
//   ];

//   const togglePasswordVisibility = (fieldName: keyof FormData) => {
//     setPasswordVisibility((prev) => ({
//       ...prev,
//       [fieldName]: !prev[fieldName],
//     }));
//   };

//   const onSubmit = async (data: FormData) => {
//     console.log("Form Values:", data);
//     try {
//         await schema.validate({confirmPassword, newPassword});


//     } catch (error) {
        
//     }
//   };

//   return (
//     <div className="p-4 max-w-[570px] border-2 border-gray-200 bg-[#f7f7f7] rounded-xl shadow-sm">
//       <h3 className="text-[#164194] font-bold mb-8 text-lg lg:text-xl leading-normal">
//         Set New Password
//       </h3>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {fields.map((field) => {
//           const isVisible = passwordVisibility[field.name];
//           return (
//             <div key={field.name} className="mb-6">
//               <div className="max-w-[570px] border-2 rounded-lg min-h-[58px] p-0 flex items-center justify-between relative shadow-sm">
//                 <span className="absolute font-bold -top-3 bg-[#f7f7f7] px-2 left-5 text-gray-500">
//                   {field.label}
//                 </span>
//                 <input
//                   type={isVisible ? "text" : "password"}
//                   {...register(field.name)}
//                   className="border-none bg-[#f7f7f7] focus:outline-none focus:ring-0 !min-h-[56px] rounded-lg px-4 flex-1"
//                 />
//                 <Image
//                   src={eyeIcon}
//                   alt="see password"
//                   width={16}
//                   height={16}
//                   className="mx-4 cursor-pointer"
//                   onClick={() => togglePasswordVisibility(field.name)}
//                 />
//               </div>
//               {errors[field.name] && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors[field.name]?.message as string}
//                 </p>
//               )}
//             </div>
//           );
//         })}
//         <button
//           type="submit"
//           className="flex ms-auto w-[127px] h-[42px] justify-center font-bold items-center gap-2.5 text-white bg-[#017AFD] rounded-md"
//         >
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SetNewPass;
