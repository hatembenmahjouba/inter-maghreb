import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Message = ({
  children,
  reset,
  open,
  linkTo,
  goBack,
  redirect,
  ...props
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (open) {
      const timeId = setTimeout(() => {
        // After 2 seconds set the show value to false
        if (linkTo) history.push(linkTo);
        if (redirect) history.replace(redirect);
        if (reset) dispatch({ type: reset });
        if (goBack) history.goBack();
        setShow(false);
      }, 3000);

      return () => {
        clearTimeout(timeId);
      };
    }
  }, [open, dispatch, history, linkTo, reset, redirect, goBack]);

  return show && <div {...props}>{children}</div>;
};

export default Message;
