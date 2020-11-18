import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  UserOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const [current, setCurrent] = useState('home');
  const { SubMenu } = Menu;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const handleClick = (e) => {
    setCurrent({ current: e.key });
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT_USER',
      payload: {},
    });
    history.push('/login');
  };

  const guestLinks = (
    <>
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
    </>
  );

  const authLinks = (
    <SubMenu className='float-right' icon={<UserOutlined />} title="Dashboard">
      <Menu.ItemGroup title="something">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item icon={<UserSwitchOutlined />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
  );

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="mail" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {!auth ? guestLinks : authLinks}
    </Menu>
  );
};

export default Navbar;
