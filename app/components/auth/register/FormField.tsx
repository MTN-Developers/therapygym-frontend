import { useTranslationContext } from "@/contexts/TranslationContext";
import React from "react";
import { Controller } from "react-hook-form";

// Form Field Component with Label
const FormField = ({
  control,
  name,
  error,
  component: Component,
  label,
  ...props
}) => {
  const { locale } = useTranslationContext();

  return (
    <div className="flex flex-col w-full relative mb-6">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className={`absolute -top-3 ${
            locale === "en" ? "left-4" : "right-4"
          }  bg-white px-1 text-gray-500 text-sm z-10`}
        >
          {label}
        </label>
      )}
      {/* Input Field */}
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field }) => (
          <Component
            {...field}
            id={name}
            {...props}
            className={`border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              props.className || ""
            }`}
          />
        )}
      />
      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
