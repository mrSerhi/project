import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// components
import Tasks from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PrivateRoute from "./hoc/PrivateRoute";

const Navigation = ({ currentUser, setCurrentUser, users, addNewUser }) => {
  return (
    <Switch>
      <PrivateRoute exact path="/" authUser={currentUser} component={Tasks} />
      {!currentUser.id ? (
        <>
          <Route
            path="/login"
            render={(props) => (
              <LoginPage
                setCurrentUser={setCurrentUser}
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
        </>
      ) : (
        <Redirect to="/" />
      )}
      <Route render={() => <h1>Page is not found...</h1>} />
    </Switch>
  );
};

export default Navigation;
