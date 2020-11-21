import React from 'react';
import AdminNav from '../admin/AdminNav';
import { Col, Row } from 'antd';
import UserNav from '../user/UserNav';

const DashboardLayout = ({ children, admin = false }) => {
  return (
    <>
      <Row style={{ height: '100vh' }}>
        <Col xs={2} sm={4} md={6} lg={8} xl={5}>
          <div>{admin ? <AdminNav /> : <UserNav />}</div>
        </Col>
        <Col
          style={{ minHeight: '100vh' }}
          xs={22}
          sm={20}
          md={18}
          lg={16}
          xl={19}
        >
          {children}
        </Col>
      </Row>
    </>
  );
};

export default DashboardLayout;
