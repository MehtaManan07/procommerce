import * as types from '../types';
import axios from 'axios';

export const newCategory = (name, toast) => async (dispatch) => {
  console.log(name);
  try {
    const { data } = await axios.post('/api/v1/category', { name });
    dispatch({ type: types.NEW_CATEGORY, payload: data.data });
    dispatch(allCategories(toast));
    console.log(data);
    if (data.success) toast.success(`Category ${data.data.name} added`);
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error.response.data.error);
  }
};

export const newSubCategory = (name, id, toast) => async (dispatch) => {
  console.log(name);
  try {
    const { data } = await axios.post(`/api/v1/category/${id}/subcategory`, { name });
    dispatch({ type: types.NEW_SUBCATEGORY, payload: data.data });
    dispatch(allCategories(toast));
    console.log(data);
    if (data.success) toast.success(`Category ${data.data.name} added`);
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error.response.data.error);
  }
};

export const updateCategory = (name, toast, id) => async (dispatch) => {
  console.log(name);
  try {
    const { data } = await axios.put(`/api/v1/category/${id}`, { name });
    dispatch({ type: types.UPDATE_CATEGORY, payload: data.data });
    dispatch(allCategories(toast));
    console.log(data);
    if (data.success) toast.success(`Updated successfully`);
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error.response.data.error);
  }
};

export const updateSubCategory = (name, toast, id) => async (dispatch) => {
  console.log(name);
  try {
    const { data } = await axios.put(`/api/v1/subcategory/${id}`, { name });
    dispatch({ type: types.UPDATE_SUBCATEGORY, payload: data.data });
    dispatch(allCategories(toast));
    console.log(data);
    if (data.success) toast.success(`Updated successfully`);
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error.response.data.error);
  }
};

export const oneCategory = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/category/${id}`);
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

export const allSubCategories = (toast) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/subcategory`);
    dispatch({ type: types.ALL_SUBCATEGORIES, payload: data.data });
    console.log(data);
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteCategory = (id, toast) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/v1/category/${id}`);
    dispatch({ type: types.DELETE_CATEGORY, payload: data.data });
    toast.warning(`Category deleted successfully`);
    console.log(data);
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteSubCategory = (id, toast) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/v1/subcategory/${id}`);
    dispatch({ type: types.DELETE_SUBCATEGORY, payload: data.data });
    toast.warning(`Category deleted successfully`);
    console.log(data);
  } catch (error) {
    console.log(error.response);
  }
};
