import React from 'react';
import UserNav from '../../Components/user/UserNav';

const WishList = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2.8">
          <UserNav />
        </div>
        <div className="col">WishList page</div>
      </div>
    </div>
  );
};

export default WishList;
