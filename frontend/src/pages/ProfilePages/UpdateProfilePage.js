import React from 'react';

import UserSidebar from '../../components/User/UserSidebar/UserSidebar';
import UserProfileUpdate from '../../components/User/UserProfileUpdate';

const UpdateProfilePage = () => {
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>Update User Profile</h2>
        </div>
        <div className='section-user__container'>
          <UserProfileUpdate />
        </div>
      </section>
    </>
  );
};

export default UpdateProfilePage;
