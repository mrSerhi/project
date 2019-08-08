import React from "react";
import { Route, Switch } from "react-router-dom";

// components
import Tasks from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PrivateRoute from "./hoc/PrivateRoute";

const Navigation = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" isLogged={true} component={Tasks} />

      <PrivateRoute path="/login" isGuest={true} component={LoginPage} />

      <PrivateRoute path="/sign-up" isGuest={true} component={SignUpPage} />

      <Route render={() => <h1>Page is not found...</h1>} />
    </Switch>
  );
};

export default Navigation;
