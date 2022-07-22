import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import CartDropDown from '../Cart/CartDropDown/CartDropDown';

const Header = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [dropDownCartOpen, setDropDownCartOpen] = useState(false);
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const dropDownCartToggleClickHandler = () => {
    setDropDownCartOpen(!dropDownCartOpen);
  };

  const cartToggleHiddenHandler = () => {
    setDropDownCartOpen(false);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  return (
    <header className='header'>
      <div className='header__toolbar'>
        <Toolbar
          drawerClickHandler={drawerToggleClickHandler}
          dropDownClickHandler={dropDownCartToggleClickHandler}
          dropDownCartOpen={dropDownCartOpen}
        />
      </div>
      <SideDrawer open={sideDrawerOpen} closed={backdropClickHandler} />

      {dropDownCartOpen ? (
        <CartDropDown click={cartToggleHiddenHandler} />
      ) : null}

      <div className='header__banner flex flex-dc flex-ai-c flex-jc-c'>
        <h1 className='heading-1'>discover all products</h1>
        <Link to='/products' className='btn'>
          our products
        </Link>
      </div>
    </header>
  );
};

export default Header;
