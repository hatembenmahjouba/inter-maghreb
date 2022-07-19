import React, { useState } from 'react';
import { ReactComponent as IconOpen } from '../../../assets/img/SVG/chevron-small-up.svg';
import { ReactComponent as IconClose } from '../../../assets/img/SVG/chevron-small-down.svg';
import SideDrawerLabel from './SideDrawerLabel';
import SideDrawerSub from './SideDrawerSub';
import SideDrawerLink from './SideDrawerLink';
import { NavLink } from 'react-router-dom';

const SideDrawerMenu = ({ closed, item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      {item.subs && item.subs.length > 0 ? (
        <>
          <SideDrawerLabel
            onClick={showSubnav}
            title={item.name}
            linkTo={`/categories/${item.slug}`}
            closed={closed}
          >
            {!subnav ? (
              <IconClose className='sidedrawer-label__icon' />
            ) : (
              <IconOpen className='sidedrawer-label__icon' />
            )}
          </SideDrawerLabel>
          <SideDrawerSub show={subnav}>
            {item.subs.map((subItem, index) => (
              <SideDrawerLink
                closed={closed}
                key={index}
                itemLink={`/categories/${item.slug}/subs/${subItem.slug}`}
              >
                {subItem.name}
              </SideDrawerLink>
            ))}
          </SideDrawerSub>
        </>
      ) : (
        <>
          <NavLink
            className='link-sidedrawer-label'
            to={`/categories/${item.slug}`}
            onClick={closed}
            activeClassName='link-sidedrawer-label--active'
          >
            <SideDrawerLabel title={item.name} />
          </NavLink>
        </>
      )}
    </>
  );
};

export default SideDrawerMenu;
