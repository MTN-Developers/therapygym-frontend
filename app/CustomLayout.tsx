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

const { Header, Content, Footer, Sider } = Layout;

const items: MenuItem[] = [
  {
    id: 1,
    label: "Home",
    icon: homeIcon,
  },
  {
    id: 2,
    label: "All courses",
    icon: coursesIcon,
  },
  {
    id: 3,
    label: "Calender",
    icon: calenderIcon,
  },
  {
    id: 4,
    label: "Discussion",
    icon: discussionIcon,
  },
  {
    id: 5,
    label: "MTN Support",
    icon: supportIcon,
  },
];

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // State to manage sidebar width

  // Map the original items to Ant Design Menu's expected format
  //   const menuItems: MenuProps["items"] = useMemo(() => {
  //     return items.map((item) => ({
  //       key: item.id.toString(),
  //       label: item.label,
  //       icon: (
  //         <Image
  //           src={item.icon}
  //           alt={`${item.label} icon`}
  //           width={20}
  //           height={20}
  //         />
  //       ),
  //     }));
  //   }, []);

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
              <Image
                src={item.icon}
                alt={`${item.label} icon`}
                width={20}
                height={20}
                className="inline me-4"
              />
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
