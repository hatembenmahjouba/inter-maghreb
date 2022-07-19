import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from './cartTypes';

export const addToCart = (slug, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${slug}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      slug: data.slug,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const clearFromCart = (slug) => (dispatch, getState) => {
  dispatch({
    type: CART_CLEAR_ITEM,
    payload: slug,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
export const saveShippingAdress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
