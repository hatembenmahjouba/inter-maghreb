import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../order/orderTypes';
import { REVIEW_LIST_MY_RESET } from '../review/reviewTypes';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_WISHLIST_REQUEST,
  USER_WISHLIST_SUCCESS,
  USER_WISHLIST_FAIL,
  USER_ADD_WISHLIST_REQUEST,
  USER_ADD_WISHLIST_SUCCESS,
  USER_ADD_WISHLIST_FAIL,
  USER_REMOVE_WISHLIST_REQUEST,
  USER_REMOVE_WISHLIST_SUCCESS,
  USER_REMOVE_WISHLIST_FAIL,
  USER_FORGOTPASSWORD_REQUEST,
  USER_FORGOTPASSWORD_SUCCESS,
  USER_FORGOTPASSWORD_FAIL,
  USER_RESETPASSWORD_REQUEST,
  USER_RESETPASSWORD_SUCCESS,
  USER_RESETPASSWORD_FAIL,
} from './userTypes';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/v1/users/login',
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
    localStorage.setItem('userInfo', JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  await axios.get('/api/v1/users/logout');
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({
    type: USER_LOGOUT,
  });

  dispatch({
    type: USER_DETAILS_RESET,
  });
  dispatch({
    type: ORDER_LIST_MY_RESET,
  });
  dispatch({
    type: USER_LIST_RESET,
  });
  dispatch({ type: REVIEW_LIST_MY_RESET });
};

export const register =
  (name, email, password, passwordConfirm) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/v1/users/signup',
        { name, email, password, passwordConfirm },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data.user,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.user,
      });

      localStorage.setItem('userInfo', JSON.stringify(data.user));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FORGOTPASSWORD_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post('/api/v1/users/forgotpassword', { email }, config);

    dispatch({
      type: USER_FORGOTPASSWORD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_FORGOTPASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPassword =
  (token, password, passwordConfirm) => async (dispatch) => {
    try {
      dispatch({
        type: USER_RESETPASSWORD_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.patch(
        `/api/v1/users/resetPassword/${token}`,
        { password, passwordConfirm },
        config
      );

      dispatch({
        type: USER_RESETPASSWORD_SUCCESS,
        payload: data.user,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.user,
      });

      localStorage.setItem('userInfo', JSON.stringify(data.user));
    } catch (error) {
      dispatch({
        type: USER_RESETPASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/users/me`);

    dispatch({
      type: USER_PROFILE_SUCCESS,
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
      type: USER_PROFILE_FAIL,
      payload: message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(`/api/v1/users/updateMe`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
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
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};
export const updateUserPassword = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PASSWORD_REQUEST,
    });

    const { data } = await axios.patch(`/api/v1/users/updateMyPassword`, user);
    dispatch({
      type: USER_UPDATE_PASSWORD_SUCCESS,
      payload: data.user,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem('userInfo', JSON.stringify(data.user));
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
      type: USER_UPDATE_PASSWORD_FAIL,
      payload: message,
    });
  }
};

export const listUsers =
  (page = '', search = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      });

      const { data } = await axios.get(
        `/api/v1/users?page=${page}&sort=-updateAt&email[regex]=${search}&email[options]=i&limit=30`
      );

      dispatch({
        type: USER_LIST_SUCCESS,
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
        type: USER_LIST_FAIL,
        payload: message,
      });
    }
  };

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/users/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
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
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    await axios.delete(`/api/v1/users/${id}`);

    dispatch({
      type: USER_DELETE_SUCCESS,
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
      type: USER_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.patch(
      `/api/v1/users/${user._id}`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });
    dispatch({
      type: USER_DETAILS_SUCCESS,
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
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const getWishlist = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_WISHLIST_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/users/wishlist`);
    console.log(data);

    dispatch({
      type: USER_WISHLIST_SUCCESS,
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
      type: USER_WISHLIST_FAIL,
      payload: message,
    });
  }
};

export const addWishlist = (productId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADD_WISHLIST_REQUEST,
    });

    const { data } = await axios.post(`/api/v1/users/wishlist`, { productId });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_ADD_WISHLIST_SUCCESS,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
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
      type: USER_ADD_WISHLIST_FAIL,
      payload: message,
    });
  }
};

export const removeWishlist = (productId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_REMOVE_WISHLIST_REQUEST,
    });

    const { data } = await axios.patch(`/api/v1/users/wishlist/${productId}`, {
      productId,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_REMOVE_WISHLIST_SUCCESS,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
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
      type: USER_REMOVE_WISHLIST_FAIL,
      payload: message,
    });
  }
};
