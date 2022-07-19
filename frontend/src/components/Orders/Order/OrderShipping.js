import React from 'react';
import Message from '../../Message';

const OrderShipping = ({ order }) => (
  <div className='order-shipping flex flex-dc flex-jc-c'>
    <h3 className='heading-3'>Shipping</h3>
    <p className='paragraph'>
      <span>Name:</span>{' '}
      {order.user && order.user.name ? <>{order.user.name}</> : <>No Name</>}
    </p>
    <p className='paragraph'>
      <span>Phone number:</span> {order.shippingAddress.phoneNumber}
    </p>
    <p className='paragraph'>
      {order.user && order.user.email ? (
        <a className='btn-text' href={`mailto:${order.user.email}`}>
          {order.user.email}
        </a>
      ) : (
        <>No Email</>
      )}
    </p>
    <p className='paragraph'>
      <span>Address:</span> {order.shippingAddress.address},{' '}
      {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
      {order.shippingAddress.country}
    </p>
    {order.isDelivered ? (
      <Message className='status-green'>
        Delivered on {order.deliveredAt}
      </Message>
    ) : (
      <Message className='status-red'>Not Delivered</Message>
    )}
    {order.isPaid ? (
      <Message className='status-green'>Paid on {order.paidAt}</Message>
    ) : (
      <Message className='status-red'>Not Paid</Message>
    )}
  </div>
);

export default OrderShipping;
