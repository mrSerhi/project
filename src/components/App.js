import React, { Component } from "react";
import Navigation from "./Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./ui/Navbar";

class App extends Component {
  state = { users: [], currentUser: {} };

  addNewUser = (newUser) => {
    this.setState({ users: [...this.state.users, newUser] });
  };

  setCurrentUser = (currentUser = {}) => this.setState({ currentUser });

  onLogout = () => this.setState({ currentUser: {} });

  componentDidMount() {
    this.setState({
      users: JSON.parse(localStorage.getItem("users")) || [],
      currentUser:
        JSON.parse(localStorage.getItem("current-user")) ||
        this.setCurrentUser()
    });
  }

  componentDidUpdate() {
    const { users, currentUser } = this.state;

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("current-user", JSON.stringify(currentUser));
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
