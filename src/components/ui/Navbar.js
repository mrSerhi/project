import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

const TodoNavbar = ({ currentUser, logout }) => {
  return (
    <Navbar bg="info" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Todo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="todo-navbar-nav" />
        <Navbar.Collapse id="todo-navbar-nav">
          {!currentUser.id ? (
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
              <Nav.Link as={NavLink} to="/login" onClick={logout}>
                Log out
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withRouter(TodoNavbar);
