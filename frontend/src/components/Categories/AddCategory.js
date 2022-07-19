import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../redux/category/categoryActions';

import Spiner from '../Spiner';
import { CATEGORY_CREATE_RESET } from '../../redux/category/categoryTypes';
import Message from '../Message';

const AddCategory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const categoryCreate = useSelector((state) => state.categoryCreate);

  const { success, loading, error } = categoryCreate;

  useEffect(() => {
    if (success) {
      setName('');
      dispatch({ type: CATEGORY_CREATE_RESET });
    }
  }, [success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory(name));
  };

  return (
    <>
      {error && <Message className='error'>{error}</Message>}
      <Spiner isLoading={loading}>
        <form className='form' onSubmit={submitHandler}>
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

          <div>
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
