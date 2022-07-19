import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../redux/order/orderActions';
import { USER_DETAILS_RESET } from '../redux/user/userTypes';
import { ORDER_CREATE_RESET } from '../redux/order/orderTypes';

import PlaceOrder from '../components/Orders/PlaceOrder';
import OrderSummary from '../components/Orders/OrderSummary';
import Message from '../components/Message';

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.cart);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_DETAILS_RESET });
    }
    if (error === 'Count in stock does not exist') {
      history.push('/cart');
    }
  }, [success, error, history, dispatch]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <>
      <section className='section-content flex flex-jc-c'>
        <h2 className='heading-2'>Place Order</h2>
      </section>
      <section className='section-order'>
        <PlaceOrder cart={cart} />
      </section>
      <section className='section-ordersummary'>
        <OrderSummary order={cart}>
          {error && !success && <Message className='error'>{error}</Message>}
          {success && order && order._id && (
            <Message
              className='success'
              reset={ORDER_CREATE_RESET}
              linkTo={`/order/${order._id}`}
              open
            >
              Order Create
            </Message>
          )}
          <button
            className='btn'
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
        </OrderSummary>
      </section>
    </>
  );
};

export default PlaceOrderPage;
