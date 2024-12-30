"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { message } from "antd";
import * as Yup from "yup";
import axiosInstance from "@/app/utils/axiosInstance";
import axios from "axios";
import { useTranslations } from "next-intl";
import ChangeLanguage from "@/app/components/shared/ChangeLanguage";
import Link from "next/link";

// ResetPasswordPage Component
const Page = () => {
  const t = useTranslations("ResetPasswordPage");
  const tValidation = useTranslations("ResetPasswordValidation");

  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validation schema for passwords
  const passwordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required(tValidation("PasswordRequired"))
      .min(8, tValidation("PasswordMin")),
    // .matches(/[A-Z]/, tValidation("PasswordUppercase"))
    // .matches(/[a-z]/, tValidation("PasswordLowercase"))
    // .matches(/[0-9]/, tValidation("PasswordNumber")),
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, tValidation("PasswordSpecial")),
    confirmPassword: Yup.string()
      .required(tValidation("ConfirmPasswordRequired"))
      .oneOf([Yup.ref("newPassword")], tValidation("PasswordsMustMatch")),
  });

  // Extract token from URL
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError(t("InvalidToken"));
    }
  }, [searchParams, t]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate passwords
      await passwordSchema.validate({ newPassword, confirmPassword });

      if (!token) {
        throw new Error(t("InvalidToken"));
      }

      // Send password reset request
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
        {
          token,
          newPassword,
        }
      );

      if (response.status === 201) {
        message.success(t("PasswordResetSuccess"));
        setTimeout(() => router.push("/login"), 2000);
      } else {
        throw new Error(t("UnexpectedError"));
      }
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        setError(err.message);
      } else if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || t("UnexpectedError"));
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("UnexpectedError"));
      }
      console.error("Password reset error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="flex w-full items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-[#0b7cf8] text-center">
              {t("Heading")}
            </h1>
            <ChangeLanguage />
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}

          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {t("NewPassword")}
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder={t("EnterNewPassword")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {t("ConfirmNewPassword")}
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder={t("ConfirmPassword")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !token}
            className="w-full bg-[#0b7cf8] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? t("Resetting") : t("ResetPassword")}
          </button>

          <Link className="block text-center text-blue-500 mt-4" href="/login">
            {t("BackToLogin")}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Page;
