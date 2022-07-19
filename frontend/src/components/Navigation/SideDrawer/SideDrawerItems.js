import React, { useState } from 'react';
import { ReactComponent as IconOpen } from '../../../assets/img/SVG/chevron-small-up.svg';
import { ReactComponent as IconClose } from '../../../assets/img/SVG/chevron-small-down.svg';
import SideDrawerLabel from './SideDrawerLabel';
import SideDrawerSub from './SideDrawerSub';
import SideDrawerLink from './SideDrawerLink';
import { NavLink } from 'react-router-dom';
const SideDrawerItems = ({ closed, item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      {item.subNav ? (
        <>
          <SideDrawerLabel onClick={showSubnav} title={item.title}>
            {!subnav ? (
              <IconClose className='sidedrawer-label__icon' />
            ) : (
              <IconOpen className='sidedrawer-label__icon' />
            )}
          </SideDrawerLabel>
          <SideDrawerSub show={subnav}>
            {item.subNav.map((subItem, index) => (
              <SideDrawerLink
                key={index}
                itemLink={subItem.path}
                closed={closed}
                sub
              >
                {subItem.title}
              </SideDrawerLink>
            ))}
          </SideDrawerSub>
        </>
      ) : (
        <>
          <NavLink
            className='link-sidedrawer-label'
            to={item.path}
            activeClassName='link-sidedrawer-label--active'
          >
            <SideDrawerLabel onClick={closed} title={item.title} />
          </NavLink>
        </>
      )}
    </>
  );
};

export default SideDrawerItems;
