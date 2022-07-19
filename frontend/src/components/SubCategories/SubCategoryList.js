import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  listSubCategory,
  deleteSubCategory,
} from '../../redux/subCategory/subCategoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Remove } from '../../assets/img/SVG/bin.svg';
import { ReactComponent as Edit } from '../../assets/img/SVG/pencil.svg';
import Spiner from '../Spiner';
import Message from '../Message';

const SubCategoryList = () => {
  const dispatch = useDispatch();
  const subCategoryList = useSelector((state) => state.subCategoryList);

  const { loading, error, subCategories } = subCategoryList;
  const subCategoryCreate = useSelector((state) => state.subCategoryCreate);
  const { success: successCreated } = subCategoryCreate;
  const subCategoryDelete = useSelector((state) => state.subCategoryDelete);
  const { success: successDeleted } = subCategoryDelete;

  const deleteHandler = (slug) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteSubCategory(slug));
    }
  };

  useEffect(() => {
    dispatch(listSubCategory());
  }, [dispatch, successCreated, successDeleted]);

  return (
    <>
      <Spiner isLoading={loading}>
        {error ? (
          <Message className='error'>{error}</Message>
        ) : subCategories && subCategories.length > 0 ? (
          <>
            {subCategories.map((subCategory) => (
              <div className='category-list' key={subCategory._id}>
                <div className='category-list__name'>{subCategory.name}</div>
                <div className='category-list__actions'>
                  <Link to={`subcategories/${subCategory.slug}`}>
                    <Edit className='category-list__icon' />
                  </Link>
                  <Remove
                    className='category-list__icon'
                    onClick={() => deleteHandler(subCategory.slug)}
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <Message className='error'>No Categories</Message>
        )}
      </Spiner>
    </>
  );
};
export default SubCategoryList;
