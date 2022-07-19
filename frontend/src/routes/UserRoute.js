import React from 'react';

import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserRoute = ({ children, ...rest }) => {
  const location = useLocation();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Route {...rest}>
      {userInfo && userInfo.name ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )}
    </Route>
  );
};

export default UserRoute;
