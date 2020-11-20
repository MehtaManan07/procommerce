import React, { useState } from 'react';
import { toast } from 'react-toastify';
import DashboardLayout from '../../Components/core/DashboardLayout';
import { auth } from '../../firebase';

const ChangePwd = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error(`Passwords must match`);
      return;
    }
    setLoading(true);
    try {
      await auth.currentUser.updatePassword(password);
      toast.success(`Password successfully updated`);
      setLoading(false);
      setPassword('');
    } catch (error) {
      console.log(error);
      toast.error(`${error.message}`);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {loading ? (
        <h3 className="mt-3 text-center ml-3"> LOADING </h3>
      ) : (
        <h3 className="mt-3 text-center ml-3"> UPDATE PASSWORD </h3>
      )}
      <form>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirm new Password"
          />
        </div>
        <button
          type="button"
          disabled={
            loading || password.length < 6 || passwordConfirm.length < 6
          }
          onClick={submitHandler}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </DashboardLayout>
  );
};

export default ChangePwd;
