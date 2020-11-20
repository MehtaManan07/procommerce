import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  AlignCenterOutlined,
  BarChartOutlined,
  MinusOutlined,
  ScissorOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;


const AdminNav = () => {
  const history = useHistory();
  const handleClick = (e) => {
    // e.preventDefault();
  };
  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256, borderColor: 'grey', height: '100vh' }}
      defaultSelectedKeys={['0771']}
      defaultOpenKeys={['sub1', 'sub2', 'sub4', 'sub3']}
      mode="inline"
    >
      <Menu.Item onClick={() => history.push('/admin/dashboard')} key="0771">
        Dashboard
      </Menu.Item>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Orders">
        <Menu.Item icon={<BarChartOutlined />} onClick={() => history.push('/admin/orders/analytics')} key="5">
          Analytics
        </Menu.Item>
        <Menu.Item icon={<MinusOutlined />} onClick={() => history.push('/admin/orders/all')} key="6">
          All Orders
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub3" icon={<AppstoreOutlined />} title="Categories">
        <Menu.Item icon={<BarChartOutlined />} onClick={() => history.push('/admin/category/analytics')} key="5">
          Analytics
        </Menu.Item>
        <Menu.Item icon={<MinusOutlined />} onClick={() => history.push('/admin/category')} key="6">
          Categories
        </Menu.Item>
        <Menu.Item icon={<MinusOutlined />} onClick={() => history.push('/admin/category/sub')} key="6">
         Sub Categories
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub4"
        title={
          <span>
            <AlignCenterOutlined />
            <span>Products</span>
          </span>
        }
      >
        <Menu.Item icon={<BarChartOutlined />} key="12">Analytics</Menu.Item>
        <Menu.Item icon={<MinusOutlined />} key="9">All products</Menu.Item>
        <Menu.Item icon={<MinusOutlined />} key="10">Create Product</Menu.Item>
        <Menu.Item icon={<MinusOutlined />} key="11">Best sellers</Menu.Item>
      </SubMenu>
      <Menu.Item
        icon={<ScissorOutlined />}
        onClick={() => history.push('/admin/coupons')}
        key="0771"
      >
        Coupons
      </Menu.Item>
    </Menu>
  );
};

export default AdminNav;
