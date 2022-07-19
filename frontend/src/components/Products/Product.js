import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';

import Rating from '../Rating/Rating';

import AddReview from '../Reviews/AddReview';
import Modal from '../UI/Modal';
import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import { ReactComponent as Star } from '../../assets/img/SVG/star-empty.svg';

const Product = ({ product }) => {
  const params = useParams();
  const history = useHistory();
  let location = useLocation();
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);

  const modalHandler = () => {
    setOpen(!open);
  };
  const addToCartHandler = () => {
    history.push(`/cart/${params.slug}?qty=${qty}`);
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { success: successReviewCreated } = productCreateReview;

  useEffect(() => {
    if (successReviewCreated) {
      setOpen(false);
    }
  }, [successReviewCreated, history]);

  return (
    <div className='product'>
      <div className='product__image-box'>
        <Link
          to={{
            pathname: `/products/img/${product.slug}`,
            state: { background: location },
          }}
        >
          <img
            className='product__image'
            src={product.image}
            alt={product.name}
          />
        </Link>
      </div>
      <div className='product__detail'>
        <h3 className='heading-3'>{product.name}</h3>
        <h4 className='heading-4'>Prix: {product.price} dt</h4>
        <Rating
          value={product.rating}
          text={`(${product.numReviews} reviews)`}
        />
        {userInfo &&
          userInfo.name &&
          userInfo.role === 'user' &&
          !product.reviews.find(
            (ele) => ele.user._id.toString() === userInfo._id.toString()
          ) && (
            <>
              <p className='paragraph'>
                <span>Add Review: </span>
                <button className='btn-add' onClick={modalHandler}>
                  <Star className='btn-add__icon' />
                </button>
              </p>
              <Modal onClose={modalHandler} open={open}>
                <AddReview productId={product._id} />
              </Modal>
            </>
          )}
        <p className='paragraph'>
          <span>Description:</span> {product.description}
        </p>
      </div>
      <div className='product__card'>
        <Card>
          <p className='card__paragraph'>
            <span className='card__title'>Price:</span>
            {(product.price * qty).toFixed(2)} dt
          </p>
          <p className='card__paragraph'>
            <span className='card__title'>Status:</span>
            {product.countInStock > 0 ? (
              <span className='status-green'>In Stock</span>
            ) : (
              <span className='status-red'>Out Stock</span>
            )}
          </p>
          <p className='card__paragraph'>
            <span className='card__title'>Quantity:</span>
            <span
              className='card__arrow card__arrow--left'
              onClick={() => (qty > 1 ? setQty(qty - 1) : null)}
            >
              &#10094;
            </span>
            {qty}
            <span
              className='card__arrow card__arrow--right'
              onClick={() =>
                qty < product.countInStock ? setQty(qty + 1) : null
              }
            >
              &#10095;
            </span>
          </p>

          <button
            className='btn'
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
          >
            Add to cart
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Product;
