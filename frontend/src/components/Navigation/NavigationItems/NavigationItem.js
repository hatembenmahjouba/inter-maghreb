import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationItem = ({ category }) => {
  return (
    <div className='navigation-item'>
      <NavLink
        to={`/categories/${category.slug}`}
        className='link-menu'
        activeClassName='link-menu--active'
      >
        {category.name}
      </NavLink>
      <ul className='navigation-item__sub'>
        {category.subs &&
          category.subs.length > 0 &&
          category.subs.map((sub) => (
            <li className='navigation-item__sub-list' key={sub._id}>
              <NavLink
                className='link-submenu'
                activeClassName='link-submenu--active'
                to={`/categories/${category.slug}/subs/${sub.slug}`}
              >
                {sub.name}
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default NavigationItem;
