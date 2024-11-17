"use client";

import React, { useEffect, useState } from "react";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Modal, theme } from "antd";
import homeIcon from "@/assets/images/home-icon.svg";
import coursesIcon from "@/assets/images/all-courses-icon.svg";
import calenderIcon from "@/assets/images/calender-icon.svg";
import discussionIcon from "@/assets/images/discussion-icon.svg";
import supportIcon from "@/assets/images/support-icon.svg";
import mtnliveLogo from "@/assets/images/mtn-live-logo.svg";
import Image from "next/image";
import Link from "next/link";
import userPhoto from "../../../assets/images/user-photo.png";
import logoutIcon from "../../../assets/images/login-icon.svg";
import { usePathname, useRouter } from "next/navigation";
// import CustomHeader from "@/app/components/CustomHeader";
import { RootState } from "@/app/store/store";
import { logout } from "@/app/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useAxiosInterceptors from "@/app/hooks/useAxiosInterceptors";

const { Content, Sider } = Layout;

const items = [
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
  useAxiosInterceptors();

  const [collapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false); // Add this line
  console.log(isMounted);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const showLogoutModal = () => {
    setOpen(true);
  };

  const hideLogoutModal = () => {
    setOpen(false);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const sidebarWidth = collapsed ? 80 : 266;
  const headerHeight = 64;

  const pathname = usePathname();

  const getActiveMenuItem = () => {
    if (pathname.startsWith("/dashboard/course/")) {
      return "2";
    }

    const pathSegments = pathname.split("/").filter(Boolean);
    const pathSecondSegment = pathSegments[1];

    if (!pathSecondSegment) {
      return "1";
    }

    const activeItem = items.find((item) => {
      const itemLinkSegments = item.link.split("/").filter(Boolean);
      const itemSecondSegment = itemLinkSegments[1];
      return pathSecondSegment === itemSecondSegment;
    });

    return activeItem ? activeItem.id.toString() : "1";
  };

  const selectedKey = getActiveMenuItem();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === undefined) {
    // Authentication status is being determined
    return null; // or a loading indicator
  }

  if (isAuthenticated === false) {
    // User is not authenticated; we've already redirected
    return null;
  }

  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      {isMounted && (
        <>
          <Sider
            width={sidebarWidth}
            collapsible
            collapsed={collapsed}
            trigger={null}
            style={{
              zIndex: 50,
              background: "#0d63d9",
              transition: "width 0.2s ease",
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <div className="flex justify-center py-4">
              <Image
                src={mtnliveLogo}
                alt="logo"
                width={collapsed ? 40 : 150}
                height={73}
              />
            </div>

            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
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
                    {!collapsed && item.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>

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
                    <p>{user?.name}</p>
                    <p className="text-[12px]">Client</p>
                  </div>
                  <button
                    onClick={() => {
                      showLogoutModal();
                    }}
                  >
                    <Image src={logoutIcon} alt="logout icon" />
                  </button>
                </div>
                <Modal
                  title="Logout"
                  open={open}
                  onOk={() => {
                    hideLogoutModal();
                    handleLogout();
                  }}
                  onCancel={hideLogoutModal}
                  okText="yes"
                  cancelText="no"
                >
                  <p>Do you want to logout?</p>
                </Modal>
              </div>
            )}
          </Sider>

          <Layout
            style={{
              marginLeft: collapsed ? 80 : 266,
              flex: 1,
            }}
          >
            {/* <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                display: "flex",
                alignItems: "center",
                paddingTop: "40px",

                justifyContent: "space-between", // Ensures the button and the header are on the same line
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </div>
              {pathname === "/dashboard" ? (
                <>
                  <div className=" w-full pe-12">
                    <CustomHeader />
                  </div>
                </>
              ) : null}
            </Header> */}

            <Content
              style={{
                overflowY: "auto",
                height: `calc(100vh - ${headerHeight}px)`,
                background: colorBgContainer,
              }}
            >
              {children}
            </Content>
          </Layout>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
