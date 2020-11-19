import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const Slider = () => {
  const history = useHistory();
    const handleClick = e => {
        // e.preventDefault();
    }
    return (
      <Menu
        onClick={handleClick}
        style={{ width: 256, borderColor: 'grey', height: '100vh' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
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
            <Menu.Item onClick={() => history.push('/user/password')} key="1">Password</Menu.Item>
            <Menu.Item key="2">Personal Info</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Orders">
          <Menu.Item onClick={() => history.push('/user/orders')} key="5">My Orders</Menu.Item>
          <Menu.Item onClick={() => history.push('/user/wishlist')} key="6">WishList</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <SettingOutlined />
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
  
}

export default Slider