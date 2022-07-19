import React from 'react';
import Message from '../Message';
import CheckoutItem from './CheckoutItem';

const Checkout = ({ cartItems }) => {
  return (
    <div className='checkout u-margin-bottom-big flex flex-dc flex-ai-c'>
      <div className='checkout__header'>
        <span>Product</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Remove</span>
      </div>
      {cartItems.length === 0 ? (
        <Message className='error'>Your cart is empty</Message>
      ) : (
        cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.product} cartItem={cartItem} />
        ))
      )}
    </div>
  );
};

export default Checkout;
