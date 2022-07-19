import React, { useEffect } from 'react';
import SideDrawerUser from './SideDrawerUser/SideDrawerUser';
import SIDEDRAWERDATA from './SideDrawerData';
import SideDrawerItems from './SideDrawerItems';
import { useDispatch, useSelector } from 'react-redux';
import { listCategory } from '../../../redux/category/categoryActions';
import SideDrawerMenu from './SideDrawerMenu';
import Modal from '../../UI/Modal';

const SideDrawer = ({ open, closed }) => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!categories) {
      dispatch(listCategory());
    }
  }, [dispatch, categories]);

  return (
    <Modal open={open} onClose={closed}>
      <div className='side-drawer'>
        <div className='side-drawer__container'>
          <SideDrawerUser closed={closed} />
        </div>
        {userInfo && userInfo.role === 'admin' && (
          <div className='side-drawer__container'>
            <span className='side-drawer__container-label'>Admin</span>
            {SIDEDRAWERDATA.map((item, index) => (
              <SideDrawerItems key={index} item={item} closed={closed} />
            ))}
          </div>
        )}
        {categories && categories.length > 0 && (
          <div className='side-drawer__container'>
            <span className='side-drawer__container-label'>Categories</span>
            {categories.map((category, index) => (
              <SideDrawerMenu key={index} item={category} closed={closed} />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SideDrawer;
