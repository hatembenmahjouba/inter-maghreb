import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link className='link-logo' to='/'>
      <h1 className='logo-text'>Inter Maghreb</h1>
    </Link>
  );
};

export default Logo;
