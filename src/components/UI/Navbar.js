// import React from "react";
import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

class TodoNavbar extends Component {
  state = { userData: {} };

  handleLogout = () => {
    const userData = { ...this.state.userData };
    userData.isLogged = !userData.isLogged;
    this.setState({ userData });
    localStorage.setItem("userdata", JSON.stringify(userData));
  };

  componentDidMount() {
    this.setState({
      userData: JSON.parse(localStorage.getItem("userdata")) || {}
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        userData: JSON.parse(localStorage.getItem("userdata"))
      });
    }
  }
  render() {
    return (
      <Navbar bg="info" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Todos
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="todo-navbar-nav" />
          <Navbar.Collapse id="todo-navbar-nav">
            {!this.state.userData.isLogged ? (
              <Nav className="ml-auto">
                <Nav.Link as={NavLink} to="/sign-up" activeClassName="active">
                  Sign up
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" activeClassName="active">
                  Log in
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <Nav.Link as={NavLink} to="/login" onClick={this.handleLogout}>
                  Log out
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default withRouter(TodoNavbar);
