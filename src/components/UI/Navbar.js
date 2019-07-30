// import React from "react";
import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

class TodoNavbar extends Component {
  state = { currentUser: {} };

  handleLogout = () => {
    // const currentUser = { ...this.state.currentUser };
    // currentUser.isLogged = !userData.isLogged;
    this.setState({ currentUser: {} });
    localStorage.setItem("current-user", JSON.stringify({}));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        currentUser: JSON.parse(localStorage.getItem("current-user")) || {}
      });
    }
  }

  componentDidMount() {
    // this.setState({
    //   currentUser: JSON.parse(localStorage.getItem("current-user")) || {}
    // });
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
            {!this.state.currentUser.isLogged ? (
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
