import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// components
import Todo from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const PrivetRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const userdata = JSON.parse(localStorage.getItem("userdata")) || {};
      return userdata.isLogged ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

const Navigation = () => {
  return (
    <Switch>
      <PrivetRoute path="/" exact component={Todo} />
      <Route path="/login" component={LoginPage} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route render={() => <h1>Page is not found...</h1>} />
    </Switch>
  );
};

export default Navigation;
