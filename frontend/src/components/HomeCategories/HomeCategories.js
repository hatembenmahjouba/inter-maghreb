import React from 'react';
import { Link } from 'react-router-dom';
import HOMECATEGORIESDATA from './HomeCategoriesData';

const HomeCustom = () => (
  <div className='home-categories'>
    {HOMECATEGORIESDATA.map((item, index) => (
      <figure className='home-categories__image-box' key={index}>
        <Link to={item.link}>
          <img
            srcSet={`${item.images[0]} 300w, ${item.images[1]} 768w, ${item.images[2]} 1280w`}
            alt='bureau'
            className='home-categories__image'
            src={item.images[0]}
          />
          <span className='home-categories__name'>{item.name}</span>
        </Link>
      </figure>
    ))}
  </div>
);

export default HomeCustom;
