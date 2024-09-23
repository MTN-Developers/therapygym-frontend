"use client";

import homeIcon from "@/assets/images/home-icon.svg";
import coursesIcon from "@/assets/images/all-courses-icon.svg";
import calenderIcon from "@/assets/images/calender-icon.svg";
import discussionIcon from "@/assets/images/discussion-icon.svg";
import supportIcon from "@/assets/images/support-icon.svg";
import mtnliveLogo from "@/assets/images/mtn-live-logo.svg";

import { Layout, Menu, theme } from "antd";
import { MenuItem } from "@/interfaces"; // Ensure this interface is defined as:
// interface MenuItem { id: number; label: string; icon: string; }
import Image from "next/image";
import Link from "next/link";

const { Content, Sider } = Layout;

const items: MenuItem[] = [
  {
    id: 1,
    label: "Home",
    icon: homeIcon,
    link: "/",
  },
  {
    id: 2,
    label: "All courses",
    icon: coursesIcon,
    link: "/all-courses",
  },
  {
    id: 3,
    label: "Calender",
    icon: calenderIcon,
    link: "/calender",
  },
  {
    id: 4,
    label: "Discussion",
    icon: discussionIcon,
    link: "/discussion",
  },
  {
    id: 5,
    label: "MTN Support",
    icon: supportIcon,
    link: "/support",
  },
];

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        width={"266px"}
        className="min-h-screen py-[32px] pe-[26px]"
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          background: "#0d63d9",
          transition: "width 0.3s ease",
        }}
        onBreakpoint={(broken) => {
          if (broken) {
            console.log(broken);
          } else {
            console.log(broken);
          }
          console.log("Breakpoint broken:", broken);
        }}
        onCollapse={(collapsed, type) => {
          if (collapsed) {
            console.log(collapsed);
          } else {
            console.log(collapsed);
          }
          console.log("Collapsed:", collapsed, "Type:", type);
        }}
      >
        {/* Logo Section */}
        <div className="flex justify-center py-4">
          <Image src={mtnliveLogo} alt="logo" width={150} height={73} />
        </div>

        {/* Menu Section */}
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="custom-menu" // Apply the custom class
          style={{
            background: "#0d63d9",
            //background: "red",
            width: "100%",
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
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
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
    </Layout>
  );
};

export default Dashboard;
