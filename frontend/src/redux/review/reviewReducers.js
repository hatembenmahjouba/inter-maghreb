import {
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_MY_FAIL,
  REVIEW_DELETE_MY_REQUEST,
  REVIEW_DELETE_MY_RESET,
  REVIEW_DELETE_MY_SUCCESS,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_RESET,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DETAILS_FAIL,
  REVIEW_DETAILS_REQUEST,
  REVIEW_DETAILS_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_MY_FAIL,
  REVIEW_LIST_MY_REQUEST,
  REVIEW_LIST_MY_RESET,
  REVIEW_LIST_MY_SUCCESS,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_RESET,
  REVIEW_LIST_SUCCESS,
  REVIEW_UPDATE_MY_FAIL,
  REVIEW_UPDATE_MY_REQUEST,
  REVIEW_UPDATE_MY_RESET,
  REVIEW_UPDATE_MY_SUCCESS,
} from './reviewTypes';

export const reviewListMyReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case REVIEW_LIST_MY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REVIEW_LIST_MY_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case REVIEW_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case REVIEW_LIST_MY_RESET:
      return {
        reviews: [],
      };

    default:
      return state;
  }
};

export const reviewDeleteMyReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_DELETE_MY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REVIEW_DELETE_MY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REVIEW_DELETE_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case REVIEW_DELETE_MY_RESET:
      return {};

    default:
      return state;
  }
};

export const reviewUpdateMyReducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case REVIEW_UPDATE_MY_REQUEST:
      return { loading: true };
    case REVIEW_UPDATE_MY_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case REVIEW_UPDATE_MY_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_UPDATE_MY_RESET:
      return { review: {} };
    default:
      return state;
  }
};

export const reviewDetailsReducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case REVIEW_DETAILS_REQUEST:
      return { ...state, loading: true };
    case REVIEW_DETAILS_SUCCESS:
      return { loading: false, review: action.payload };
    case REVIEW_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reviewListReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case REVIEW_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REVIEW_LIST_SUCCESS:
      return {
        loading: false,
        reviews: action.payload.doc,
        pages: action.payload.pages,
        page: action.payload.page,
        count: action.payload.count,
      };
    case REVIEW_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case REVIEW_LIST_RESET:
      return {
        reviews: [],
      };

    default:
      return state;
  }
};

export const reviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REVIEW_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REVIEW_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case REVIEW_DELETE_RESET:
      return {};

    default:
      return state;
  }
};
