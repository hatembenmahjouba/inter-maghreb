import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listNewProducts,
  listTopProducts,
} from '../redux/product/productActions';

import HomeCategories from '../components/HomeCategories/HomeCategories';
import ProductsSlider from '../components/Products/ProductsSlider';
import HomeFeatures from '../components/HomeFeatures';
import Message from '../components/Message';
import Spiner from '../components/Spiner';

const HomePage = () => {
  const dispatch = useDispatch();

  const productTopList = useSelector((state) => state.productTopList);
  const {
    loading: topLoading,
    error: topError,
    products: topProducts,
  } = productTopList;
  const productNewList = useSelector((state) => state.productNewList);
  const {
    loading: newLoading,
    error: newError,
    products: newProducts,
  } = productNewList;

  useEffect(() => {
    dispatch(listTopProducts());
    dispatch(listNewProducts());
  }, [dispatch]);
  return (
    <>
      <section className='section-container flex flex-ai-c flex-dc'>
        <h2 className='heading-2 u-margin-bottom-big'>Top Products</h2>
        <Spiner isLoading={topLoading}>
          {topError ? (
            <Message className='error'>{topError}</Message>
          ) : topProducts && topProducts.length > 0 ? (
            <ProductsSlider sliderId='top' products={topProducts} />
          ) : (
            <Message className='error'>No Products</Message>
          )}
        </Spiner>
      </section>
      <section className='section-container flex flex-ai-c flex-dc'>
        <h2 className='heading-2 u-margin-bottom-big'>New Products</h2>
        <Spiner isLoading={newLoading}>
          {newError ? (
            <Message className='error'>{newError}</Message>
          ) : newProducts && newProducts.length > 0 ? (
            <ProductsSlider sliderId='new' products={newProducts} />
          ) : (
            <Message className='error'>No Products</Message>
          )}
        </Spiner>
      </section>
      <section className='section-container'>
        <HomeCategories />
      </section>
      <section className='section-features'>
        <HomeFeatures />
      </section>
    </>
  );
};

export default HomePage;
