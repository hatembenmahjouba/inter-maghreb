import React from 'react';

import AddSubCategory from '../../../components/SubCategories/AddSubCategory';
import SubCategoryList from '../../../components/SubCategories/SubCategoryList';
import UserAdminSidebar from '../../../components/User/UserAdminSidebar/UserAdminSidebar';

const SubCategoryPage = () => {
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserAdminSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>Sub Category</h2>
        </div>
        <div className='section-user__container '>
          <AddSubCategory />
          <SubCategoryList />
        </div>
      </section>
    </>
  );
};
export default SubCategoryPage;
