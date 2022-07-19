import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/user/userActions';
import { ReactComponent as Heart } from '../../../assets/img/SVG/heart.svg';
import { ReactComponent as IconOpen } from '../../../assets/img/SVG/arrow_drop_down_black_24dp.svg';
import { NavLink } from 'react-router-dom';

const UserNav = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dropDownToggleClickHandler = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      {userInfo ? (
        <>
          <NavLink
            className='link-user'
            activeClassName='link-user--active'
            to='/wishlist'
          >
            <Heart className='user-nav__icon' />
          </NavLink>
          <div
            className={`user-nav__user ${
              !dropDownOpen ? '' : 'user-nav__user--open'
            }`}
            onClick={dropDownToggleClickHandler}
          >
            <img
              src={userInfo.photo}
              alt={userInfo.name}
              className='user-nav__img'
            />
            <IconOpen className='user-nav__icon' />
            {dropDownOpen ? (
              <div className='user-nav__dropdown'>
                {' '}
                {userInfo.role === 'admin' && (
                  <div className='user-nav__user-container'>
                    <span className='user-nav__user-label'>Admin</span>
                    <NavLink
                      className='link-submenu'
                      activeClassName='link-submenu--active'
                      to='/admin/products'
                    >
                      Products
                    </NavLink>
                    <NavLink
                      className='link-submenu'
                      activeClassName='link-submenu--active'
                      to='/admin/orders'
                    >
                      Orders
                    </NavLink>
                    <NavLink
                      className='link-submenu'
                      activeClassName='link-submenu--active'
                      to='/admin/users'
                    >
                      Users
                    </NavLink>
                    <NavLink
                      className='link-submenu'
                      activeClassName='link-submenu--active'
                      to='/admin/categories'
                    >
                      Categories
                    </NavLink>
                    <NavLink
                      className='link-submenu'
                      activeClassName='link-submenu--active'
                      to='/admin/subcategories'
                    >
                      Sub Categories
                    </NavLink>
                    <NavLink
                      className='link-submenu'
                      activeClassName='link-submenu--active'
                      to='/admin/reviews'
                    >
                      Reviews
                    </NavLink>
                  </div>
                )}
                <div className='user-nav__user-container'>
                  <NavLink
                    className='link-submenu'
                    activeClassName='link-submenu--active'
                    to='/myorders'
                  >
                    My Orders
                  </NavLink>
                  {userInfo.role !== 'admin' && (
                    <NavLink
                      className='link-submenu'
                      activeClassName='link-submenu--active'
                      to='/myreviews'
                    >
                      My Reviews
                    </NavLink>
                  )}
                </div>
                <div className='user-nav__user-container'>
                  <NavLink
                    className='link-submenu'
                    activeClassName='link-submenu--active'
                    to='/updateprofile'
                  >
                    Update Profile
                  </NavLink>
                  <NavLink
                    className='link-submenu'
                    activeClassName='link-submenu--active'
                    to='/updatepassword'
                  >
                    Edit Password
                  </NavLink>
                </div>
                <div className='user-nav__user-container'>
                  <NavLink
                    to='#'
                    className='link-submenu'
                    onClick={logoutHandler}
                  >
                    Sign out
                  </NavLink>
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <NavLink
            className='link-user'
            activeClassName='link-user--active'
            to='/login'
          >
            Sign in
          </NavLink>
          <NavLink
            activeClassName='btn-user--active'
            className='btn-user'
            to='/register'
          >
            Sign up
          </NavLink>
        </>
      )}
    </>
  );
};

export default UserNav;
