import * as types from '../types';
import axios from 'axios';

export const newCategory = (name, toast) => async (dispatch) => {
  console.log(name)
  try {
    const { data } = await axios.post('/api/v1/category', {name});
    dispatch({ type: types.NEW_CATEGORY, payload: data.data });
    dispatch(allCategories(toast))
    console.log(data);
    if (data.success) toast.success(`Category ${data.data.name} added`);
  } catch (error) {
    toast.error(error.response.data.error)
    console.log(error.response.data.error);
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

export const allCategories = (toast) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/category/`);
    dispatch({ type: types.ALL_CATEGORIES, payload: data.data });
    console.log(data);
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteCategory = (slug,toast) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/v1/category/${slug}`);
    dispatch({ type: types.DELETE_CATEGORY, payload: data.data });
    toast.warning(`Category deleted successfully`)
    console.log(data);
  } catch (error) {
    console.log(error.response);
  }
};
