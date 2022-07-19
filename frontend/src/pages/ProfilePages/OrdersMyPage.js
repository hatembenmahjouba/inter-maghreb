import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ListMyOrders } from '../../redux/order/orderActions';

import OrderListMy from '../../components/Orders/OrderListMy';
import UserSidebar from '../../components/User/UserSidebar/UserSidebar';
import Message from '../../components/Message';
import Spiner from '../../components/Spiner';

const OrdersMyPage = () => {
  const dispatch = useDispatch();
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  useEffect(() => {
    dispatch(ListMyOrders());
  }, [dispatch]);
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>My Orders</h2>
        </div>
        <div className='section-user__container  flex flex-ai-c flex-dc'>
          <Spiner isLoading={loading}>
            {error ? (
              <Message className='error'>{error}</Message>
            ) : orders && orders.length > 0 ? (
              <OrderListMy orders={orders} />
            ) : (
              <Message className='error'>No Orders</Message>
            )}
          </Spiner>
        </div>
      </section>
    </>
  );
};

export default OrdersMyPage;
