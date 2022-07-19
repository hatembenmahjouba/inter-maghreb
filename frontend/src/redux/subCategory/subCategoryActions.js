import axios from 'axios';
import {
  SUBCATEGORY_CREATE_FAIL,
  SUBCATEGORY_CREATE_REQUEST,
  SUBCATEGORY_CREATE_SUCCESS,
  SUBCATEGORY_LIST_SUCCESS,
  SUBCATEGORY_LIST_REQUEST,
  SUBCATEGORY_LIST_FAIL,
  SUBCATEGORY_DELETE_REQUEST,
  SUBCATEGORY_DELETE_FAIL,
  SUBCATEGORY_DELETE_SUCCESS,
  SUBCATEGORY_UPDATE_REQUEST,
  SUBCATEGORY_UPDATE_SUCCESS,
  SUBCATEGORY_UPDATE_FAIL,
  SUBCATEGORY_DETAILS_SUCCESS,
  SUBCATEGORY_DETAILS_REQUEST,
  SUBCATEGORY_DETAILS_FAIL,
} from './subCategoryTypes';
import { logout } from '../user/userActions';

export const createSubCategory =
  (name, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SUBCATEGORY_CREATE_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `/api/v1/subcategories`,
        { name, category },
        config
      );

      dispatch({
        type: SUBCATEGORY_CREATE_SUCCESS,
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
        type: SUBCATEGORY_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const listSubCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: SUBCATEGORY_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/subcategories`);

    dispatch({
      type: SUBCATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubCategory = (slug) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBCATEGORY_DELETE_REQUEST,
    });

    await axios.delete(`/api/v1/subcategories/${slug}`);

    dispatch({
      type: SUBCATEGORY_DELETE_SUCCESS,
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
      type: SUBCATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};

export const getSubCategoryDetails = (slug) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBCATEGORY_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/subcategories/${slug}`);

    dispatch({
      type: SUBCATEGORY_DETAILS_SUCCESS,
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
      type: SUBCATEGORY_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateSubCategory =
  (subCategory) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SUBCATEGORY_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.patch(
        `/api/v1/subcategories/${subCategory.slug}`,
        subCategory,
        config
      );

      dispatch({
        type: SUBCATEGORY_UPDATE_SUCCESS,
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
        type: SUBCATEGORY_UPDATE_FAIL,
        payload: message,
      });
    }
  };
