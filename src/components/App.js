import React, { Component } from "react";
import Navigation from "./Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./ui/Navbar";

class App extends Component {
  state = { users: [], currentUser: {} };

  setCurrentUser = (currentUser = {}) => this.setState({ currentUser });

  addNewUser = (newUser) => {
    this.setState({ users: [...this.state.users, newUser] });
  };

  onLogout = () => this.setState({ currentUser: {} });

  componentDidMount() {
    this.setCurrentUser();
    this.setState({ users: JSON.parse(localStorage.getItem("users")) || [] });
  }

  componentDidUpdate() {
    localStorage.setItem(
      "current-user",
      JSON.stringify(this.state.currentUser)
    );
    localStorage.setItem("users", JSON.stringify(this.state.users));
  }

  render() {
    const { currentUser, users } = this.state;
    return (
      <Router>
        <Navbar currentUser={currentUser} logout={this.onLogout} />
        <Navigation
          setCurrentUser={this.setCurrentUser}
          addNewUser={this.addNewUser}
          currentUser={currentUser}
          users={users}
        />
      </Router>
    );
  }
}

export default App;
