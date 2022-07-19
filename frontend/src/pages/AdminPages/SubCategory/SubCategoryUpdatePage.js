import React from 'react';

import SubCategoryUpdate from '../../../components/SubCategories/SubUpdateCategory';
import UserAdminSidebar from '../../../components/User/UserAdminSidebar/UserAdminSidebar';

const SubCategoryUpdatePage = () => {
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserAdminSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>Update Sub Category</h2>
        </div>
        <div className='section-user__container '>
          <SubCategoryUpdate />
        </div>
      </section>
    </>
  );
};

export default SubCategoryUpdatePage;
