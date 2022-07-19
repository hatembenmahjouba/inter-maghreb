import React from 'react';

const Slider = ({ children, sliderId }) => {
  const slideLeft = () => {
    let slider = document.getElementById(sliderId);
    slider.scrollLeft = slider.scrollLeft - 200;
  };
  const slideRight = () => {
    let slider = document.getElementById(sliderId);
    slider.scrollLeft = slider.scrollLeft + 200;
  };

  return (
    <>
      <div id='main-slider-container'>
        <div className='slider__icon slider__icon--left' onClick={slideLeft}>
          &#10094;
        </div>
        <div id={sliderId} className='slider'>
          {children}
        </div>
        <div className='slider__icon slider__icon--right' onClick={slideRight}>
          &#10095;
        </div>
      </div>
    </>
  );
};
export default Slider;
