import React from "react";
import { Route, Switch } from "react-router-dom";

// components
import Todo from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const Navigation = () => {
  return (
    <Switch>
      <Route path="/" exact component={Todo} />
      <Route path="/login" component={LoginPage} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route render={() => <h1>Page is not found...</h1>} />
    </Switch>
  );
};

export default Navigation;
