import React, { Component } from "react";
import Navigation from "./Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./ui/Navbar";

class App extends Component {
  state = { users: [], currentUser: {} };
  componentDidMount() {
    this.setState({
      users: JSON.parse(localStorage.getItem("users")) || [],
      currentUser: JSON.parse(localStorage.getItem("current-user")) || {}
    });
  }
  render() {
    return (
      <Router>
        <Navbar />
        <Navigation />
      </Router>
    );
  }
}

export default App;
