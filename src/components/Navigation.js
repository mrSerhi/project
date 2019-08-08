import React from "react";
import { Route, Switch } from "react-router-dom";

// components
import Tasks from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PrivateRoute from "./hoc/PrivateRoute";
import PublicRoute from "./hoc/PublicRoute";

const Navigation = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Tasks} />

      <PublicRoute path="/login" component={LoginPage} />

      <PublicRoute path="/sign-up" component={SignUpPage} />

      <Route render={() => <h1>Page is not found...</h1>} />
    </Switch>
  );
};

export default Navigation;
