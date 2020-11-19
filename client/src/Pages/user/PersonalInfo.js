import React from 'react';
import UserNav from '../../Components/user/UserNav';

const PersonalInfo = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2.8">
          <UserNav />
        </div>
        <div className="col">Personal info</div>
      </div>
    </div>
  );
};

export default PersonalInfo;
