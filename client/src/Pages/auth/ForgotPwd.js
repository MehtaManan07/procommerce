import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { UnlockFilled, MailFilled } from '@ant-design/icons';
import { Button } from 'antd';

const ForgotPwd = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.sendPasswordResetEmail(email, {
        url: 'http://localhost:3000/login',
        handleCodeInApp: true,
      });
      toast.success(`Email sent to ${email}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row mt-5 justify-content-center align-items-center">
          <div className="col-md-4 col-md-offset-4">
            <div className="text-center">
              <h3>
                <UnlockFilled style={{ fontSize: '150px' }} />
              </h3>
              {!loading ? (
                <h2 className="text-center">Forgot Password?</h2>
              ) : (
                <h2 className="text-center">Loading...</h2>
              )}
              <p>You can reset your password here.</p>
              <div className="panel-body">
                <form className="form">
                  <div className="form-group">
                    <div className="input-group">
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
                  </div>
                  <div className="form-group">
                    <Button
                      onClick={submitHandler}
                      block
                      shape="round"
                      icon={<MailFilled />}
                      size="large"
                      disabled={loading || !email}
                      type="ghost"
                      className="mb-3"
                    >
                      Reset Password
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPwd;
