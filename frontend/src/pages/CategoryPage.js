import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategory } from '../redux/category/categoryActions';

import Products from '../components/Products/Products';
import Message from '../components/Message';
import Pagination from '../components/Pagination';
import Spiner from '../components/Spiner';

import useQuery from '../utils/useQuery';

const CategoryPage = () => {
  const params = useParams();
  const query = useQuery();

  const { slug } = params;
  const dispatch = useDispatch();

  let search = query.get('search') || '';
  let pageNumber = Number(query.get('page')) || 1;

  const categoryProducts = useSelector((state) => state.categoryProducts);

  const { loading, error, category, products, pages, page } = categoryProducts;

  useEffect(() => {
    dispatch(getProductsByCategory(slug, search, pageNumber));
  }, [dispatch, slug, pageNumber, search]);

  return (
    <>
      <section className='section-container'>
        <Spiner isLoading={loading}>
          <div className='u-margin-bottom-big flex flex-ai-c flex-dc'>
            <h2 className='heading-2'>{category && category.name}</h2>
          </div>
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

export default CategoryPage;
