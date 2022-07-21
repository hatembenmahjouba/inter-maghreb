import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from './orderTypes';
import { CART_CLEAR_ITEMS } from '../cart/cartTypes';
import { logout } from '../user/userActions';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`/api/v1/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });
    localStorage.removeItem('cartItems');
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
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/orders/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
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
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const ListMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/orders/myorders`);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
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
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const listOrders =
  (search = '', page = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      });

      const { data } = await axios.get(
        `/api/v1/orders?${
          !search ? '' : `orderNumber=${search}&`
        }page=${page}&limit=30&sort=-updatedAt,-createdAt`
      );

      dispatch({
        type: ORDER_LIST_SUCCESS,
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
        type: ORDER_LIST_FAIL,
        payload: message,
      });
    }
  };

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const { data } = await axios.put(`/api/v1/orders/${order._id}/deliver`, {});

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
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
      type: ORDER_DELIVER_FAIL,
      payload: message,
    });
  }
};
