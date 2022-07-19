import React from 'react';

import ProductCard from './ProductCard';
import Slider from '../Slider';

const ProductsSlider = ({ products, sliderId }) => {
  return (
    <Slider sliderId={sliderId}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Slider>
  );
};
export default ProductsSlider;
