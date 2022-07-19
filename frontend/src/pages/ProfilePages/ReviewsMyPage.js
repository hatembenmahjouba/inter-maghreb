import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ListMyReviews } from '../../redux/review/reviewActions';
import { REVIEW_DELETE_MY_RESET } from '../../redux/review/reviewTypes';

import ReviewListMy from '../../components/Reviews/ReviewListMy';
import UserSidebar from '../../components/User/UserSidebar/UserSidebar';
import Message from '../../components/Message';
import Spiner from '../../components/Spiner';

const ReviewsMyPage = () => {
  const dispatch = useDispatch();
  const reviewListMy = useSelector((state) => state.reviewListMy);
  const { loading, error, reviews } = reviewListMy;
  const reviewDeleteMy = useSelector((state) => state.reviewDeleteMy);
  const { success: successDelete } = reviewDeleteMy;

  useEffect(() => {
    dispatch(ListMyReviews());
    if (successDelete) {
      dispatch({ type: REVIEW_DELETE_MY_RESET });
    }
  }, [dispatch, successDelete]);
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>My Reviews</h2>
        </div>
        <div className='section-user__container flex flex-ai-c flex-dc'>
          <Spiner isLoading={loading}>
            {error ? (
              <Message className='error'>{error}</Message>
            ) : reviews && reviews.length > 0 ? (
              <ReviewListMy reviews={reviews} />
            ) : (
              <Message className='error'>No Reviews</Message>
            )}
          </Spiner>
        </div>
      </section>
    </>
  );
};

export default ReviewsMyPage;
