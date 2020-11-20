import axios from 'axios';
import firebase from 'firebase'
import * as types from '../types'

export const authLogin = (user, values) => async (dispatch) => {
  try {
    const idtokenResult = await user.getIdTokenResult();
    const res = await axios.post(`/api/v1/auth/login`, values, {
      headers: { authtoken: idtokenResult.token },
    });

    dispatch({
      type: types.LOGGED_IN_USER,
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
      type: types.LOGGED_IN_USER,
      payload: { user: res.data.data },
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
   await firebase.auth().signOut();
   const {data} = await axios.get('/api/v1/auth/logout')
   console.log(data)
      dispatch({
        type: types.LOGOUT_USER,
        payload: null,
      });
  } catch (error) {
    console.log(error)
  }
};
