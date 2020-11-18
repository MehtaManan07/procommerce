import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase'
import { useDispatch } from 'react-redux'

const Navbar = () => {
  const [current, setCurrent] = useState('home');
  const { SubMenu } = Menu;
  const dispatch = useDispatch()
  const history = useHistory()
  const handleClick = (e) => {
    setCurrent({ current: e.key });
  };

  const logout = () => {
   firebase.auth().signOut();
   dispatch({
     type: 'LOGOUT_USER',
     payload: {}
   })
   history.push('/login')
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="mail" icon={<AppstoreOutlined />}>
      <Link to='/'>
        Home
      </Link>
      </Menu.Item>
      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Dashboard">
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item icon={<UserSwitchOutlined />} onClick={logout}>Logout</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item
        key="register"
        className="float-right"
        icon={<UserAddOutlined />}
      >
        <Link to="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="login" className="float-right" icon={<UserOutlined />}>
        <Link to="/login">Login</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
