import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RatingReview from '../Rating/RatingReview';
import { createReviewProduct } from '../../redux/product/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../redux/product/productTypes';
import Spiner from '../Spiner';
import Message from '../Message';

const AddReview = ({ productId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { loading, error, success } = productCreateReview;

  useEffect(() => {
    if (success) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [success, dispatch]);

  const ratingValueHandler = (e) => {
    setRating(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReviewProduct({
        product: productId,
        rating,
        review: comment,
      })
    );
  };

  return (
    <div className='add-review'>
      <h2 className='heading-2 u-margin-bottom-medium'>Add Review</h2>
      {error && <Message className='error'>{error}</Message>}{' '}
      <Spiner isLoading={loading} />
      <form className='form' onSubmit={onSubmitHandler}>
        <div className='form__group flex flex-ai-c'>
          <label className='form__label' htmlFor='rating'>
            Rating:
          </label>
          <RatingReview
            id='rating'
            ratingValueHandler={ratingValueHandler}
            rating={rating}
          />
        </div>

        <div className='form__group flex'>
          <label className='form__label' htmlFor='comment'>
            Comment:
          </label>
          <textarea
            className='form__textarea'
            row='5'
            id='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className='form__group'>
          <button type='submit' className='btn'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
