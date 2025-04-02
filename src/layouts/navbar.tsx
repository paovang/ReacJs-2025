import React from 'react';
import { Button, Layout, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

interface NavbarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ collapsed, toggleCollapse }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapse}
        style={{ fontSize: '16px', width: 64, height: 64 }}
      />
    </Header>
  );
};

export default Navbar;
