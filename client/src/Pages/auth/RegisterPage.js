import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import { auth } from '../../firebase';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  console.log(process.env.REACT_APP_SIGNUP_REDIRECT_URL)
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await auth.sendSignInLinkToEmail(email, {
        url: 'http://localhost:3000/confirmRegister',
        handleCodeInApp: true,
      });
      toast.success(`Email sent to ${email}`)
      localStorage.setItem('emailRegister',email)
      setEmail('')
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder='email'
              className="form-control"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-raised btn-success mt-3" type="submit">
              Signup
            </button>
            <div className="d-flex row justify-content-around mt-3">
              <p>
                Already a member?
                <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
