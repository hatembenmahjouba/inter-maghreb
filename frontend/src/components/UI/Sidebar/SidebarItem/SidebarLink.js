import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarLink = ({ itemLink, children, sub }) => {
  let Classes = 'link-sidebar';
  let isActive = 'link-sidebar--active';
  if (sub) {
    Classes = 'link-sidebar link-sidebar--sub';
    isActive = 'link-sidebar--sub--active';
  }
  return (
    <NavLink className={Classes} activeClassName={isActive} to={itemLink} exact>
      {children}
    </NavLink>
  );
};

export default SidebarLink;
