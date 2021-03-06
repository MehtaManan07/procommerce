import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Menu } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const Slider = () => {
  const [current, setCurrent] = useState('');
  const history = useHistory();

  return (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      style={{ width: 256, borderColor: 'grey', height: '100vh' }}
      selectedKeys={[current]}
      defaultOpenKeys={['sub1', 'sub2', 'sub4']}
      mode="inline"
    >
      <SubMenu
        key="sub1"
        title={
          <span>
            <Avatar icon={<UserOutlined />} />
            <span> Profile</span>
          </span>
        }
      >
        <Menu.ItemGroup key="g1">
          <Menu.Item onClick={() => history.push('/user/dashboard')} key="0771">
            Dashboard
          </Menu.Item>
          <Menu.Item onClick={() => history.push('/user/info')} key="2">
            Personal Info
          </Menu.Item>
          <Menu.Item onClick={() => history.push('/user/password')} key="1">
            Password
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Orders">
        <Menu.Item onClick={() => history.push('/user/orders')} key="5">
          My Orders
        </Menu.Item>
        <Menu.Item onClick={() => history.push('/user/wishlist')} key="6">
          WishList
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub4"
        title={
          <span>
            <MailOutlined />
            <span>Navigation Three</span>
          </span>
        }
      >
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Slider;
