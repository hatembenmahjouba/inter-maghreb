import React from 'react';

import UpdateProduct from '../../../components/Products/UpdateProduct';
import UserAdminSidebar from '../../../components/User/UserAdminSidebar/UserAdminSidebar';

const ProductUpdatePage = () => {
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserAdminSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>Update Product</h2>
        </div>
        <div className='section-user__container'>
          <UpdateProduct />
        </div>
      </section>
    </>
  );
};

export default ProductUpdatePage;
