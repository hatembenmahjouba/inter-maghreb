import React, { useState } from 'react';
import SidebarLabel from './SidebarLabel';
import SidebarSub from './SidebarSub';
import SidebarLink from './SidebarLink';
import { ReactComponent as IconOpen } from '../../../../assets/img/SVG/chevron-small-up.svg';
import { ReactComponent as IconClose } from '../../../../assets/img/SVG/chevron-small-down.svg';
const SidebarItem = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      {item.subNav ? (
        <>
          <SidebarLabel onClick={showSubnav}>
            {item.title}
            {!subnav ? (
              <IconClose className='sidebar__icon' />
            ) : (
              <IconOpen className='sidebar__icon' />
            )}
          </SidebarLabel>
          <SidebarSub show={subnav}>
            {item.subNav.map((subItem, index) => (
              <SidebarLink key={index} itemLink={subItem.path} sub>
                {subItem.title}
              </SidebarLink>
            ))}
          </SidebarSub>
        </>
      ) : (
        <SidebarLink itemLink={item.path}>
          <SidebarLabel>{item.title}</SidebarLabel>
        </SidebarLink>
      )}
    </>
  );
};

export default SidebarItem;
