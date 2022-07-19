import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getSubByCategory,
  listCategory,
} from '../../redux/category/categoryActions';

import Spiner from '../Spiner';

import {
  updateProduct,
  getProductDetails,
} from '../../redux/product/productActions';
import ProductUpload from './ProductUpload';
import { PRODUCT_UPDATE_RESET } from '../../redux/product/productTypes';
import Message from '../Message';
import { CATEGORY_LIST_SUB_RESET } from '../../redux/category/categoryTypes';

const UpdateProduct = () => {
  const params = useParams();
  const productSlug = params.slug;
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState([]);
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const [shipping, setShipping] = useState(false);

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading: loadingCategories } = categoryList;
  const categoryGetSub = useSelector((state) => state.categoryGetSub);
  const {
    category: subCategories,
    loading: loadingSubCategories,
    success: successSubCategories,
  } = categoryGetSub;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_LIST_SUB_RESET });
    } else {
      if (
        !categories ||
        categories.length <= 0 ||
        !product ||
        !product.name ||
        !product.image ||
        product.slug !== productSlug
      ) {
        dispatch({ type: CATEGORY_LIST_SUB_RESET });
        dispatch(getProductDetails(productSlug));
        dispatch(listCategory());
      } else {
        setCategoriesList(categories);
        setName(product.name);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setShipping(product.shipping);
        setImage(product.image);
        setCategory(product.category);

        if (!subCategories) {
          dispatch(getSubByCategory(product.category));
        } else {
          setSubCategory(product.subCategory);
          setCategory(subCategories.category);
          setSubCategoriesList(subCategories.subs);
        }
      }
    }
  }, [
    dispatch,
    productSlug,
    successSubCategories,
    subCategories,
    product,
    successUpdate,
    categories,
  ]);

  const handleCatagoryChange = (e) => {
    setSubCategory([]);
    dispatch(getSubByCategory(e.target.value));
    setCategory(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        shipping,
        productSlug,
        name,
        brand,
        category,
        subCategory,
        countInStock,
        price,
        description,
        image,
      })
    );
  };

  return (
    <>
      <Spiner isLoading={loading}>
        {error ? (
          <Message className='error'>{error}</Message>
        ) : (
          <>
            <div className='flex flex-dc flex-ai-c'>
              <Spiner isLoading={loadingUpdate} />
              {errorUpdate && <Message className='error'>{error}</Message>}
              {successUpdate && (
                <Message
                  className='success'
                  reset={PRODUCT_UPDATE_RESET}
                  linkTo='/admin/products'
                  open
                >
                  Success Update
                </Message>
              )}
            </div>

            <form className='form' onSubmit={submitHandler}>
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
                <input
                  className='form__input'
                  id='description'
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
                <ProductUpload setImage={setImage} image={image} />
              </div>
              <Spiner isLoading={loadingCategories}>
                <div className='form__group'>
                  <label className='form__label'>Category:</label>
                  <select
                    className='form__select'
                    name='category'
                    value={category}
                    onChange={handleCatagoryChange}
                  >
                    {categoriesList &&
                      categoriesList.length > 0 &&
                      categoriesList.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
              </Spiner>
              <Spiner isLoading={loadingSubCategories}>
                {subCategoriesList && subCategoriesList.length > 0 && (
                  <div className='form__group'>
                    <label className='form__label'>Sub Category:</label>
                    <select
                      className='form__select'
                      multiple={true}
                      name='sub category'
                      placeholder='Please select'
                      value={subCategory}
                      onChange={(e) => {
                        let value = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        );
                        setSubCategory(value);
                      }}
                    >
                      {subCategoriesList.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </Spiner>

              <div className='form__group'>
                <button className='btn btn-form' type='submit'>
                  Update Product
                </button>
              </div>
            </form>
          </>
        )}
      </Spiner>
    </>
  );
};
export default UpdateProduct;
