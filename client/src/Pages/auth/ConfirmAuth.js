import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { auth } from '../../firebase';

const ConfirmAuth = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitHandler = async (e) => {
   e.preventDefault();
   try {
       const result = await auth.signInWithEmailLink(email,window.location.href)
       if(result.user.emailVerified){
           // remove from local storage
           localStorage.removeItem('emailRegister')
           let user = auth.currentUser
           await user.updatePassword(password)
           const idTokenResult = await user.getIdTokenResult()
           history.push('/')
           console.log(idTokenResult,user)
       }
   } catch (error) {
       console.log(error)
       toast.error(error.message)
   }
  };
  useEffect(() => {
      setEmail(localStorage.getItem('emailRegister'))
  },[])
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder='email'
              className="form-control mb-2"
              autoFocus
              required
              readOnly
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder='Password'
              minLength='6'
              required
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
