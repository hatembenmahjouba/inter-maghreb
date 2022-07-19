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
  SUBCATEGORY_UPDATE_RESET,
} from './subCategoryTypes';

export const subCategoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBCATEGORY_CREATE_REQUEST:
      return {
        loading: true,
      };
    case SUBCATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case SUBCATEGORY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const subCategoryListReducer = (
  state = { subCategories: [] },
  action
) => {
  switch (action.type) {
    case SUBCATEGORY_LIST_REQUEST:
      return {
        loading: true,
      };
    case SUBCATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        subCategories: action.payload.doc,
      };
    case SUBCATEGORY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const subCategoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBCATEGORY_DELETE_REQUEST:
      return { loading: true };
    case SUBCATEGORY_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SUBCATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const subCategoryDetailsReducer = (
  state = { subCategory: {} },
  action
) => {
  switch (action.type) {
    case SUBCATEGORY_DETAILS_REQUEST:
      return { loading: true, ...state };
    case SUBCATEGORY_DETAILS_SUCCESS:
      return { loading: false, subCategory: action.payload };
    case SUBCATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subCategoryUpdateReducer = (
  state = { subCategory: {} },
  action
) => {
  switch (action.type) {
    case SUBCATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case SUBCATEGORY_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        subCategory: action.payload,
      };
    case SUBCATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SUBCATEGORY_UPDATE_RESET:
      return { subCategory: {} };
    default:
      return state;
  }
};
