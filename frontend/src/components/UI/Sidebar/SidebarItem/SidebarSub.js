import React from 'react';

const SidebarSub = ({ show, children }) => {
  return (
    <div className={show ? 'sidebar__sub sidebar__sub--open' : 'sidebar__sub'}>
      {children}
    </div>
  );
};

export default SidebarSub;
