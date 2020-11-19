import React from 'react';
import UserNav from '../../Components/user/UserNav';

const UserDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2.8">
          <UserNav />
        </div>
        <div className="col">Extra info</div>
      </div>
    </div>
  );
};

export default UserDashboard;