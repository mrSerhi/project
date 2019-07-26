import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import TodoNavbar from "./todos/TodoNavbar";
import Todo from "./pages/TodoPage";
import SignInForm from "./pages/SignInPage";
import SignUpForm from "./pages/SignUpPage";

const Navigation = () => {
  return (
    <Router>
      <TodoNavbar />
      <Switch>
        <Route path="/" exact component={Todo} />
        <Route path="/sign_in" component={SignInForm} />
        <Route path="/sign_up" component={SignUpForm} />
        <Route render={() => <h1>Page is not found...</h1>} />
      </Switch>
    </Router>
  );
};

export default Navigation;
