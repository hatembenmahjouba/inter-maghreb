import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getWishlist } from '../../redux/user/userActions';

import Products from '../../components/Products/Products';
import UserSidebar from '../../components/User/UserSidebar/UserSidebar';
import Message from '../../components/Message';
import Spiner from '../../components/Spiner';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList);
  const { loading, error, wishlist } = wishList;
  const removeWishList = useSelector((state) => state.removeWishList);
  const { success } = removeWishList;

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch, success]);
  return (
    <>
      <section className='section-user'>
        <div className='section-user__sidebar'>
          <UserSidebar />
        </div>
        <div className='section-user__heading u-margin-bottom-big flex flex-ai-c flex-dc'>
          <h2 className='heading-2'>My Wishlist</h2>
        </div>
        <div className='section-user__container'>
          <Spiner isLoading={loading}>
            {error ? (
              <Message className='error'>{error}</Message>
            ) : wishlist && wishlist.length > 0 ? (
              <Products products={wishlist} />
            ) : (
              <Message className='error'>No Wishlist</Message>
            )}
          </Spiner>
        </div>
      </section>
    </>
  );
};

export default WishlistPage;
