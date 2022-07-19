import React from 'react';
import { NavLink } from 'react-router-dom';

const SideDrawerLabel = ({ closed, linkTo, title, children, ...props }) => (
  <>
    <div className='sidedrawer-label' {...props}>
      {linkTo ? (
        <NavLink
          className='link-sidedrawer-label'
          to={linkTo}
          onClick={closed}
          activeClassName='link-sidedrawer-label--active'
        >
          {title}
        </NavLink>
      ) : (
        <span>{title}</span>
      )}

      {children}
    </div>
  </>
);

export default SideDrawerLabel;
