import React from 'react';

import OrderShipping from './OrderShipping';
import Message from '../../Message';
import OrderItem from '../OrderItem';

const Order = ({ order }) => (
  <div className='order'>
    <OrderShipping order={order} />
    <div className='order__orderItems flex flex-dc'>
      <h3 className='heading-3'>Order Items</h3>
      {order.orderItems.length <= 0 ? (
        <Message className='error'>Order is empty</Message>
      ) : (
        <>
          {order.orderItems.map((item, index) => (
            <OrderItem key={index} orderItem={item} />
          ))}
        </>
      )}
    </div>
  </div>
);

export default Order;
