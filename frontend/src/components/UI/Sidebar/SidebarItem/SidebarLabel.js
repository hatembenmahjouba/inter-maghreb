import React from 'react';

const SidebarLabel = ({ children, ...props }) => (
  <div className='sidebar__label' {...props}>
    {children}
  </div>
);

export default SidebarLabel;
