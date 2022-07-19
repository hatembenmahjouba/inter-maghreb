import React, { useState } from 'react';
import { ReactComponent as StarFull } from '../../assets/img/SVG/star-full.svg';
import Message from '../Message';

const RatingReview = ({ ratingValueHandler, rating }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className='rating-review flex flex-ai-c flex-jc-c'>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index} className='rating-review__label'>
            <input
              className='rating-review__input'
              type='radio'
              value={ratingValue}
              onClick={ratingValueHandler}
            />
            <StarFull
              className={`rating-review__star ${
                ratingValue <= hover
                  ? 'rating-review__hover'
                  : ratingValue <= rating
                  ? 'rating-review__effect'
                  : ' '
              }`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
      {rating > 4 ? (
        <Message className='status-green'>Excellent</Message>
      ) : rating > 3 ? (
        <Message className='status-green'>Good</Message>
      ) : rating > 1 ? (
        <Message className='status-orange'>Not Bad</Message>
      ) : (
        <Message className='status-red'> Bad</Message>
      )}
    </div>
  );
};

export default RatingReview;
