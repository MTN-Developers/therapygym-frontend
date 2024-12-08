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
// import userPhoto from "../../../assets/images/user-photo.png";
import logoutIcon from "../../../assets/images/login-icon.svg";
import { usePathname, useRouter } from "next/navigation";
import { RootState } from "@/app/store/store";
import { logout } from "@/app/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useAxiosInterceptors from "@/app/hooks/useAxiosInterceptors";
import CustomHeader from "@/app/components/CustomHeader";
import useSWR from "swr";
import { getOne } from "@/services/server";
const { Content, Sider, Header } = Layout;

const items = [
  {
    id: 1,
    label_en: "Home",
    label_ar: "الرئيسية",
    icon: homeIcon,
    link: "/",
  },
  {
    id: 2,
    label_en: "All courses",
    label_ar: "جميع الدورات",
    icon: coursesIcon,
    link: "/all-courses",
  },
  {
    id: 3,
    label_en: "Calendar",
    label_ar: "التقويم",
    icon: calenderIcon,
    link: "/calender",
  },
  {
    id: 4,
    label_en: "Discussion",
    label_ar: "المناقشات",
    icon: discussionIcon,
    link: "/discussion",
  },
  {
    id: 5,
    label_en: "MTN Support",
    label_ar: "دعم متن",
    icon: supportIcon,
    link: "/support",
  },
];

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  useAxiosInterceptors();

  // const [collapsed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Retained isMounted
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  // console.log("user obj is ", user);

  const { data } = useSWR<getUserProfile>("/user/me", getOne);
  console.log(data);
  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.auth.isAuthenticated
  // );
  const isAuthenticated: boolean = true;
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isMounted, isAuthenticated, router]);

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

  // const sidebarWidth = collapsed ? 80 : 266;
  // const headerHeight = 64;

  const pathname = usePathname();

  const getActiveMenuItem = () => {
    if (pathname.startsWith("/course/")) {
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

  if (!isMounted || isAuthenticated === undefined) {
    // Component is not yet mounted or authentication status is being determined
    return null; // or a loading indicator
  }

  if (!isAuthenticated) {
    // User is not authenticated; we've already redirected
    return null;
  }

  const lang = "ar";

  return (
    <Layout
      style={{
        minHeight: "100vh",
        height: "fit-content",
        display: "flex",
        background: "#EEE",
        padding: 10,
        direction: "rtl",
      }}
    >
      {isMounted && (
        <>
          <Sider
            width={266}
            collapsedWidth={0}
            collapsible
            collapsed={collapsed}
            trigger={null}
            style={{
              zIndex: 50,
              background: "#0d63d9",
              // transition: "width 0.2s ease",
              // position: "fixed",
              borderTopLeftRadius: lang == "ar" ? "0px" : "16px",
              borderBottomLeftRadius: lang == "ar" ? "0px" : "16px",
              borderTopRightRadius: lang == "ar" ? "16px" : "0px",
              borderBottomRightRadius: lang == "ar" ? "16px" : "0px",
              top: 0,
              left: 0,
              bottom: 0,
            }}
          >
            {!collapsed && (
              <>
                <div className="flex justify-center py-4">
                  <Image src={mtnliveLogo} alt="logo" width={150} height={73} />
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
                      <Link dir="rtl" href={item.link}>
                        <Image
                          src={item.icon}
                          alt={`${item.label_ar} icon`}
                          width={20}
                          height={20}
                          className="inline me-4"
                        />
                        {item.label_ar}
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
                      src={data?.data?.profile?.avatar as string}
                      alt="user photo"
                      width={35}
                      height={35}
                    />
                    <div className="text-white flex flex-col">
                      <p>{user?.name}</p>
                      <p className="text-[12px]">{data?.data?.role}</p>
                    </div>
                    <button onClick={showLogoutModal}>
                      <Image src={logoutIcon} alt="logout icon" />
                    </button>
                  </div>
                  <Modal
                    style={{
                      direction: "rtl",
                    }}
                    title="تسجيل الخروج"
                    open={open}
                    onOk={() => {
                      hideLogoutModal();
                      handleLogout();
                    }}
                    onCancel={hideLogoutModal}
                    okText="نعم"
                    cancelText="لا"
                  >
                    <p>هل أنت متأكد أنك تريد تسجيل الخروج؟</p>
                  </Modal>
                </div>
              </>
            )}
          </Sider>

          <Layout
            style={{
              flex: 1,
              background: "red !important",
              // english
              // borderTopRightRadius: "16px",
              // borderTopLeftRadius: collapsed ? "16px" : "0",
              // borderBottomRightRadius: "16px",
              // borderBottomLeftRadius: collapsed ? "16px" : "0",

              //ar
              borderTopLeftRadius: "16px",
              borderTopRightRadius: collapsed ? "16px" : "0",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: collapsed ? "16px" : "0",
            }}
          >
            <Content
              className="
              pr-6 lg:pr-10 pt-6 lg:pt-10 pb-6 lg:pb-10 pl-6 
              "
              style={{
                height: `fit-content`,
                background: colorBgContainer,
                //english
                // borderBottomRightRadius: "16px",
                // borderTopRightRadius: "16px",
                // borderTopLeftRadius: collapsed ? "16px" : "0",
                // borderBottomLeftRadius: collapsed ? "16px" : "0",

                //ar
                borderBottomLeftRadius: "16px",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: collapsed ? "16px" : "0",
                borderBottomRightRadius: collapsed ? "16px" : "0",
              }}
            >
              <Header
                style={{
                  padding: 0,
                  paddingRight: "0px !important",
                  paddingLeft: "0px !important",
                  height: "46px",
                  background: colorBgContainer,
                  alignItems: "center",
                  borderTopRightRadius: "16px",
                  justifyContent: "space-between", // Ensures the button and the header are on the same line
                }}
              >
                <CustomHeader setCollapsed={setCollapsed} />
              </Header>
              <div className="mt-6">{children}</div>
            </Content>
          </Layout>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
