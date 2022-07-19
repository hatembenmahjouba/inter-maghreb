import React from 'react';

import AddCategory from '../../../components/Categories/AddCategory';
import CategoryList from '../../../components/Categories/CategoryList';
import UserAdminSidebar from '../../../components/User/UserAdminSidebar/UserAdminSidebar';

const CategoryPage = () => {
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserAdminSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>Category</h2>
        </div>
        <div className='section-user__container '>
          <AddCategory />
          <CategoryList />
        </div>
      </section>
    </>
  );
};
export default CategoryPage;
