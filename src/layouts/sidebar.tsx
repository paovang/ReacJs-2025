import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [permissions, setPermissions] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname); // 👈 ตั้งค่า key จาก path ปัจจุบัน

  useEffect(() => {
    const storedPermissions = localStorage.getItem('permissions');
    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    }
  }, []);

  useEffect(() => {
    setSelectedKey(location.pathname); 
  }, [location.pathname]);

  const menuItems = [
    {
      key: '/dashboard',
      icon: <UserOutlined />,
      label: 'ໜ້າຫຼັກ',
      permission: 'view-home',
    },
    {
      key: '/list/users',
      icon: <VideoCameraOutlined />,
      label: 'ຂໍ້ມູນ ຜູ້ໃຊ້ລະບົບ',
      permission: 'view-user',
    },
    {
      key: '/list/customers',
      icon: <UploadOutlined />,
      label: 'ຂໍ້ມູນ ລູກຄ້າ',
      permission: 'view-customer',
    },
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo flex justify-center items-center p-3 w-full h-[100px] bg-white">
        <img src="/logoBeer.png" className="w-16 h-16 mr-3 ml-1 object-contain rounded" />
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}  // ກຳນົດ key ໃສ່ເພື່ອໃຫ້ກໍລະນີມີການ refresh browser ກໍ່ໃຫ້ຍັງຄົງ selected background color
        onClick={({ key }) => {
          setSelectedKey(key);
          navigate(key);
        }}
        items={menuItems
          .filter((item) => permissions.includes(item.permission))
          .map(({ key, icon, label }) => ({ key, icon, label }))}
      />
    </Sider>
  );
};

export default Sidebar;