import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { authLogin } from './redux/actions/auth';
import Navbar from './Components/core/Navbar';
import HomePage from './Pages/core/HomePage';
import LoginPage from './Pages/auth/LoginPage';
import RegisterPage from './Pages/auth/RegisterPage';
import ConfirmAuth from './Pages/auth/ConfirmAuth';
import ForgotPwd from './Pages/auth/ForgotPwd';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(authLogin(user));
      }
    });
    //cleanup
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/confirmRegister" exact component={ConfirmAuth} />
        <Route path="/forgot/password" exact component={ForgotPwd} />
      </Switch>
    </div>
  );
};

export default App;
