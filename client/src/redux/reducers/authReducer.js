import * as types from '../types'
export default (state = null, { type, payload }) => {
  switch (type) {
    case types.LOGGED_IN_USER:
      return payload;
    case types.LOGOUT_USER:
      return payload;

    default:
      return state;
  }
};
