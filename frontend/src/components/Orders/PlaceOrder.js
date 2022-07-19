import React from 'react';
import Message from '../Message';

import OrderItem from './OrderItem';

const PlaceOrder = ({ cart }) => {
  return (
    <div className='place-order flex flex-dc'>
      <div className='order-shipping flex flex-dc'>
        <h3 className='heading-3'>Shipping</h3>
        <p className='paragraph'>
          <span>Address:</span> {cart.shippingAddress.address},{' '}
          {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
          {cart.shippingAddress.country}
        </p>
      </div>
      <div className='place-order__orderItems flex flex-dc'>
        <h3 className='heading-3'>Order Items</h3>
        {cart.cartItems.length === 0 ? (
          <Message className='error'>Your cart is empty</Message>
        ) : (
          <>
            {cart.cartItems.map((item, index) => (
              <OrderItem key={index} orderItem={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
