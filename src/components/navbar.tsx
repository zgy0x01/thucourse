import {
  DollarOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SearchOutlined,
  SettingOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Menu, Row } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

import { User } from "@/lib/models";
import { logout, toAdmin } from "@/services/user";

const NavBar = ({ user }: { user?: User }) => {
  const router = useRouter();

  const handleMenuClick = (e: { key: string }) => {
    if (e.key == "logout") {
      logout(router.basePath, router);
    } else if (e.key == "account") {
      if (user?.is_staff) toAdmin();
    } else {
      router.push(e.key);
    }
  };
  const dropMenuItems: MenuProps["items"] = [
    {
      key: "account",
      label: user?.account,
      icon: <UserOutlined />,
    },
    { key: "/point", label: "社区积分", icon: <DollarOutlined /> },
    { key: "/activity", label: "我的点评", icon: <ProfileOutlined /> },
    { key: "/sync", label: "同步课表", icon: <SyncOutlined /> },
    { key: "/preference", label: "偏好设置", icon: <SettingOutlined /> },
    { type: "divider", key: "divider" },
    { key: "logout", label: "登出", icon: <LogoutOutlined />, danger: true },
  ];

  const navItems = [
    { label: "最新", value: "/latest" },
    { label: "课程", value: "/courses" },
    { label: "数据统计", value: "/statistics" },
  ];

  const navMenuItems = navItems.map((item) => {
    return {
      key: item.value,
      label: <Link href={item.value}>{item.label}</Link>,
    };
  });

  return (
    <Row className="navbar">
      <Col>
        <Link href="/latest" className="title">
          THU选课社区
        </Link>
      </Col>

      <Col className="col-menu" flex="auto">
        <Menu
          selectedKeys={[router.pathname]}
          className="menu"
          mode="horizontal"
          items={navMenuItems}
        ></Menu>
      </Col>
      <Col>
        <Button
          shape="circle"
          icon={<SearchOutlined />}
          className="search-button"
          onClick={() => {
            router.push("/search");
          }}
        />
      </Col>
    </Row>
  );
};

export default NavBar;
