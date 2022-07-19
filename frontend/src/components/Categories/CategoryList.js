import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  listCategory,
  deleteCategory,
} from '../../redux/category/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Remove } from '../../assets/img/SVG/bin.svg';
import { ReactComponent as Edit } from '../../assets/img/SVG/pencil.svg';
import Spiner from '../Spiner';
import Message from '../Message';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const deleteHandler = (slug) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCategory(slug));
    }
  };

  useEffect(() => {
    if (!categories) dispatch(listCategory());
  }, [dispatch, categories]);

  return (
    <>
      <Spiner isLoading={loading}>
        {error ? (
          <Message className='error'>{error}</Message>
        ) : categories && categories.length > 0 ? (
          <>
            {categories.map((category) => (
              <div className='category-list' key={category._id}>
                <div className='category-list__name'>{category.name}</div>
                <div className='category-list__actions'>
                  <Link to={`categories/${category.slug}`}>
                    <Edit className='category-list__icon' />
                  </Link>
                  <Remove
                    className='category-list__icon'
                    onClick={() => deleteHandler(category.slug)}
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
export default CategoryList;
