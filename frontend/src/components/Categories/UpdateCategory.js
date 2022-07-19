import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoryDetails,
  updateCategory,
} from '../../redux/category/categoryActions';
import { useHistory, useParams } from 'react-router-dom';

import Spiner from '../Spiner';
import { CATEGORY_UPDATE_RESET } from '../../redux/category/categoryTypes';
import Message from '../Message';

const CategoryUpdate = () => {
  const params = useParams();
  const history = useHistory();
  const categorySlug = params.slug;
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading, error, category } = categoryDetails;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      history.push('/admin/categories');
    }
    if (!category || !category.name || category.slug !== categorySlug) {
      dispatch(getCategoryDetails(categorySlug));
    } else {
      setName(category.name);
    }
  }, [dispatch, categorySlug, category, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ slug: categorySlug, name }));
  };

  return (
    <>
      {error ? (
        <Message className='error'>{error}</Message>
      ) : (
        <>
          <div className='flex flex-dc flex-ai-c'>
            <Spiner isLoading={loadingUpdate} />
          </div>
          {errorUpdate && <Message className='error'>{errorUpdate}</Message>}
          <Spiner isLoading={loading}>
            <form className='form' onSubmit={submitHandler}>
              <div className='form__group' controlId='name'>
                <input
                  className='form__input'
                  id='name'
                  type='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className='form__label-input' htmlFor='name'>
                  Name
                </label>
              </div>
              <div>
                <button className='btn btn-form' type='submit'>
                  Update Category
                </button>
              </div>
            </form>
          </Spiner>
        </>
      )}
    </>
  );
};
export default CategoryUpdate;
