import axios from 'axios';
const url = process.env.REACT_APP_API;

export const authLogin = (user, values) => async (dispatch) => {
  try {
    const idtokenResult = await user.getIdTokenResult();
    const res = await axios.post(`/api/v1/auth/login`, values, {
      headers: { authtoken: idtokenResult.token },
    });

    dispatch({
      type: 'LOGGED_IN_USER',
      payload: { user: res.data.data },
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const actualLogin = (user) => async (dispatch) => {
  try {
    const idtokenResult = await user.getIdTokenResult();
    const res = await axios.post(
      `/api/v1/auth/me`,
      {},
      { headers: { authtoken: idtokenResult.token } }
    );
    console.log(res.data);

    dispatch({
      type: 'LOGGED_IN_USER',
      payload: { user: res.data.data },
    });
  } catch (error) {
    console.log(error.response);
  }
};
