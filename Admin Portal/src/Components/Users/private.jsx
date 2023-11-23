import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateUser = ({ component: Component, uisLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      uisLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateUser;
