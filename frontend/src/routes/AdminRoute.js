import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Route {...rest}>
      {userInfo && userInfo.name && userInfo.role === 'admin' ? (
        children
      ) : (
        <Redirect to='/' />
      )}
    </Route>
  );
};

export default AdminRoute;
