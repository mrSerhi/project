import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// components
import Todo from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const PrivateRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return authUser.id ? <Component {...props} /> : <Redirect to="/login" />;
    }}
  />
);

const Navigation = ({ currentUser, users, setCurrentUser, addNewUser }) => {
  return (
    <Switch>
      <PrivateRoute exact path="/" authUser={currentUser} component={Todo} />

      <Route
        path="/login"
        render={(props) => (
          <LoginPage
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            users={users}
            {...props}
          />
        )}
      />

      <Route
        path="/sign-up"
        render={(props) => (
          <SignUpPage addNewUser={addNewUser} users={users} {...props} />
        )}
      />
      <Route render={() => <h1>Page is not found...</h1>} />
    </Switch>
  );
};

export default Navigation;
