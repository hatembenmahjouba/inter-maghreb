import React from 'react';
import Card from '../UI/Card';

const CheckoutOrder = ({ cartItems, checkoutHandler }) => {
  return (
    <div className='flex flex-dc'>
      <Card>
        <p className='card__paragraph'>
          <span className='card__title'>Subtotal :</span> (
          {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
        </p>
        <p className='card__paragraph'>
          <span className='card__title'>Total: </span>
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
          dt
        </p>
        <button
          type='button'
          className='btn'
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Checkout
        </button>
      </Card>
    </div>
  );
};

export default CheckoutOrder;
