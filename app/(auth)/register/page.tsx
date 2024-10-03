"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Input, DatePicker, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

// Import your assets
import registerBanner from "../../../assets/images/register-banner.png";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    phone: "",
    work: "",
    city: "",
    nationality: "",
    birthdate: null,
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (key: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    const {
      name,
      email,
      username,
      password,
      password_confirmation,
      phone,
      work,
      city,
      nationality,
      birthdate,
    } = formData;

    if (
      !name ||
      !email ||
      !username ||
      !password ||
      !password_confirmation ||
      !phone ||
      !work ||
      !city ||
      !nationality ||
      !birthdate
    ) {
      message.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (password !== password_confirmation) {
      message.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
        {
          ...formData,
          birthdate: dayjs(birthdate).format("YYYY-MM-DD"),
        }
      );

      if (response.status === 201 || response.status === 200) {
        message.success("Registration successful");
        router.push("/login"); // Redirect to login page after successful registration
      } else {
        message.error("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.error("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen p-[34px] flex items-center content-center">
      <div className="w-full h-full rounded-3xl flex justify-between ">
        <div className="flex items-center justify-center flex-1">
          <form
            onSubmit={handleSubmit}
            className="md:w-[683px]  min-h-[600px] w-[250px] flex flex-col items-center justify-center gap-y-4"
          >
            <div>
              <h1 className="text-[50px] text-[#0b7cf8] font-[700] font-sans">
                Register
              </h1>
              <p className="text-center text-gray-600">
                Join us and start your journey
              </p>
            </div>
            {/* Name */}
            <Input
              className="max-w-[364px]"
              size="large"
              placeholder="Full Name"
              prefix={<UserOutlined />}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {/* Email */}
            <Input
              className="max-w-[364px]"
              size="large"
              placeholder="Email"
              prefix={<MailOutlined />}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {/* Username */}
            <Input
              className="max-w-[364px]"
              size="large"
              placeholder="Username"
              prefix={<UserOutlined />}
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
            {/* Password */}
            <Input.Password
              size="large"
              className="max-w-[364px]"
              placeholder="Password"
              prefix={<LockOutlined />}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {/* Confirm Password */}
            <Input.Password
              size="large"
              className="max-w-[364px]"
              placeholder="Confirm Password"
              prefix={<LockOutlined />}
              value={formData.password_confirmation}
              onChange={(e) =>
                handleChange("password_confirmation", e.target.value)
              }
            />
            {/* Phone */}
            <Input
              className="max-w-[364px]"
              size="large"
              placeholder="Phone Number"
              prefix={<PhoneOutlined />}
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            {/* Work */}
            <Input
              className="max-w-[364px]"
              size="large"
              placeholder="Occupation"
              value={formData.work}
              onChange={(e) => handleChange("work", e.target.value)}
            />
            {/* City */}
            <Input
              className="max-w-[364px]"
              size="large"
              placeholder="City"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
            {/* Nationality */}
            <Input
              className="max-w-[364px]"
              size="large"
              placeholder="Nationality"
              value={formData.nationality}
              onChange={(e) => handleChange("nationality", e.target.value)}
            />
            {/* Birthdate */}
            <DatePicker
              className="max-w-[364px] w-full"
              size="large"
              placeholder="Birthdate"
              format="YYYY-MM-DD"
              value={formData.birthdate}
              onChange={(date) => handleChange("birthdate", date)}
            />
            {/* Register Button */}
            <Button
              type="primary"
              size="large"
              className="md:w-[364px] w-[250px]"
              htmlType="submit"
              loading={loading}
            >
              Register
            </Button>
          </form>
        </div>
        <div className="lg:flex items-center hidden">
          <Image
            src={registerBanner}
            width={683}
            height={700}
            alt="banner image"
            style={{
              width: "683px",
              height: "600px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
