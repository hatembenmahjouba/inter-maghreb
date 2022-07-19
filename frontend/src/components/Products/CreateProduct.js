import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSubByCategory,
  listCategory,
} from '../../redux/category/categoryActions';

import Spiner from '../Spiner';

import { createProduct } from '../../redux/product/productActions';
import ProductUpload from './ProductUpload';
import { PRODUCT_CREATE_RESET } from '../../redux/product/productTypes';
import Message from '../Message';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('/uploads/images/products/default.png');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState([]);
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const [subShow, setSubShow] = useState(false);
  const [shipping, setShipping] = useState('yes');

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const categoryGetSub = useSelector((state) => state.categoryGetSub);
  const { category: subCategories } = categoryGetSub;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;

  useEffect(() => {
    if ((!categories || categories.length) <= 0) {
      dispatch(listCategory());
    } else {
      setCategoriesList(categories);
      if (subCategories && subCategories.subs.length > 0) {
        setSubCategoriesList(subCategories.subs);
      } else {
        setSubCategoriesList([]);
      }
    }
  }, [dispatch, subCategories, categories]);

  const handleCatagoryChange = (e) => {
    setCategory(e.target.value);
    dispatch(getSubByCategory(e.target.value));
    setSubShow(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct(
        name,
        brand,
        image,
        category,
        subCategory,
        countInStock,
        price,
        description,
        image,
        shipping
      )
    );
  };

  return (
    <>
      {error && <Message className='error'>{error}</Message>}
      <div className='flex flex-dc flex-ai-c'>
        <Spiner isLoading={loading} />
        {success && (
          <Message
            className='success'
            reset={PRODUCT_CREATE_RESET}
            linkTo='/admin/products'
            open
          >
            Success Create
          </Message>
        )}
      </div>

      <form className='form' onSubmit={submitHandler}>
        <div className='form__group'>
          <input
            className='form__input'
            id='name'
            type='name'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className='form__label-input' htmlFor='name'>
            Name
          </label>
        </div>
        <div className='form__group'>
          <input
            className='form__input'
            id='description'
            placeholder='Description'
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className='form__label-input' htmlFor='name'>
            description
          </label>
        </div>
        <div className='form__group'>
          <input
            className='form__input'
            id='brand'
            type='name'
            placeholder='Brand'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <label className='form__label-input' htmlFor='brand'>
            Brand
          </label>
        </div>
        <div className='form__group'>
          <input
            className='form__input'
            id='price'
            placeholder='Price'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label className='form__label-input' htmlFor='brand'>
            Price
          </label>
        </div>
        <div className='form__group'>
          <input
            className='form__input'
            id='countInStock'
            placeholder='Quantity'
            type='number'
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
          <label className='form__label-input' htmlFor='brand'>
            Quantity
          </label>
        </div>
        <div className='form__group'>
          <label className='form__label'>Shipping:</label>
          <select
            className='form__select'
            name='shipping'
            onChange={(e) => setShipping(e.target.value)}
          >
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </select>
        </div>
        <div className='form__group flex flex-ai-e'>
          <ProductUpload image={image} setImage={setImage} />
        </div>
        <div className='form__group'>
          <label className='form__label'>Category:</label>
          <select
            className='form__select'
            name='category'
            onChange={handleCatagoryChange}
          >
            <option className='select-css__option'>Please select</option>
            {categoriesList &&
              categoriesList.length > 0 &&
              categoriesList.map((c) => (
                <option
                  className='select-css__option'
                  key={c._id}
                  value={c._id}
                >
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        {subShow && subCategoriesList && subCategoriesList.length > 0 && (
          <div className='form__group'>
            <label className='form__label'>Sub Category:</label>
            <select
              className='form__select'
              name='sub category'
              multiple={true}
              onChange={(e) => {
                let value = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setSubCategory(value);
              }}
            >
              {subCategoriesList &&
                subCategoriesList.length > 0 &&
                subCategoriesList.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div className='form__group'>
          <button className='btn btn-form' type='submit'>
            Create Product
          </button>
        </div>
      </form>
    </>
  );
};
export default CreateProduct;
