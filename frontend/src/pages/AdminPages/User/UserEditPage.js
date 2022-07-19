import React from 'react';
import UserEdit from '../../../components/User/UserEdit';
import UserAdminSidebar from '../../../components/User/UserAdminSidebar/UserAdminSidebar';

const UserEditPage = () => {
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserAdminSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>Edit User</h2>
        </div>
        <div className='section-user__container'>
          <UserEdit />
        </div>
      </section>
    </>
  );
};

export default UserEditPage;
