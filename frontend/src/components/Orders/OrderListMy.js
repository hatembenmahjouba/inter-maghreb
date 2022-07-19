import React from 'react';
import { Link } from 'react-router-dom';
import Message from '../Message';

const OrderListMy = ({ orders }) => {
  return (
    <table className='data-table'>
      <thead className='data-table__header'>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th>DETAILS</th>
        </tr>
      </thead>
      <tbody className='data-table__body'>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{order.totalPrice}</td>
            <td>
              {order.isPaid ? (
                <Message className='status-green'>
                  order.paidAt.substring(0, 10)
                </Message>
              ) : (
                <Message className='status-red'>Not Paid</Message>
              )}
            </td>
            <td>
              {order.isDelivered ? (
                <Message className='status-green'>
                  {' '}
                  {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                <Message className='status-red'>Not Delivered</Message>
              )}
            </td>
            <td>
              <Link to={`/order/${order._id}`}>
                <button className='btn-text'>Details</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default OrderListMy;
