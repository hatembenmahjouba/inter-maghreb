import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Products/Product';
import { getProductDetails } from '../redux/product/productActions';
import Spiner from '../components/Spiner';
import Reviews from '../components/Reviews/Reviews';
import { useParams } from 'react-router-dom';
import {
  REVIEW_DELETE_MY_RESET,
  REVIEW_DELETE_RESET,
} from '../redux/review/reviewTypes';
import Message from '../components/Message';

const ProductPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const reviewDeleteMy = useSelector((state) => state.reviewDeleteMy);
  const { success: successDeleteMy } = reviewDeleteMy;
  const reviewUpdateMy = useSelector((state) => state.reviewUpdateMy);
  const { success: successUpdateMy } = reviewUpdateMy;
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { success: successCreateReview } = productCreateReview;
  const reviewDelete = useSelector((state) => state.reviewDelete);
  const { success: successDelete } = reviewDelete;

  useEffect(() => {
    dispatch(getProductDetails(slug));
    if (successDeleteMy) {
      dispatch({ type: REVIEW_DELETE_MY_RESET });
    }
    if (successDelete) {
      dispatch({ type: REVIEW_DELETE_RESET });
    }
  }, [
    dispatch,
    slug,
    successDeleteMy,
    successUpdateMy,
    successCreateReview,
    successDelete,
  ]);

  return (
    <>
      {loading ? (
        <section className='section-container'>
          <Spiner isLoading={loading} />
        </section>
      ) : error ? (
        <section className='section-container'>
          <Message className='error'>{error}</Message>
        </section>
      ) : (
        <>
          <section className='section-container'>
            <Product product={product} />
          </section>
          {product.reviews && product.reviews.length > 0 ? (
            <section className='section-container'>
              <Reviews reviews={product.reviews} />
            </section>
          ) : null}
        </>
      )}
    </>
  );
};

export default ProductPage;
