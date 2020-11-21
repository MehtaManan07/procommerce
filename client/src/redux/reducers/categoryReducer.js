import * as types from '../types';

const initialState = {
  category: null,
  categories: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ALL_CATEGORIES:
      return {
        ...state,
        categories: payload,
        error: null,
      };
    case types.NEW_CATEGORY:
      console.log(payload)
      return {
        ...state,
        categories: [payload, ...state.categories],
        error: null,
      };
    default:
      return state;
  }
};
