import React from 'react';
import SidebarItem from './SidebarItem/SidebarItem';
import { useSelector } from 'react-redux';

const Sidebar = ({ data }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <ul className='sidebar'>
      {data.map((item, index) => (
        <li className='sidebar__item' key={index}>
          {item.user ? (
            userInfo.role === 'user' ? (
              <SidebarItem item={item} />
            ) : null
          ) : (
            <SidebarItem item={item} key={index} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
