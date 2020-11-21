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
      style={{ width: 256, borderColor: 'grey' }}
      defaultSelectedKeys={['dash']}
      defaultOpenKeys={['sub1', 'sub2', 'sub3']}
      mode="inline"
    >
      <Menu.Item onClick={() => history.push('/admin/dashboard')} key="dash">
        Dashboard
      </Menu.Item>
      <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Orders">
        <Menu.Item
          icon={<BarChartOutlined />}
          onClick={() => history.push('/admin/orders/analytics')}
          key="analytics1"
        >
          Analytics
        </Menu.Item>
        <Menu.Item
          icon={<MinusOutlined />}
          onClick={() => history.push('/admin/orders/all')}
          key="allOrders"
        >
          All Orders
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Categories">
        <Menu.Item
          icon={<BarChartOutlined />}
          onClick={() => history.push('/admin/category/analytics')}
          key="analytics2"
        >
          Analytics
        </Menu.Item>
        <Menu.Item
          icon={<MinusOutlined />}
          onClick={() => history.push('/admin/category')}
          key="category"
        >
          Categories
        </Menu.Item>
        <Menu.Item
          icon={<MinusOutlined />}
          onClick={() => history.push('/admin/category/sub')}
          key="sub"
        >
          Sub Categories
        </Menu.Item>
      </SubMenu>
      <Menu.Item
        icon={<ScissorOutlined />}
        onClick={() => history.push('/admin/coupons')}
        key="coupons"
      >
        Coupons
      </Menu.Item>
      <SubMenu
        key="sub3"
        title={
          <span>
            <AlignCenterOutlined />
            <span>Products</span>
          </span>
        }
      >
        <Menu.Item icon={<BarChartOutlined />} key="analytics3">
          Analytics
        </Menu.Item>
        <Menu.Item icon={<MinusOutlined />} key="allProd">
          All products
        </Menu.Item>
        <Menu.Item icon={<MinusOutlined />} key="newProd">
          Create Product
        </Menu.Item>
        <Menu.Item icon={<MinusOutlined />} key="Best">
          Best sellers
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default AdminNav;
