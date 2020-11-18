import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { authLogin } from '../../redux/actions/auth';

const ConfirmAuth = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if(password !== passwordConfirm){
        toast.error(`Passwords must match`)
        return;
      }
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // remove from local storage
        localStorage.removeItem('emailRegister');
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        dispatch(authLogin(user,{name,email,password}));
        history.push('/');
        console.log(idTokenResult, user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    setEmail(localStorage.getItem('emailRegister'));
  }, []);
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          <form onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              required
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              minLength="6"
              required
              className="form-control"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
            <button className="btn btn-raised btn-success mt-3" type="submit">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAuth;
