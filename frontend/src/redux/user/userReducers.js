import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_PASSWORD_RESET,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_RESET,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_RESET,
  USER_UPDATE_SUCCESS,
  USER_WISHLIST_REQUEST,
  USER_WISHLIST_SUCCESS,
  USER_WISHLIST_FAIL,
  USER_WISHLIST_RESET,
  USER_ADD_WISHLIST_REQUEST,
  USER_ADD_WISHLIST_SUCCESS,
  USER_ADD_WISHLIST_FAIL,
  USER_ADD_WISHLIST_RESET,
  USER_REMOVE_WISHLIST_REQUEST,
  USER_REMOVE_WISHLIST_SUCCESS,
  USER_REMOVE_WISHLIST_FAIL,
  USER_REMOVE_WISHLIST_RESET,
  USER_FORGOTPASSWORD_FAIL,
  USER_FORGOTPASSWORD_SUCCESS,
  USER_FORGOTPASSWORD_REQUEST,
  USER_RESETPASSWORD_REQUEST,
  USER_RESETPASSWORD_SUCCESS,
  USER_RESETPASSWORD_FAIL,
} from './userTypes';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOTPASSWORD_REQUEST:
      return { loading: true };
    case USER_FORGOTPASSWORD_SUCCESS:
      return { loading: false, success: true };
    case USER_FORGOTPASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESETPASSWORD_REQUEST:
      return { loading: true };
    case USER_RESETPASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_RESETPASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_PROFILE_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_PROFILE_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
export const userUpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PASSWORD_REQUEST:
      return { loading: true };
    case USER_UPDATE_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_UPDATE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload.doc,
        pages: action.payload.pages,
        page: action.payload.page,
        count: action.payload.count,
      };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const wishListReducer = (state = { wishlist: [] }, action) => {
  switch (action.type) {
    case USER_WISHLIST_REQUEST:
      return { loading: true };
    case USER_WISHLIST_SUCCESS:
      return { loading: false, wishlist: action.payload.wishlist };
    case USER_WISHLIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_WISHLIST_RESET:
      return { wishlist: [] };
    default:
      return state;
  }
};
export const addWishListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_WISHLIST_REQUEST:
      return { loading: true };
    case USER_ADD_WISHLIST_SUCCESS:
      return { loading: false, success: true };
    case USER_ADD_WISHLIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADD_WISHLIST_RESET:
      return {};
    default:
      return state;
  }
};
export const removeWishListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REMOVE_WISHLIST_REQUEST:
      return { loading: true };
    case USER_REMOVE_WISHLIST_SUCCESS:
      return { loading: false, success: true };
    case USER_REMOVE_WISHLIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_REMOVE_WISHLIST_RESET:
      return {};
    default:
      return state;
  }
};
