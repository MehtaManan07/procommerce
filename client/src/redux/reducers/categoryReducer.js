import * as types from '../types';

const initialState = {
  category: null,
  categories: [],
  subcategories: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ALL_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case types.ALL_SUBCATEGORIES:
      return {
        ...state,
        subcategories: payload,
      };

    case types.NEW_CATEGORY:
      console.log(payload);
      return {
        ...state,
        categories: [payload, ...state.categories],
      };

    case types.NEW_CATEGORY:
      console.log(payload);
      return {
        ...state,
        subcategories: [payload, ...state.subcategories],
      };

    case types.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== payload._id
        ),
      };

    case types.DELETE_SUBCATEGORY:
      return {
        ...state,
        subcategories: state.subcategories.filter(
          (category) => category.id !== payload._id
        ),
      };
    default:
      return state;
  }
};
