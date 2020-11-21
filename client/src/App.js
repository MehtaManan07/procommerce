import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { actualLogin } from './redux/actions/auth';
import GuestRoute from './Components/core/GuestRoute';
import PrivateRoute from './Components/core/PrivateRoute';
import AdminRoute from './Components/core/AdminRoute';
import Navbar from './Components/core/Navbar';
import HomePage from './Pages/core/HomePage';
import LoginPage from './Pages/auth/LoginPage';
import RegisterPage from './Pages/auth/RegisterPage';
import ConfirmAuth from './Pages/auth/ConfirmAuth';
import ForgotPwd from './Pages/auth/ForgotPwd';
import UserDashboard from './Pages/user/UserDashboard';
import ChangePwd from './Pages/user/ChangePwd';
import WishList from './Pages/user/Wishlist';
import MyOrders from './Pages/user/MyOrders';
import PersonalInfo from './Pages/user/PersonalInfo';
import AdminDashboard from './Pages/admin/AdminDashboard';
import Category from './Pages/admin/Category';
import SubCategory from './Pages/admin/SubCategory';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(actualLogin(user));
      }
    });
    //cleanup
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <ToastContainer autoClose={3000} />
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <GuestRoute path="/confirmRegister" exact component={ConfirmAuth} />
        <GuestRoute path="/forgot/password" exact component={ForgotPwd} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/user/password" exact component={ChangePwd} />
        <PrivateRoute path="/user/wishlist" exact component={WishList} />
        <PrivateRoute path="/user/orders" exact component={MyOrders} />
        <PrivateRoute path="/user/info" exact component={PersonalInfo} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/category" exact component={Category} />
        <AdminRoute path="/admin/category/sub" exact component={SubCategory} />
      </Switch>
    </div>
  );
};

export default App;
