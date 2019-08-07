import React, { Component } from "react";
import Navigation from "./Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./ui/Navbar";
import { connect } from "react-redux";
import { getAuthDataFromStorage } from "../store/auth/auth-actions";

class App extends Component {
  componentDidUpdate() {
    this.props.getAuthDataFromStorage();
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

export default connect(
  (state) => ({ users: state.auth.users }),
  { getAuthDataFromStorage }
)(App);
