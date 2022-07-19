import React, { useEffect } from 'react';
import NavigationItem from './NavigationItem';
import { listCategory } from '../../../redux/category/categoryActions';
import { useDispatch, useSelector } from 'react-redux';

const NavigationItems = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success: successCreated } = categoryCreate;
  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { success: successDeleted } = categoryDelete;
  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { success: successUpdate } = categoryUpdate;
  const subCategoryCreate = useSelector((state) => state.subCategoryCreate);
  const { success: successSubCreated } = subCategoryCreate;
  const subCategoryDelete = useSelector((state) => state.subCategoryDelete);
  const { success: successSubDeleted } = subCategoryDelete;
  const subCategoryUpdate = useSelector((state) => state.subCategoryUpdate);
  const { success: successSubUpdate } = subCategoryUpdate;

  useEffect(() => {
    dispatch(listCategory());
  }, [
    dispatch,
    successCreated,
    successDeleted,
    successUpdate,
    successSubDeleted,
    successSubCreated,
    successSubUpdate,
  ]);

  return (
    <>
      {categories &&
        categories.length > 0 &&
        categories.map((category) => (
          <NavigationItem key={category._id} category={category} />
        ))}
    </>
  );
};

export default NavigationItems;
