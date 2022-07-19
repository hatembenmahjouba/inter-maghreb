import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { ReactComponent as Remove } from '../../assets/img/SVG/bin.svg';
import { deleteReview } from '../../redux/review/reviewActions';

const ReviewsList = ({ reviews, count }) => {
  const dispatch = useDispatch();
  const deleteHandler = (reviewId) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteReview(reviewId));
    }
  };
  return (
    <table className='data-table'>
      <thead className='data-table__header'>
        <tr>
          <th>IMAGE</th>
          <th>PRODUCT</th>
          <th>USER</th>
          <th>RATING</th>
          <th>DATE</th>
          <th>{count}</th>
        </tr>
      </thead>
      <tbody className='data-table__body'>
        {reviews.map((review) => (
          <tr key={review._id}>
            {!review.product ||
            !review.product.image ||
            !review.product.name ? (
              <>
                <td>No image</td>
                <td>No Product Name</td>
              </>
            ) : (
              <>
                <td>
                  <img
                    className='data-table__img'
                    src={review.product.image}
                    alt={review.product.name}
                  />
                </td>
                <td>
                  <Link
                    className='btn-text'
                    to={`/products/${review.product.slug}`}
                  >
                    {review.product.name}
                  </Link>
                </td>
              </>
            )}
            {!review.user || !review.user.name ? (
              <td>No User</td>
            ) : (
              <td>{review.user.name}</td>
            )}

            <td>{review.rating}</td>
            <td>{review.createdAt.substring(0, 10)}</td>

            <td>
              <div onClick={() => deleteHandler(review._id)}>
                <Remove className='data-table__icon' />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ReviewsList;
