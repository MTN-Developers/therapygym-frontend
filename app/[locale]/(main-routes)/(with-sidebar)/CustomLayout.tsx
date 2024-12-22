"use client";

import React, { useEffect, useState } from "react";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";.
import { CiStreamOn } from "react-icons/ci";
import { Layout, Menu, Modal, theme } from "antd";
import homeIcon from "@/assets/images/home-icon.svg";
import coursesIcon from "@/assets/images/all-courses-icon.svg";
import calenderIcon from "@/assets/images/calender-icon.svg";
import discussionIcon from "@/assets/images/discussion-icon.svg";
import supportIcon from "@/assets/images/support-icon.svg";
import mtnliveLogo from "@/assets/images/mtn-live-logo.svg";
import Image from "next/image";
import Link from "next/link";
import logoutIcon from "@/assets/images/login-icon.svg";
import profileIcon from "@/assets/images/profile-icon.svg";
import { usePathname, useRouter } from "next/navigation";
import { RootState } from "@/app/store/store";
import { logout } from "@/app/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomHeader from "@/app/components/CustomHeader";
import useSWR from "swr";
import { getOne } from "@/services/server";
import { useScreen } from "usehooks-ts";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { useTranslations } from "next-intl";

const { Content, Sider, Header } = Layout;

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const { locale } = useTranslationContext();
  const t = useTranslations("Sidebar");
  const screenWidth = useScreen();

  const items = [
    {
      id: 1,
      label: t("Home"),
      icon: homeIcon,
      link: `/${locale}`,
      iconType: "img",
    },
    {
      id: 2,
      label: t("Courses"),
      icon: coursesIcon,
      link: `/${locale}/courses`,
    },
    {
      id: 6,
      label: t("LiveStream"),
      icon: <CiStreamOn size={25} className="animate-pulse ml-2" />,
      iconType: "component",
      link: `/${locale}/live-stream/`,
    },
    {
      id: 3,
      label: t("Calendar"),
      icon: calenderIcon,
      link: `/${locale}/calender`,
    },
    {
      id: 4,
      label: t("Discussions"),
      icon: discussionIcon,
      link: `/${locale}/discussion`,
    },
    {
      id: 5,
      label: t("Support"),
      icon: supportIcon,
      link: `/${locale}/support`,
    },
    {
      id: 6,
      label: t("Profile"),
      icon: profileIcon,
      link: `/${locale}/profile/public-view`,
    },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { userData } = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data } = useSWR<getUserProfile>("/user/me", getOne);
  const logout_T = useTranslations("Logout");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const showLogoutModal = () => setOpen(true);
  const hideLogoutModal = () => setOpen(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const pathname = usePathname();

  const getActiveMenuItem = () => {
    const pathSegments = pathname.split("/").filter(Boolean);

    // Join all path segments after the locale back together to get the full route
    const fullPathAfterLocale = pathSegments.slice(1).join("/");
    const fullPath = `/${locale}/${fullPathAfterLocale}`;
    // console.log(fullPath);

    const fristPath = fullPath.split("/")[2];

    console.log("frist path", fristPath);

    const activeItem = items.find((item) => item.link === fullPath);
    return activeItem ? activeItem.id.toString() : "1";
  };

  const selectedKey = getActiveMenuItem();

  useEffect(() => {
    const handleResize = () => setCollapsed(screenWidth.width < 795);
    handleResize();
  }, [screenWidth]);

  const isHeaderVisible =
    pathname === `/${locale}` || pathname === `/${locale}/courses`;

  return (
    <Layout
      style={{
        height: "100vh", // Fill the entire viewport
        overflow: "hidden", // Prevent the outer layout from scrolling
        background: "#EEE",
        padding: "10px",
        paddingBottom: "0px",
      }}
    >
      {isMounted && (
        <>
          <Sider
            width={266}
            collapsible
            collapsedWidth={0}
            trigger={null}
            collapsed={collapsed}
            onCollapse={(collapsed) => setCollapsed(!collapsed)}
            className="primary-bg"
            style={{
              height: "100vh",
              marginBottom: "10px",
              position: "relative",
              overflow: "hidden",
              borderTopLeftRadius: locale === "ar" ? "0px" : "16px",
              borderBottomLeftRadius: locale === "ar" ? "0px" : "16px",
              borderTopRightRadius: locale === "ar" ? "16px" : "0px",
              borderBottomRightRadius: locale === "ar" ? "16px" : "0px",
            }}
          >
            <div className="flex justify-center py-4">
              <Image src={mtnliveLogo} alt="logo" width={150} height={73} />
            </div>

            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              className="custom-menu primary-bg"
              style={{
                borderRight: "none",
                height: "calc(100% - 100px)", // Make space for bottom user info
                overflowY: "auto",
              }}
            >
              {items.map((item) => (
                <Menu.Item key={item.id.toString()} className="flex">
                  <Link href={item.link} className="flex items-center">
                    {item.iconType === "component" ? (
                      <div>{item.icon}</div>
                    ) : (
                      <Image
                        src={item.icon}
                        alt={`${item.label} icon`}
                        width={20}
                        height={20}
                        className="inline me-4"
                      />
                    )}
                    {item.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>

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
                  src={
                    userData?.profile?.avatar ??
                    (data?.data?.gender === "male"
                      ? "/images/male.jpg"
                      : "/images/female.jpg")
                  }
                  className="rounded-full"
                  alt="user photo"
                  width={35}
                  height={35}
                />
                <div className="text-white flex flex-col">
                  <p>{userData?.name}</p>
                  <p className="text-[12px]">{data?.data?.role}</p>
                </div>
                <button onClick={showLogoutModal}>
                  <Image src={logoutIcon} alt="logout icon" />
                </button>
              </div>
              <Modal
                style={{
                  fontFamily: locale === "ar" ? "Cairo" : "Roboto",
                  direction: locale === "ar" ? "rtl" : "ltr",
                }}
                title={logout_T("Logout")}
                open={open}
                onOk={() => {
                  hideLogoutModal();
                  handleLogout();
                }}
                onCancel={hideLogoutModal}
                okText={logout_T("Confirm")}
                cancelText={logout_T("Cancel")}
              >
                <p>{logout_T("LogoutMsg")}</p>
              </Modal>
            </div>
          </Sider>

          <Layout
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* {isHeaderVisible && ( */}
            <Header
              style={{
                background: colorBgContainer,
                height: "66px",
                display: "flex",
                alignItems: "center",
                paddingTop: "20px",
                paddingBottom: "20px",
                justifyContent: "space-between",
                paddingInline: "0px",
              }}
            >
              <CustomHeader setCollapsed={setCollapsed} />
            </Header>
            {/* )} */}
            <Content
              style={{
                flex: 1,
                overflow: "auto", // Scrollable content area
                background: colorBgContainer,
                padding: isHeaderVisible ? "20px" : "0px",
                scrollbarWidth: "none",
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
