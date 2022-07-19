import React from 'react';

const Spiner = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <div className='spiner flex flex-jc-c flex-ai-c'>
          <div className='spiner__container'></div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Spiner;
