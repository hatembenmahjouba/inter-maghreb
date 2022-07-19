import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../../Rating/Rating';
import { ReactComponent as Remove } from '../../../assets/img/SVG/bin.svg';
import { ReactComponent as Edit } from '../../../assets/img/SVG/pencil.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteMyReview,
  deleteReview,
} from '../../../redux/review/reviewActions';

const ReviewCard = ({ review }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const deleteMyHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteMyReview(id));
    }
  };
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteReview(id));
    }
  };

  return (
    <>
      {review.user && review.user.photo && review.user.name && (
        <figure className='review-card flex flex-dc'>
          <figcaption className='review-card__details flex flex-dc'>
            <div className='review-card__user flex flex-ai-c'>
              <img
                className='review-card__user-photo'
                src={review.user.photo}
                alt={review.user.name}
              />
              <div className='review-card__user-box flex flex-dc'>
                <p className='review-card__user-name'>{review.user.name}</p>
                <p className='review-card__user-date'>
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>
              {userInfo &&
                userInfo.name &&
                (userInfo._id === review.user._id ? (
                  <div className='review-card__user-icons'>
                    <div onClick={() => deleteMyHandler(review._id)}>
                      <Remove className='data-table__icon' />
                    </div>
                    <Link to={`/myreviews/${review._id}`}>
                      <Edit className='data-table__icon'>Edit</Edit>
                    </Link>
                  </div>
                ) : userInfo.role === 'admin' ? (
                  <div onClick={() => deleteHandler(review._id)}>
                    <Remove className='data-table__icon' />
                  </div>
                ) : null)}
            </div>
            <div className='review-card__rating'>
              <Rating value={review.rating} />
            </div>
          </figcaption>
          <blockquote className='review-card__text'>
            <p className='paragraph'>{review.review}</p>
          </blockquote>
        </figure>
      )}
    </>
  );
};

export default ReviewCard;
