import React, { useState } from 'react';
import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggle';
import CartIcon from '../Cart/CartIcon';
import SearchBox from './SearchBox';
import Logo from '../Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import UserNav from './UserNav/UserNav';
import { ReactComponent as Search } from '../../assets/img/SVG/magnifying-glass.svg';
import { ReactComponent as Close } from '../../assets/img/SVG/close_black_24dp.svg';

const Toolbar = (props) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropDownToggleClickHandler = () => {
    setDropDownOpen(!dropDownOpen);
  };
  return (
    <div className='toolbar'>
      <DrawerToggle click={props.drawerClickHandler} />

      {dropDownOpen ? (
        <>
          <div
            className='toolbar__mobile-search toolbar__mobile-search--open'
            onClick={dropDownToggleClickHandler}
          >
            <Close className='toolbar__icon' />
          </div>
          <div className='toolbar__dropdown'>
            <SearchBox />
          </div>
        </>
      ) : (
        <div
          className='toolbar__mobile-search'
          onClick={dropDownToggleClickHandler}
        >
          <Search className='toolbar__icon' />
        </div>
      )}
      <div className='toolbar__logo flex flex-ai-c flex-jc-c'>
        <Logo />
      </div>
      <div className='toolbar__search'>
        <SearchBox />
      </div>
      <div className='toolbar__user'>
        <UserNav />
      </div>
      <div
        className={`toolbar__cart ${
          props.dropDownCartOpen ? 'toolbar__cart--open' : ''
        }`}
        onClick={props.dropDownClickHandler}
      >
        <CartIcon />
      </div>
      <div className='toolbar__navigation'>
        <NavigationItems />
      </div>
    </div>
  );
};

export default Toolbar;
