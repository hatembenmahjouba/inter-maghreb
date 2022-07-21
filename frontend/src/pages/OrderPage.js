import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, deliverOrder } from '../redux/order/orderActions';
import { ORDER_DELIVER_RESET } from '../redux/order/orderTypes';

import Order from '../components/Orders/Order/Order';
import OrderSummary from '../components/Orders/OrderSummary';
import Message from '../components/Message';
import Spiner from '../components/Spiner';

const OrderPage = () => {
  const params = useParams();
  const orderId = params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver } = orderDeliver;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!order || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, successDeliver, order, orderId]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <section className='section-container'>
      <Spiner isLoading={loading} />
    </section>
  ) : error ? (
    <section className='section-container'>
      <Message className='error'>{error}</Message>
    </section>
  ) : (
    order && (
      <>
        <section className='section-content flex flex-dc flex-ai-c'>
          <h2 className='heading-2'>
            Order {order.orderNumber.toString().padStart(8, '0')}
          </h2>
        </section>
        <section className='section-order flex flex-dc'>
          <Order order={order} />
        </section>
        <section className='section-ordersummary'>
          <OrderSummary order={order}>
            {userInfo && userInfo.role === 'admin' && !order.isDelivered && (
              <button className='btn' onClick={deliverHandler}>
                Mark As Delivered
              </button>
            )}
          </OrderSummary>
        </section>
      </>
    )
  );
};

export default OrderPage;
