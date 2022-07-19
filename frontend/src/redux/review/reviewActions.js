import axios from 'axios';
import {
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_MY_FAIL,
  REVIEW_DELETE_MY_REQUEST,
  REVIEW_DELETE_MY_SUCCESS,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DETAILS_FAIL,
  REVIEW_DETAILS_REQUEST,
  REVIEW_DETAILS_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_MY_FAIL,
  REVIEW_LIST_MY_REQUEST,
  REVIEW_LIST_MY_SUCCESS,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_UPDATE_MY_FAIL,
  REVIEW_UPDATE_MY_REQUEST,
  REVIEW_UPDATE_MY_SUCCESS,
} from './reviewTypes';
import { logout } from '../user/userActions';

export const ListMyReviews = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/reviews/myreviews`);

    dispatch({
      type: REVIEW_LIST_MY_SUCCESS,
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
      type: REVIEW_LIST_MY_FAIL,
      payload: message,
    });
  }
};
export const deleteMyReview = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_DELETE_MY_REQUEST,
    });

    await axios.delete(`/api/v1/reviews/myreviews/${id}`);

    dispatch({
      type: REVIEW_DELETE_MY_SUCCESS,
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
      type: REVIEW_DELETE_MY_FAIL,
      payload: message,
    });
  }
};

export const updateMyReview =
  (reviewId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: REVIEW_UPDATE_MY_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.patch(
        `/api/v1/reviews/myreviews/${reviewId}`,
        review,
        config
      );

      dispatch({
        type: REVIEW_UPDATE_MY_SUCCESS,
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
        type: REVIEW_UPDATE_MY_FAIL,
        payload: message,
      });
    }
  };

export const getReviewDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/reviews/${id}`);

    dispatch({
      type: REVIEW_DETAILS_SUCCESS,
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
      type: REVIEW_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const ListReviews =
  (page = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: REVIEW_LIST_REQUEST,
      });

      const { data } = await axios.get(
        `/api/v1/reviews?page=${page}&limit=30&sort=-updatedAt,-createdAt`
      );

      dispatch({
        type: REVIEW_LIST_SUCCESS,
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
        type: REVIEW_LIST_FAIL,
        payload: message,
      });
    }
  };

export const deleteReview = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_DELETE_REQUEST,
    });

    await axios.delete(`/api/v1/reviews/${id}`);

    dispatch({
      type: REVIEW_DELETE_SUCCESS,
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
      type: REVIEW_DELETE_FAIL,
      payload: message,
    });
  }
};
