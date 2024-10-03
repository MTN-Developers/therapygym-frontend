"use client";

import React from "react";
import homeIcon from "@/assets/images/home-icon.svg";
import coursesIcon from "@/assets/images/all-courses-icon.svg";
import calenderIcon from "@/assets/images/calender-icon.svg";
import discussionIcon from "@/assets/images/discussion-icon.svg";
import supportIcon from "@/assets/images/support-icon.svg";
import mtnliveLogo from "@/assets/images/mtn-live-logo.svg";
import { signOut } from "next-auth/react";
import { Layout, Menu, theme } from "antd";
import { MenuItem } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import userPhoto from "../../../assets/images/user-photo.png";
import logoutIcon from "../../../assets/images/login-icon.svg";
import { useUserSession } from "@/app/contexts/userDataContext";

const { Content, Sider } = Layout;

const items: MenuItem[] = [
  {
    id: 1,
    label: "Home",
    icon: homeIcon,
    link: "/dashboard/",
  },
  {
    id: 2,
    label: "All courses",
    icon: coursesIcon,
    link: "/dashboard/all-courses",
  },
  {
    id: 3,
    label: "Calendar",
    icon: calenderIcon,
    link: "/dashboard/calender",
  },
  {
    id: 4,
    label: "Discussion",
    icon: discussionIcon,
    link: "/dashboard/discussion",
  },
  {
    id: 5,
    label: "MTN Support",
    icon: supportIcon,
    link: "/dashboard/support",
  },
];

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserSession();

  // console.log(user);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        width={"266px"}
        className="h-screen"
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          background: "#0d63d9",
          transition: "width 0.3s ease",
          overflow: "hidden",
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex justify-center py-4">
            <Image src={mtnliveLogo} alt="logo" width={150} height={73} />
          </div>

          {/* Menu Items */}
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            className="flex-1 custom-menu"
            style={{
              background: "#0d63d9",
              borderRight: "none",
            }}
          >
            {items.map((item) => (
              <Menu.Item key={item.id.toString()} className="flex">
                <Link href={item.link}>
                  <Image
                    src={item.icon}
                    alt={`${item.label} icon`}
                    width={20}
                    height={20}
                    className="inline me-4"
                  />
                  {item.label}
                </Link>
              </Menu.Item>
            ))}
          </Menu>

          {/* Footer Section */}
          <div className="flex items-center justify-center p-4">
            <div className="flex gap-2 items-center">
              <Image src={userPhoto} alt="user photo" width={35} height={35} />
              <div className="text-white flex flex-col">
                <p>{user.user.name}</p>
                <p className="text-[12px]">Client</p>
              </div>
              <button onClick={() => signOut()}>
                <Image src={logoutIcon} alt="logout icon" />
              </button>
            </div>
          </div>
        </div>
      </Sider>
      {/* Main Content Area */}
      <div style={{ marginLeft: "266px" }}>
        <Layout>
          <Content style={{ margin: "0px 0px 0" }}>
            <div
              style={{
                paddingTop: 56,
                paddingInline: 24,
                minHeight: "100vh",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};

export default Dashboard;
