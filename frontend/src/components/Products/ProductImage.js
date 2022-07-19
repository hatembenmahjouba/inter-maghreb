import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getProductDetails } from '../../redux/product/productActions';
import Message from '../Message';
import Spiner from '../Spiner';
import Modal from '../UI/Modal';

const ProductImage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { slug } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  let back = (e) => {
    e.stopPropagation();
    history.goBack();
  };
  useEffect(() => {
    if (!product || product.slug !== slug) {
      dispatch(getProductDetails(slug));
    }
  }, [dispatch, slug, product]);

  return (
    <Modal onClose={back} open>
      <div className='product-image'>
        <Spiner isLoading={loading}>
          {error ? (
            <Message className='error'>{error}</Message>
          ) : (
            <img
              className='product-image__img'
              src={product.image}
              alt={product.name}
            />
          )}
        </Spiner>
      </div>
    </Modal>
  );
};

export default ProductImage;
