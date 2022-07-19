import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as SearchButton } from '../../assets/img/SVG/magnifying-glass.svg';

const Search = ({ name }) => {
  const history = useHistory();
  const location = useLocation();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push({
        pathname: location.pathname,
        search: `?${new URLSearchParams({ search: keyword }).toString()}`,
      });
    } else {
      history.push({
        pathname: location.pathname,
      });
    }
  };

  return (
    <form className='search' onSubmit={submitHandler}>
      <input
        className='search__input'
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={`Search ${name}...`}
      ></input>
      <button type='submit' className='search__button'>
        <SearchButton className='search__icon' />
      </button>
    </form>
  );
};

export default Search;
