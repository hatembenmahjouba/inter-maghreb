import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { listUsers } from '../../../redux/user/userActions';
import Spiner from '../../../components/Spiner';
import UserAdminSidebar from '../../../components/User/UserAdminSidebar/UserAdminSidebar';
import UsersList from '../../../components/User/UsersList';
import useQuery from '../../../utils/useQuery';
import Pagination from '../../../components/Pagination';
import Search from '../../../components/Search/Search';
import Message from '../../../components/Message';

const UserListPage = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users, count, page, pages } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  let search = query.get('search') || '';
  let pageNumber = Number(query.get('page')) || 1;

  useEffect(() => {
    dispatch(listUsers(pageNumber, search));
  }, [dispatch, successDelete, search, pageNumber]);
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserAdminSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>Users</h2>
        </div>
        <div className='section-user__container flex flex-ai-c flex-dc'>
          <Search name='users (Email)' />
          <Spiner isLoading={loading}>
            {error ? (
              <Message className='error'>{error}</Message>
            ) : users && users.length > 0 ? (
              <>
                <UsersList users={users} count={count} />
                <Pagination page={page} pages={pages} />
              </>
            ) : (
              <Message className='error'>No Users</Message>
            )}
          </Spiner>
        </div>
      </section>
    </>
  );
};

export default UserListPage;
