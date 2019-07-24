import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Todo app
import Todo from "./containers/TodoContainer";
import TodoNavbar from "../components/todos/TodoNavbar";
import SignInForm from "./pages/SignInPage";
import SignUpForm from "./pages/SignUpPage";

const App = () => {
  return (
    <Router>
      <Route component={TodoNavbar} />
      <Switch>
        <Route path="/" exact component={Todo} />
        <Route path="/sign_in" component={SignInForm} />
        <Route path="/sign_up" component={SignUpForm} />
        <Route render={() => <h1>Page is not found...</h1>} />
      </Switch>
    </Router>
  );
};

export default App;
