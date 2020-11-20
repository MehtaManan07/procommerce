import React from 'react'
import AdminNav from '../admin/AdminNav'
import UserNav from '../user/UserNav'

const DashboardLayout = ({ children, admin = false }) => {
    return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-2.8">
           {admin ? <AdminNav /> : <UserNav />} 
          </div>
          <div className="col-md-6 mt-5">
            {children}
          </div>
        </div>
      </div>
    )
}

export default DashboardLayout
