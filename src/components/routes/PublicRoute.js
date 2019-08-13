import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

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

export default connect((state) => ({ authUser: state.auth.authUser }))(
  PublicRoute
);
