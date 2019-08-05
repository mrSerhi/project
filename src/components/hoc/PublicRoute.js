import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return authUser.id ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} {...rest} />
      );
    }}
  />
);

export default PublicRoute;
