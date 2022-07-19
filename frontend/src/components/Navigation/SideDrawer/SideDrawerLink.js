import React from 'react';
import { NavLink } from 'react-router-dom';

const SideDrawerLink = ({ closed, itemLink, children, sub }) => {
  return (
    <>
      <NavLink
        className='link-sidedrawer'
        to={itemLink}
        onClick={closed}
        activeClassName={itemLink !== '#' ? 'link-sidedrawer--active' : ''}
        exact={sub}
      >
        {children}
      </NavLink>
    </>
  );
};

export default SideDrawerLink;
