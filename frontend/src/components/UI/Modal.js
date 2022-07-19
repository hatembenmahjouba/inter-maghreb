import React from 'react';
import ReactDom from 'react-dom';
import Backdrop from './Backdrop';

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <Backdrop clicked={onClose} show />
      {children}
    </>,
    document.getElementById('portal-root')
  );
};

export default Modal;
