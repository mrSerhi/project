import React from "react";
import { Route, Switch } from "react-router-dom";
import { currentUserAuth } from "../utils/auth";

// components
import Tasks from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PrivateRoute from "./hoc/PrivateRoute";

const Navigation = ({ currentUser, setCurrentUser, users, addNewUser }) => {
  return (
    <Switch>
      <PrivateRoute
        exact
        path="/"
        auth={currentUserAuth(currentUser)}
        component={Tasks}
      />

      <Route
        path="/login"
        render={(props) => (
          <LoginPage
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            users={users}
            {...props}
          />
        )}
      />

      <Route
        path="/sign-up"
        render={(props) => (
          <SignUpPage
            addNewUser={addNewUser}
            currentUser={currentUser}
            users={users}
            {...props}
          />
        )}
      />

      <Route render={() => <h1>Page is not found...</h1>} />
    </Switch>
  );
};

export default Navigation;
