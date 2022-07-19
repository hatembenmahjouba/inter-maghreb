import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, clearFromCart } from '../../redux/cart/cartActions';

import { ReactComponent as Remove } from '../../assets/img/SVG/bin.svg';

const CheckoutItem = ({
  cartItem: { product, slug, name, image, price, qty, countInStock },
}) => {
  const dispatch = useDispatch();
  const clearFromCartHandler = (slug) => {
    dispatch(clearFromCart(slug));
  };
  return (
    <div className='checkout__item'>
      <div className='checkout__image-box'>
        <img className='checkout__image' src={image} alt={name} />
        <span className='checkout__name'>{name}</span>
      </div>
      <span className='checkout__price'>{price}dt</span>
      <div className='flex'>
        <select
          className='form__select'
          value={qty}
          onChange={(e) => dispatch(addToCart(slug, Number(e.target.value)))}
        >
          {[...Array(countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
      </div>
      <div onClick={() => clearFromCartHandler(slug)}>
        <Remove className='checkout__remove' />
      </div>
    </div>
  );
};
export default CheckoutItem;
