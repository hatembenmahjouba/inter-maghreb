import axios from 'axios';

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_LIST_REQUEST,
  PRODUCT_TOP_LIST_SUCCESS,
  PRODUCT_TOP_LIST_FAIL,
  PRODUCT_NEW_LIST_REQUEST,
  PRODUCT_NEW_LIST_SUCCESS,
  PRODUCT_NEW_LIST_FAIL,
} from './productTypes';
import { logout } from '../user/userActions';

export const listProducts =
  (search = '', page = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/v1/products?name[regex]=${search}&name[options]=i&page=${page}&limit=30`
      );

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_LIST_REQUEST });

    const { data } = await axios.get(`/api/v1/products/top-5-products`);

    dispatch({
      type: PRODUCT_TOP_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listNewProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_NEW_LIST_REQUEST });

    const { data } = await axios.get(`/api/v1/products/new-5-products`);

    dispatch({
      type: PRODUCT_NEW_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_NEW_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDetails = (slug) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/products/${slug}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (slug) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    await axios.delete(`/api/v1/products/${slug}`);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
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
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createProduct =
  (
    name,
    brand,
    image,
    category,
    subCategory,
    countInStock,
    price,
    description
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      });

      const { data } = await axios.post(`/api/v1/products`, {
        name,
        brand,
        image,
        category,
        subCategory,
        countInStock,
        price,
        description,
      });

      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
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
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      });
    }
  };
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(
      `/api/v1/products/${product.productSlug}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
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
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createReviewProduct = (review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post(`/api/v1/reviews`, review, config);

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
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
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: message,
    });
  }
};
