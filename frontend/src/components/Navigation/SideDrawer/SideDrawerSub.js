import React from 'react';
const SideDrawerSub = ({ show, children }) => {
  let Classes = 'sideDrawer-sub';
  if (show) {
    Classes = 'sideDrawer-sub sideDrawer-sub--open';
  }
  return <div className={Classes}>{children}</div>;
};

export default SideDrawerSub;
