import React, { useEffect } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cart/cartActions';

import Checkout from '../components/Checkout/Checkout';
import CheckoutOrder from '../components/Checkout/CheckoutOrder';

import useQuery from '../utils/useQuery';

const CheckoutPage = () => {
  const params = useParams();
  const history = useHistory();
  const query = useQuery();
  const productSlug = params.slug;
  const qty = Number(query.get('qty'));

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productSlug) {
      dispatch(addToCart(productSlug, qty));
    }
  }, [dispatch, productSlug, qty]);

  const checkoutHandler = () => {
    history.push('/shipping');
  };

  return (
    <>
      <section className='section-container flex flex-dc flex-ai-c'>
        <div className='u-margin-bottom-big flex flex-dc flex-ai-c'>
          <h2 className='heading-2'>Shopping Cart</h2>
        </div>
        <Checkout cartItems={cartItems} />
        <CheckoutOrder
          checkoutHandler={checkoutHandler}
          cartItems={cartItems}
        />
      </section>
    </>
  );
};
export default CheckoutPage;
