import React from 'react';
import ReviewCard from './ReviewCard/ReviewCard';

const Reviews = ({ reviews }) => {
  return (
    <>
      {reviews && reviews.length >= 0 && (
        <div className='reviews'>
          <div className='reviews__heading'>
            <h3 className='heading-3'>Reviews</h3>
          </div>

          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      )}
    </>
  );
};
export default Reviews;
