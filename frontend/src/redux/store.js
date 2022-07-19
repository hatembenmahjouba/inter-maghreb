import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
  productTopListReducer,
  productNewListReducer,
} from './product/productReducers';

import { cartReducer } from './cart/cartReducers';
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryListReducer,
  categoryUpdateReducer,
  categoryGetSubReducer,
  categoryProductsReducer,
  categorySubProductsReducer,
} from './category/categoryReducers';
import {
  subCategoryCreateReducer,
  subCategoryDeleteReducer,
  subCategoryDetailsReducer,
  subCategoryListReducer,
  subCategoryUpdateReducer,
} from './subCategory/subCategoryReducers';
import {
  userUpdateProfileReducer,
  userUpdatePasswordReducer,
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userDetailsReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  wishListReducer,
  addWishListReducer,
  removeWishListReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
} from './user/userReducers';
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
} from './order/orderReducers';
import {
  reviewDeleteMyReducer,
  reviewDeleteReducer,
  reviewDetailsReducer,
  reviewListMyReducer,
  reviewListReducer,
  reviewUpdateMyReducer,
} from './review/reviewReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productTopList: productTopListReducer,
  productNewList: productNewListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  reviewListMy: reviewListMyReducer,
  reviewList: reviewListReducer,
  reviewDeleteMy: reviewDeleteMyReducer,
  reviewDelete: reviewDeleteReducer,
  reviewUpdateMy: reviewUpdateMyReducer,
  reviewDetails: reviewDetailsReducer,
  cart: cartReducer,
  categoryCreate: categoryCreateReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryProducts: categoryProductsReducer,
  categoryGetSub: categoryGetSubReducer,
  categorySubProducts: categorySubProductsReducer,
  subCategoryCreate: subCategoryCreateReducer,
  subCategoryList: subCategoryListReducer,
  subCategoryDetails: subCategoryDetailsReducer,
  subCategoryUpdate: subCategoryUpdateReducer,
  subCategoryDelete: subCategoryDeleteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  userProfile: userProfileReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  wishList: wishListReducer,
  addWishList: addWishListReducer,
  removeWishList: removeWishListReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : { address: '', city: '', postalCode: '', country: '', phoneNumber: '' };

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
