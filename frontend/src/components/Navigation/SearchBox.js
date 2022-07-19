import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { ReactComponent as Search } from '../../assets/img/SVG/magnifying-glass.svg';
import { useSelector } from 'react-redux';

const SearchBox = ({ closed }) => {
  const [category, setCategory] = useState('');
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const history = useHistory();
  const [keyword, setKeyword] = useState('');
  const handleCatagoryChange = (e) => {
    setCategory(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push({
        pathname: `/${category ? `categories/${category}` : 'products'}`,
        search: `?${new URLSearchParams({ search: keyword }).toString()}`,
      });
    } else {
      history.push(`/${category ? `categories/${category}` : 'products'}`);
    }
    if (closed) closed();
  };
  return (
    <form className='search-nav' onSubmit={submitHandler}>
      <div className='search-nav__select-box'>
        <select className='search-nav__select' onChange={handleCatagoryChange}>
          <option value={''}>all</option>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category.slug}>
                {category.name}
              </option>
            ))}
        </select>
        <span className='search-nav__arrow'></span>
      </div>
      <input
        className='search-nav__input'
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search products...'
      />
      <button className='search-nav__button' type='submit'>
        <Search className='search-nav__icon' />
      </button>
    </form>
  );
};

export default SearchBox;
