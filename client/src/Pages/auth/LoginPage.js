import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from '../../firebase';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../redux/actions/auth';
import { Link } from 'react-router-dom';

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const googleLogin = async (e) => {
    e.preventDefault();
    const result = await auth.signInWithPopup(googleAuthProvider);
    dispatch(authLogin(result.user));
    history.push('/');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      dispatch(authLogin(result.user));
      history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    setEmail(localStorage.getItem('emailRegister'));
  }, []);
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? <h3>Login</h3> : <h3>Loading...</h3>}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control mb-2"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                minLength="6"
                required
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              onClick={submitHandler}
              block
              shape="round"
              icon={<MailOutlined />}
              size="large"
              disabled={loading || !email || password.length < 6}
              type="ghost"
              className="mb-3"
            >
              Login with Email/Password
            </Button>
            <Button
              onClick={googleLogin}
              block
              shape="round"
              icon={<GoogleOutlined />}
              size="large"
              className="mb-3"
              disabled={loading}
              type="danger"
            >
              Login with Google
            </Button>

            <div className="d-flex row justify-content-around">
              <div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="materialLoginFormRemember"
                  />
                  <label
                    className="form-check-label"
                    for="materialLoginFormRemember"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div>
                <span>Forgot password?</span>
              </div>
            </div>
            <div className="d-flex row justify-content-around mt-3">
              <p>
                Not a member?
                <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
