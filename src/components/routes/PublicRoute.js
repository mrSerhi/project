import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

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

export default connect((state) => ({ isAuth: state.auth.isAuth }))(PublicRoute);
