import React from 'react';

import CreateProduct from '../../../components/Products/CreateProduct';
import UserAdminSidebar from '../../../components/User/UserAdminSidebar/UserAdminSidebar';

const CreateProductPage = () => {
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserAdminSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>Create Product</h2>
        </div>
        <div className='section-user__container'>
          <CreateProduct />
        </div>
      </section>
    </>
  );
};

export default CreateProductPage;
