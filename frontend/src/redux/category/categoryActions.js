import axios from 'axios';
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_LIST_SUB_REQUEST,
  CATEGORY_LIST_SUB_SUCCESS,
  CATEGORY_LIST_SUB_FAIL,
  CATEGORY_PRODUCTS_SUCCESS,
  CATEGORY_PRODUCTS_REQUEST,
  CATEGORY_PRODUCTS_FAIL,
  CATEGORY_SUB_PRODUCTS_REQUEST,
  CATEGORY_SUB_PRODUCTS_SUCCESS,
  CATEGORY_SUB_PRODUCTS_FAIL,
} from './categoryTypes';
import { logout } from '../user/userActions';

export const createCategory = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`/api/v1/categories`, { name }, config);

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (
      message === 'You are not logged in! Please log in to get access.' ||
      message === 'The user belonging to this token does no longer exist.' ||
      message === 'User recently changed password! Please log in again.'
    ) {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: message,
    });
  }
};

export const listCategory = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/categories`);

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteCategory = (slug) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    });

    await axios.delete(`/api/v1/categories/${slug}`);

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (
      message === 'You are not logged in! Please log in to get access.' ||
      message === 'The user belonging to this token does no longer exist.' ||
      message === 'User recently changed password! Please log in again.'
    ) {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};

export const getCategoryDetails = (slug) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/categories/${slug}`);

    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(
      `/api/v1/categories/${category.slug}`,
      category,
      config
    );

    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (
      message === 'You are not logged in! Please log in to get access.' ||
      message === 'The user belonging to this token does no longer exist.' ||
      message === 'User recently changed password! Please log in again.'
    ) {
      dispatch(logout());
    }

    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const getSubByCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_LIST_SUB_REQUEST,
    });

    const { data } = await axios.get(
      `/api/v1/categories/${category}/subcategories`
    );

    dispatch({
      type: CATEGORY_LIST_SUB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (
      message === 'You are not logged in! Please log in to get access.' ||
      message === 'The user belonging to this token does no longer exist.' ||
      message === 'User recently changed password! Please log in again.'
    ) {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_LIST_SUB_FAIL,
      payload: message,
    });
  }
};

export const getSubProductsCategory =
  (slugCat, slugSub, search = '', page = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: CATEGORY_SUB_PRODUCTS_REQUEST,
      });

      const { data } = await axios.get(
        `/api/v1/categories/${slugCat}/subcategories/${slugSub}/products?page=${page}&limit=30`
      );

      dispatch({
        type: CATEGORY_SUB_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: CATEGORY_SUB_PRODUCTS_FAIL,
        payload: message,
      });
    }
  };

export const getProductsByCategory =
  (slug, search = '', page = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: CATEGORY_PRODUCTS_REQUEST,
      });

      const { data } = await axios.get(
        `/api/v1/categories/${slug}/products?name[regex]=${search}&name[options]=i&page=${page}&limit=30`
      );

      dispatch({
        type: CATEGORY_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CATEGORY_PRODUCTS_FAIL,
        payload: message,
      });
    }
  };
