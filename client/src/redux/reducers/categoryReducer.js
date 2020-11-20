import * as types from '../types';

const initialState = {
  category: null,
  categories: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.NEW_CATEGORY:
      return { ...state };

    default:
      return state;
  }
};
