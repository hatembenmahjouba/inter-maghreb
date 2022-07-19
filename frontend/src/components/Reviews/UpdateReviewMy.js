import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Spiner from '../Spiner';
import { REVIEW_UPDATE_MY_RESET } from '../../redux/review/reviewTypes';
import {
  updateMyReview,
  getReviewDetails,
} from '../../redux/review/reviewActions';
import RatingReview from '../Rating/RatingReview';
import Message from '../Message';

const UpdateReviewMy = () => {
  const history = useHistory();
  const params = useParams();
  const reviewId = params.id;
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const reviewDetails = useSelector((state) => state.reviewDetails);
  const { loading, error, review } = reviewDetails;

  const reviewUpdateMy = useSelector((state) => state.reviewUpdateMy);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = reviewUpdateMy;

  useEffect(() => {
    if (!review || !review.rating || review.id !== reviewId || successUpdate) {
      dispatch(getReviewDetails(reviewId));
    } else {
      setComment(review.review);
      setRating(review.rating);
    }
  }, [dispatch, reviewId, review, successUpdate, history]);

  const ratingValueHandler = (e) => {
    setRating(e.target.value);
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateMyReview(reviewId, { rating, review: comment }));
  };

  return (
    <>
      {error ? (
        <Message className='error'>{error}</Message>
      ) : (
        <div className='flex flex-dc flex-ai-c'>
          {successUpdate && (
            <Message
              className='success'
              reset={REVIEW_UPDATE_MY_RESET}
              goBack
              open
            >
              Success Update
            </Message>
          )}
          <Spiner isLoading={loadingUpdate} />
        </div>
      )}{' '}
      {loading ? (
        <Spiner />
      ) : errorUpdate ? (
        <Message className='error'>{errorUpdate}</Message>
      ) : (
        <form className='form' onSubmit={SubmitHandler}>
          <div className='form__group'>
            <RatingReview
              ratingValueHandler={ratingValueHandler}
              rating={rating}
            />
          </div>
          <div className='form__group'>
            <textarea
              className='form__textarea'
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
      )}
    </>
  );
};
export default UpdateReviewMy;
