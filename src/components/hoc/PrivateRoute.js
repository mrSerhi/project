import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  isAuth,
  isLogged = false,
  isGuest = false,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if ((isLogged && isAuth.id) || (isGuest && !isAuth.id)) {
        return <Component {...props} />;
      } else {
        return <Redirect to={{ pathname: isLogged ? "/login" : "/" }} />;
      }
    }}
  />
);

export default connect((state) => ({ isAuth: state.auth.isAuth }))(
  PrivateRoute
);
