import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createSubCategory } from '../../redux/subCategory/subCategoryActions';

import Spiner from '../Spiner';
import { listCategory } from '../../redux/category/categoryActions';
import { SUBCATEGORY_CREATE_RESET } from '../../redux/subCategory/subCategoryTypes';
import Message from '../Message';

const AddCategory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const [categoriesList, setCategoriesList] = useState([]);
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const subCategoryCreate = useSelector((state) => state.subCategoryCreate);
  const { success, loading, error } = subCategoryCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: SUBCATEGORY_CREATE_RESET });
    }
    if (!categories || categories.length <= 0) {
      dispatch(listCategory());
    } else {
      setCategoriesList(categories);
    }
  }, [dispatch, categories, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSubCategory(name, category));
  };

  return (
    <>
      {error && <Message className='error'>{error}</Message>}
      <Spiner isLoading={loading}>
        <form className='form' onSubmit={submitHandler}>
          <div className='form__group'>
            <label className='form__label' htmlFor='subCategory'>
              Parent category:
            </label>
            <select
              className='form__select'
              name='subCategory'
              id='subCategory'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select</option>
              {categoriesList.length > 0 &&
                categoriesList.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className='form__group'>
            <input
              className='form__input'
              id='name'
              type='name'
              placeholder='Name'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label className='form__label-input' htmlFor='name'>
              Name
            </label>
          </div>

          <div className='form__group'>
            <button className='btn' type='submit'>
              Add
            </button>
          </div>
        </form>
      </Spiner>
    </>
  );
};

export default AddCategory;
