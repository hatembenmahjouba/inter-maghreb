import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { listOrders } from '../../redux/order/orderActions';

import OrderList from '../../components/Orders/OrderList';
import UserAdminSidebar from '../../components/User/UserAdminSidebar/UserAdminSidebar';
import Message from '../../components/Message';
import Pagination from '../../components/Pagination';
import Spiner from '../../components/Spiner';

import useQuery from '../../utils/useQuery';
import Search from '../../components/Search/Search';

const OrderListPage = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  let search = query.get('search') || '';
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, pages, page, count } = orderList;
  let pageNumber = Number(query.get('page')) || 1;

  useEffect(() => {
    dispatch(listOrders(search, pageNumber));
  }, [dispatch, pageNumber, search]);
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserAdminSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>Orders</h2>
        </div>
        <div className='section-user__container flex flex-ai-c flex-dc'>
          <Search name='order number' />
          <Spiner isLoading={loading}>
            {error ? (
              <Message className='error'>{error}</Message>
            ) : orders && orders.length > 0 ? (
              <>
                <OrderList orders={orders} count={count} />
                <Pagination page={page} pages={pages} />
              </>
            ) : (
              <Message className='error'>No Orders</Message>
            )}
          </Spiner>
        </div>
      </section>
    </>
  );
};

export default OrderListPage;
