import React, { Component } from "react";
import Navigation from "./Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./ui/Navbar";

class App extends Component {
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
