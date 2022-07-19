import React from 'react';

import CategoryUpdate from '../../../components/Categories/UpdateCategory';
import UserAdminSidebar from '../../../components/User/UserAdminSidebar/UserAdminSidebar';

const CategoryUpdatePage = () => {
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserAdminSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>Update Category</h2>
        </div>
        <div className='section-user__container'>
          <CategoryUpdate />
        </div>
      </section>
    </>
  );
};

export default CategoryUpdatePage;
