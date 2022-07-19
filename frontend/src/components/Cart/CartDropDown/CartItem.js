import React from 'react';

const CartItem = ({ item: { image, price, name, qty } }) => (
  <div className='cart-item flex'>
    <img className='cart-item__image' src={image} alt='item' />
    <div className='cart-item__details flex flex-dc flex-ai-s flex-js-c'>
      <span className='cart-item__name'>{name}</span>
      <span className='cart-item__price'>
        {qty} x {price}dt
      </span>
    </div>
  </div>
);

export default CartItem;
