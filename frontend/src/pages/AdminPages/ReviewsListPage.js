import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ListReviews } from '../../redux/review/reviewActions';

import ReviewsList from '../../components/Reviews/ReviewList';
import UserAdminSidebar from '../../components/User/UserAdminSidebar/UserAdminSidebar';
import Message from '../../components/Message';
import Pagination from '../../components/Pagination';
import Spiner from '../../components/Spiner';

import useQuery from '../../utils/useQuery';

const ReviewsListPage = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const reviewList = useSelector((state) => state.reviewList);
  const { loading, error, reviews, count, page, pages } = reviewList;
  const reviewDelete = useSelector((state) => state.reviewDelete);
  const { success: successDelete } = reviewDelete;
  let pageNumber = Number(query.get('page')) || 1;

  useEffect(() => {
    dispatch(ListReviews(pageNumber));
  }, [dispatch, successDelete, pageNumber]);
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserAdminSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>Reviews</h2>
        </div>
        <div className='section-user__container flex flex-ai-c flex-dc'>
          <Spiner isLoading={loading}>
            {error ? (
              <Message className='error'>{error}</Message>
            ) : reviews && reviews.length > 0 ? (
              <>
                <ReviewsList reviews={reviews} count={count} />
                <Pagination page={page} pages={pages} />
              </>
            ) : (
              <Message className='error'>No Reviews</Message>
            )}
          </Spiner>
        </div>
      </section>
    </>
  );
};

export default ReviewsListPage;
