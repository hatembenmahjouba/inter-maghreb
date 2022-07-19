import {
  CART_ADD_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_CLEAR_ITEMS,
  CART_CLEAR_ITEM,
} from './cartTypes';

const addItemToCart = (cartItems, cartItemToAdd) => {
  if (cartItemToAdd.qty > cartItemToAdd.countInStock) {
    return cartItems;
  }

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.product === cartItemToAdd.product
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.product === existingCartItem.product ? cartItemToAdd : cartItem
    );
  }

  return [...cartItems, cartItemToAdd];
};

export const cartReducer = (
  state = {
    cartItems: [],
    shippingAddress: {
      address: '',
      city: '',
      postalCode: '',
      country: '',
      phoneNumber: '',
    },
  },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };

    case CART_CLEAR_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.slug !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
