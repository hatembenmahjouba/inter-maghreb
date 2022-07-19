import React from 'react';
import { ReactComponent as StarFull } from '../../assets/img/SVG/star-full.svg';
import { ReactComponent as StarEmpty } from '../../assets/img/SVG/star-empty.svg';
import { ReactComponent as StarHalf } from '../../assets/img/SVG/star-half.svg';

const Rating = ({ value, text }) => {
  return (
    <div className='rating flex flex-ai-c'>
      <span>
        {value >= 1 ? (
          <StarFull className='rating__icon' />
        ) : value >= 0.5 ? (
          <StarHalf className='rating__icon' />
        ) : (
          <StarEmpty className='rating__icon' />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <StarFull className='rating__icon' />
        ) : value >= 1.5 ? (
          <StarHalf className='rating__icon' />
        ) : (
          <StarEmpty className='rating__icon' />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <StarFull className='rating__icon' />
        ) : value >= 2.5 ? (
          <StarHalf className='rating__icon' />
        ) : (
          <StarEmpty className='rating__icon' />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <StarFull className='rating__icon' />
        ) : value >= 3.5 ? (
          <StarHalf className='rating__icon' />
        ) : (
          <StarEmpty className='rating__icon' />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <StarFull className='rating__icon' />
        ) : value >= 4.5 ? (
          <StarHalf className='rating__icon' />
        ) : (
          <StarEmpty className='rating__icon' />
        )}
      </span>
      <p className='rating__value'>{value && value}</p>
      <p className='rating__reviews'>{text && text}</p>
    </div>
  );
};

export default Rating;
