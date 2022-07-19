import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReactComponent as Remove } from '../../assets/img/SVG/bin.svg';
import { ReactComponent as Edit } from '../../assets/img/SVG/pencil.svg';
import { deleteMyReview } from '../../redux/review/reviewActions';

const ReviewsListMy = ({ reviews }) => {
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteMyReview(id));
    }
  };

  return (
    <table className='data-table'>
      <thead className='data-table__header'>
        <tr>
          <th>IMAGE</th>
          <th>PRODUCT</th>
          <th>RATING</th>
          <th>DATE</th>
          <th></th>
        </tr>
      </thead>
      <tbody className='data-table__body'>
        {reviews &&
          reviews.length > 0 &&
          reviews.map((review) => (
            <tr key={review._id}>
              {!review.product ||
              !review.product.image ||
              !review.product.name ? (
                <>
                  <td>No image</td>
                  <td>No Name</td>
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
                      to={`/products/${review.product.slug}`}
                      className='btn-text'
                    >
                      {review.product.name}
                    </Link>
                  </td>
                </>
              )}

              <td>{review.rating}</td>
              <td>{review.createdAt.substring(0, 10)}</td>
              <td>
                <Link to={`/myreviews/${review._id}`}>
                  <Edit className='data-table__icon'>Edit</Edit>
                </Link>
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
export default ReviewsListMy;
