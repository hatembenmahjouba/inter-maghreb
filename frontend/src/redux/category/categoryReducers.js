import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_RESET,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_RESET,
  CATEGORY_LIST_SUB_REQUEST,
  CATEGORY_LIST_SUB_SUCCESS,
  CATEGORY_LIST_SUB_FAIL,
  CATEGORY_LIST_SUB_RESET,
  CATEGORY_CREATE_RESET,
  CATEGORY_PRODUCTS_REQUEST,
  CATEGORY_PRODUCTS_SUCCESS,
  CATEGORY_PRODUCTS_FAIL,
  CATEGORY_SUB_PRODUCTS_REQUEST,
  CATEGORY_SUB_PRODUCTS_SUCCESS,
  CATEGORY_SUB_PRODUCTS_FAIL,
  CATEGORY_SUB_PRODUCTS_RESET,
} from './categoryTypes';

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CATEGORY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CATEGORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: action.payload.doc,
      };
    case CATEGORY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const categoryDetailsReducer = (
  state = { category: { products: [] } },
  action
) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_DETAILS_SUCCESS:
      return { loading: false, category: action.payload };
    case CATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_DETAILS_RESET:
      return { category: {} };
    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case CATEGORY_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        category: action.payload,
      };
    case CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_UPDATE_RESET:
      return { category: {} };
    default:
      return state;
  }
};

export const categoryGetSubReducer = (
  state = { category: '', subs: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_LIST_SUB_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_LIST_SUB_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case CATEGORY_LIST_SUB_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_LIST_SUB_RESET:
      return { category: '', subs: [] };
    default:
      return state;
  }
};

export const categorySubProductsReducer = (
  state = { subCategory: {}, category: {}, products: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_SUB_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_SUB_PRODUCTS_SUCCESS:
      return {
        loading: false,
        success: true,
        subCategory: action.payload.subCategory,
        category: action.payload.category,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        count: action.payload.count,
      };
    case CATEGORY_SUB_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_SUB_PRODUCTS_RESET:
      return {};
    default:
      return state;
  }
};
export const categoryProductsReducer = (
  state = { category: {}, products: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_PRODUCTS_SUCCESS:
      return {
        loading: false,
        category: action.payload.category,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        count: action.payload.count,
      };
    case CATEGORY_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
