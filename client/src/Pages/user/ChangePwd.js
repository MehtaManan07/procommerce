import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UserNav from '../../Components/user/UserNav';
import { auth } from '../../firebase';

const ChangePwd = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.currentUser.updatePassword(password);
      toast.success(`Password successfully updated`);
      setLoading(false);
      setPassword('')
    } catch (error) {
      console.log(error);
      toast.error(`${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2.8">
          <UserNav />
        </div>
        <div className="col-md-6 mt-5">
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
                placeholder="Password"
              />
            </div>
            <button
              type="button"
              disabled={loading || password.length < 6}
              onClick={submitHandler}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePwd;
