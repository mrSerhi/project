import React, { Component } from "react";
import PropTypes from "prop-types";
import Navigation from "./Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./ui/Navbar";
import { connect } from "react-redux";
import { getAuthDataFromStorage } from "../store/auth/auth-actions";

class App extends Component {
  static propTypes = {
    getAuthDataFromStorage: PropTypes.func.isRequired
  };

  componentDidMount() {
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
  null,
  { getAuthDataFromStorage }
)(App);
