import React from 'react';

import { useHistory } from 'react-router-dom';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import Message from '../../Message';

const CartDropDown = ({ click }) => {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <div className='cart-dropdown flex flex-dc'>
      <div className='cart-dropdown__items flex flex-dc'>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.product} item={cartItem} />
          ))
        ) : (
          <Message className='error'>Your cart is empty</Message>
        )}
      </div>
      <button
        className='cart-dropdown__btn btn'
        onClick={() => {
          history.push('/cart');
          click();
        }}
      >
        GO TO CHECKOUT
      </button>
    </div>
  );
};

export default CartDropDown;
