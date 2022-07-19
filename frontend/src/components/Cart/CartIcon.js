import React from 'react';

import { useSelector } from 'react-redux';
import { ReactComponent as Cart } from '../../assets/img/SVG/shopping-cart.svg';

const CartIcon = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const itemCount = cartItems.reduce(
    (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.qty,
    0
  );
  return (
    <div className='cart-icon flex flex-jc-c flex-ai-c'>
      <Cart className='cart-icon__icon' />
      <span className='cart-icon__item-count'>{itemCount}</span>
    </div>
  );
};
export default CartIcon;
