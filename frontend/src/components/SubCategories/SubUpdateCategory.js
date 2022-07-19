import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSubCategoryDetails,
  updateSubCategory,
} from '../../redux/subCategory/subCategoryActions';
import { useHistory, useParams } from 'react-router-dom';

import Spiner from '../Spiner';
import { SUBCATEGORY_UPDATE_RESET } from '../../redux/subCategory/subCategoryTypes';
import { listCategory } from '../../redux/category/categoryActions';
import Message from '../Message';

const SubCategoryUpdate = () => {
  const params = useParams();
  const history = useHistory();
  const subCategorySlug = params.slug;
  const [name, setName] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const subCategoryDetails = useSelector((state) => state.subCategoryDetails);
  const { loading, error, subCategory } = subCategoryDetails;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const subCategoryUpdate = useSelector((state) => state.subCategoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = subCategoryUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SUBCATEGORY_UPDATE_RESET });
      history.push('/admin/subcategories');
    }
    if (!categories || categories.length <= 0) {
      dispatch(listCategory());
    } else {
      setCategoriesList(categories);
      if (
        !subCategory ||
        !subCategory.name ||
        subCategory.slug !== subCategorySlug
      ) {
        dispatch(getSubCategoryDetails(subCategorySlug));
      } else {
        setName(subCategory.name);
        setCategory(subCategory.category);
      }
    }
  }, [
    dispatch,
    categories,
    subCategorySlug,
    subCategory,
    history,
    successUpdate,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateSubCategory({ slug: subCategorySlug, name, category }));
  };

  return (
    <>
      {error ? (
        <Message className='error'>{error}</Message>
      ) : (
        <>
          <div className='flex flex-dc flex-ai-c'>
            <Spiner isLoading={loadingUpdate} />
            {errorUpdate && <Message className='error'>{errorUpdate}</Message>}
          </div>

          <Spiner isLoading={loading}>
            <form className='form' onSubmit={submitHandler}>
              <div className='form__group'>
                <label className='form__label'>Parent category:</label>
                <select
                  className='form__select'
                  name='category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className='form__label-input' htmlFor='name'>
                  Name
                </label>
              </div>
              <div className='form__group'>
                <button className='btn btn-form' type='submit'>
                  Update subCategory
                </button>
              </div>
            </form>
          </Spiner>
        </>
      )}
    </>
  );
};
export default SubCategoryUpdate;
