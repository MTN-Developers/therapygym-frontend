"use client";
import React, { useState } from "react";
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
import { usePathname } from "next/navigation";
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
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const sidebarWidth = 266;
  const headerHeight = 64; // Adjust if your header has a different height
  const pathname = usePathname();
  // Function to determine the active menu item
  const getActiveMenuItem = () => {
    // If the pathname starts with '/dashboard/course/', set 'All courses' as active
    if (pathname.startsWith("/dashboard/course/")) {
      return "2"; // Assuming '2' is the ID for 'All courses'
    }
    // Get the segments of the pathname
    const pathSegments = pathname.split("/").filter(Boolean);
    const pathSecondSegment = pathSegments[1]; // index 0 is 'dashboard', index 1 is the next segment
    // If there is no second segment, we are on '/dashboard' or '/dashboard/'
    if (!pathSecondSegment) {
      return "1"; // Home
    }
    // Find the active menu item based on the second segment
    const activeItem = items.find((item) => {
      const itemLinkSegments = item.link.split("/").filter(Boolean);
      const itemSecondSegment = itemLinkSegments[1];
      return pathSecondSegment === itemSecondSegment;
    });
    return activeItem ? activeItem.id.toString() : "1"; // Default to '1' if no match
  };
  const selectedKey = getActiveMenuItem();
  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <Sider
        width={sidebarWidth}
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          zIndex: 10,
          background: "#0D63D9",
          transition: "width 0.2s",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
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
            selectedKeys={[selectedKey]}
            className="flex-1 custom-menu"
            style={{
              background: "#0D63D9",
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
          {!collapsed && (
            <div
              className="flex items-center justify-center p-4"
              style={{
                position: "absolute",
                bottom: "10px",
                left: "0",
                right: "0",
              }}
            >
              <div className="flex gap-2 items-center">
                <Image
                  src={userPhoto}
                  alt="user photo"
                  width={35}
                  height={35}
                />
                <div className="text-white flex flex-col">
                  <p>{user.user.name}</p>
                  <p className="text-[12px]">Client</p>
                </div>
                <button onClick={() => signOut()}>
                  <Image src={logoutIcon} alt="logout icon" />
                </button>
              </div>
            </div>
          )}
        </div>
      </Sider>
      {/* Main Content Area */}
      <Layout
        style={{
          marginLeft: collapsed ? 0 : sidebarWidth,
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Content
          style={{
            padding: 24,
            overflowY: "auto",
            height: `calc(100vh - ${headerHeight}px)`,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
