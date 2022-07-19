import React, { useEffect } from 'react';
import Products from '../components/Products/Products';
import { useDispatch, useSelector } from 'react-redux';
import Spiner from '../components/Spiner';
import { getSubProductsCategory } from '../redux/category/categoryActions';
import { useParams } from 'react-router-dom';
import useQuery from '../utils/useQuery';
import Pagination from '../components/Pagination';
import Message from '../components/Message';

const SubCategoryPage = () => {
  const params = useParams();
  const query = useQuery();
  const { slugCat, slugSub } = params;

  let pageNumber = Number(query.get('page')) || 1;

  const dispatch = useDispatch();

  const categorySubProducts = useSelector((state) => state.categorySubProducts);

  const { loading, error, subCategory, products, pages, page } =
    categorySubProducts;

  useEffect(() => {
    dispatch(getSubProductsCategory(slugCat, slugSub, pageNumber));
  }, [dispatch, slugSub, slugCat, pageNumber]);

  return (
    <section className='section-container'>
      <div className='u-margin-bottom-big flex flex-ai-c flex-dc'>
        <h2 className='heading-2'>
          {subCategory && subCategory.name && subCategory.name}
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
  );
};

export default SubCategoryPage;
