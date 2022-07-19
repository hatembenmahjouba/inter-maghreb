import React from 'react';

import UserSidebar from '../../components/User/UserSidebar/UserSidebar';
import UserUpdatePassword from '../../components/User/UserUpdatePassword';

const UpdatePasswordPage = () => {
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>Set Password</h2>
        </div>
        <div className='section-user__container'>
          <UserUpdatePassword />
        </div>
      </section>
    </>
  );
};

export default UpdatePasswordPage;
