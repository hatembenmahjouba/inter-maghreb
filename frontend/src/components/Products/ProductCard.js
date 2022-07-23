import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import { ReactComponent as IconHeart } from '../../assets/img/SVG/heart.svg';
import { ReactComponent as IconHeartOutlined } from '../../assets/img/SVG/heart-outlined.svg';

import { useDispatch, useSelector } from 'react-redux';
import { addWishlist, removeWishlist } from '../../redux/user/userActions';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleWishList = (e) => {
    e.preventDefault();
    dispatch(addWishlist(product._id));
  };

  const handleDeleteWishList = (e) => {
    e.preventDefault();
    dispatch(removeWishlist(product._id));
  };
  return (
    <div className='product-card'>
      {userInfo &&
        userInfo.name &&
        userInfo.wishlist &&
        (!userInfo.wishlist.find(
          (ele) => ele.toString() === product._id.toString()
        ) ? (
          <IconHeartOutlined
            className='product-card__icon'
            onClick={handleWishList}
          />
        ) : (
          <IconHeart
            className='product-card__icon'
            onClick={handleDeleteWishList}
          />
        ))}
      <Link
        className='product-card__image-box'
        to={`/products/${product.slug}`}
      >
        <img
          className='product-card__image'
          src={product.image}
          alt={`product ${product.slug}`}
        />
      </Link>
      <div className='product-card__body'>
        <h3 className='heading-4'>{product.name}</h3>
        <Rating value={product.rating} text={`(${product.numReviews})`} />
        <p className='product-card__price'>{product.price} dt</p>
      </div>
    </div>
  );
};

export default ProductCard;
