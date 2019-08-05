import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return authUser.id ? <Component {...props} /> : <Redirect to="/login" />;
    }}
  />
);

export default PrivateRoute;
