import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Pagination = ({ pages, page, keyword = '', admin = false }) => {
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let startPage = 0;
  let endPage = 0;
  if (pages <= 10) {
    startPage = 1;
    endPage = pages;
  } else {
    if (page <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (page + 4 >= pages) {
      startPage = pages - 9;
      endPage = pages;
    } else {
      startPage = page - 5;
      endPage = page + 4;
    }
  }
  let arrayPages = [...Array(endPage + 1 - startPage).keys()].map(
    (i) => startPage + i
  );
  return (
    <div className='pagination flex flex-jc-c'>
      {arrayPages.map((x, index) => {
        searchParams.set('page', x);
        return (
          <Link
            className={
              x === page
                ? 'pagination__item pagination__item--active'
                : 'pagination__item'
            }
            key={index}
            to={{
              pathname: location.pathname,
              search: searchParams.toString(),
            }}
          >
            {x}
          </Link>
        );
      })}
    </div>
  );
};

export default Pagination;
