import React, { useEffect } from 'react';

const Backdrop = ({ show, clicked }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflowY = 'hidden';
    }
    return () => (document.body.style.overflowY = 'unset');
  }, [show]);
  return show ? <div className='backdrop' onClick={clicked} /> : null;
};
export default Backdrop;
