import React, { useCallback } from 'react';

const Slider = ({ children, sliderId }) => {
  const slideLeft = useCallback(() => {
    let slider = document.getElementById(sliderId);
    slider.scrollLeft = slider.scrollLeft - 200;
  }, [sliderId]);
  const slideRight = useCallback(() => {
    let slider = document.getElementById(sliderId);
    slider.scrollLeft = slider.scrollLeft + 200;
  }, [sliderId]);

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
