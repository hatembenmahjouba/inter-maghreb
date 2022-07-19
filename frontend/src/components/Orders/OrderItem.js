import React from 'react';
import { Link } from 'react-router-dom';

const OrderItem = ({
  orderItem: { name, image, qty, price, product, slug },
}) => (
  <div className='order-item flex flex-ai-c'>
    <img className='order-item__image' src={image} alt={name} />

    <Link to={`/products/${slug}`}>
      <button className='btn-text'>{name}</button>
    </Link>

    <p className='paragraph'>
      {qty} x {price}dt = {qty * price}
    </p>
  </div>
);

export default OrderItem;
