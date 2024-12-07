"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import * as Yup from "yup";
import axiosInstance from "@/app/utils/axiosInstance";
import axios from "axios";

// Yup validation schema
const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const PasswordResetRequestPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate email
      await emailSchema.validate({ email });

      // Send password reset request
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/request-password-reset`,
        { email }
      );

      // Check for successful response
      if (response.status === 201) {
        setEmailSent(true);
        message.success("Password reset link sent");

        // Wait 5 seconds before routing to login
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err: unknown) {
      // Handle different types of errors
      if (err instanceof Yup.ValidationError) {
        setError(err.message);
      } else if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "An error occurred during password reset"
        );
      } else {
        setError("An unexpected error occurred");
      }

      console.error("Password reset error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // If email has been sent successfully, show confirmation page
  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-[#0b7cf8] mb-4">
            Check Your Email
          </h2>
          <p className="text-gray-700 mb-4">
            A password reset link has been sent to {email}. You will be
            redirected to the login page in 5 seconds.
          </p>
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0b7cf8]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-3xl font-bold text-[#0b7cf8] mb-6 text-center">
            Reset Your Password
          </h1>

          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0b7cf8] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700 transition-colors"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetRequestPage;
