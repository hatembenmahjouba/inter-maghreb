import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../../redux/product/productActions';

import ProductsList from '../../../components/Products/ProductsList';
import Search from '../../../components/Search/Search';
import UserAdminSidebar from '../../../components/User/UserAdminSidebar/UserAdminSidebar';
import Message from '../../../components/Message';
import Pagination from '../../../components/Pagination';
import Spiner from '../../../components/Spiner';

import useQuery from '../../../utils/useQuery';

const ProductsListPage = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  let search = query.get('search') || '';
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page, count } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;
  let pageNumber = Number(query.get('page')) || 1;

  useEffect(() => {
    dispatch(listProducts(search, pageNumber));
  }, [dispatch, successDelete, pageNumber, search]);
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserAdminSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>Products</h2>
        </div>
        <div className='section-user__container flex flex-ai-c flex-dc'>
          <Search name='products' />
          <Spiner isLoading={loading}>
            {error ? (
              <Message className='error'>{error}</Message>
            ) : products && products.length > 0 ? (
              <>
                <ProductsList products={products} count={count} />
                <Pagination page={page} pages={pages} />
              </>
            ) : (
              <Message className='error'>NO PRODUCTS FOUND</Message>
            )}
          </Spiner>
        </div>
      </section>
    </>
  );
};

export default ProductsListPage;
