import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../redux/user/userActions';
import { ReactComponent as IconOpen } from '../../../../assets/img/SVG/chevron-small-up.svg';
import { ReactComponent as IconClose } from '../../../../assets/img/SVG/chevron-small-down.svg';
import SIDEDRAWERUSERDATA from './SideDrawerUserData.';
import { NavLink } from 'react-router-dom';

import SideDrawerSub from '../SideDrawerSub';
import SideDrawerLabel from '../SideDrawerLabel';
import SideDrawerLink from '../SideDrawerLink';

const SideDrawerUser = ({ closed }) => {
  const dispatch = useDispatch();

  const [adminSub, setAdminSub] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    closed();
  };
  return (
    <>
      {userInfo && userInfo.name ? (
        <>
          <SideDrawerLabel onClick={() => setAdminSub(!adminSub)}>
            <div className='sidedrawer-user__user'>
              <img
                src={userInfo.photo}
                alt={userInfo.name}
                className='sidedrawer-user__photo'
              />
              <h2 className='sidedrawer-user__name'>Hi, {userInfo.name}</h2>
              <p className='sidedrawer-user__email'>{userInfo.email}</p>
            </div>
            {!adminSub ? (
              <IconClose className='sidedrawer-label__icon' />
            ) : (
              <IconOpen className='sidedrawer-label__icon' />
            )}
          </SideDrawerLabel>
          <SideDrawerSub show={adminSub}>
            {SIDEDRAWERUSERDATA.map((item, index) => (
              <SideDrawerLink key={index} itemLink={item.path} closed={closed}>
                {item.title}
              </SideDrawerLink>
            ))}
            <SideDrawerLink itemLink='#' closed={logoutHandler}>
              Logout
            </SideDrawerLink>
          </SideDrawerSub>
        </>
      ) : (
        <div className='sidedrawer-user__container'>
          <NavLink
            activeClassName='btn-user--active'
            className='btn-user'
            to='/login'
            onClick={closed}
          >
            Sign In
          </NavLink>
          <NavLink
            className='btn-user'
            activeClassName='btn-user--active'
            to='/register'
            onClick={closed}
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </>
  );
};

export default SideDrawerUser;
