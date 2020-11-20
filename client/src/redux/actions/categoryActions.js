import * as types from '../types';
import axios from 'axios';

export const newCategory = (name) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/v1/category', name);
    dispatch({ type: types.NEW_CATEGORY, payload: data.data });
    console.log(data);
  } catch (error) {
    console.log(error.response);
  }
};

export const oneCategory = (slug) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/category/${slug}`);
    dispatch({ type: types.ONE_CATEGORY, payload: data.data });
    console.log(data);
  } catch (error) {
    console.log(error.response);
  }
};

export const allCategories = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/category/`);
    dispatch({ type: types.ALL_CATEGORIES, payload: data.data });
    console.log(data);
  } catch (error) {
    console.log(error.response);
  }
};
