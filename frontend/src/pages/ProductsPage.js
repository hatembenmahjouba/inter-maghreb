import React, { useEffect } from 'react';
import Products from '../components/Products/Products';
import { useDispatch, useSelector } from 'react-redux';
import Spiner from '../components/Spiner';

import { listProducts } from '../redux/product/productActions';
import Pagination from '../components/Pagination';
import useQuery from '../utils/useQuery';
import Message from '../components/Message';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const query = useQuery();

  let search = query.get('search') || '';
  let pageNumber = Number(query.get('page')) || 1;

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(search, pageNumber));
  }, [dispatch, search, pageNumber]);

  return (
    <>
      <section className='section-container'>
        <div className='u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>
            {search ? `results for "${search}"` : 'All Products'}
          </h2>
        </div>
        <Spiner isLoading={loading}>
          {error ? (
            <Message className='error'>{error}</Message>
          ) : products && products.length > 0 ? (
            <>
              <Products products={products} />
              <Pagination pages={pages} page={page} />
            </>
          ) : (
            <Message className='error'>No Products</Message>
          )}
        </Spiner>
      </section>
    </>
  );
};

export default ProductsPage;
