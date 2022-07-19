import React from 'react';

import Card from '../UI/Card';

const OrderSummary = ({ order, children }) => {
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = order;
  return (
    <div className='flex flex-dc flex-jc-c'>
      <Card>
        <h3 className='heading-3'>Order Summary</h3>
        <p className='card__paragraph'>
          <span className='card__title'>Items: </span>
          {itemsPrice}dt
        </p>
        <p className='card__paragraph'>
          <span className='card__title'>Shipping: </span>
          {shippingPrice}dt
        </p>
        <p className='card__paragraph'>
          <span className='card__title'>Tax: </span>
          {taxPrice}
        </p>
        <p className='card__paragraph'>
          <span className='card__title'>Total: </span>
          {totalPrice}
        </p>
        {children}
      </Card>
    </div>
  );
};

export default OrderSummary;
