import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return isAuth.id ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} {...rest} />
      );
    }}
  />
);

export default PublicRoute;
