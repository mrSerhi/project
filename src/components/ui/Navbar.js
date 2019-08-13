import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faListAlt
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { logOut } from "../../store/auth/auth-actions";

const TodoNavbar = ({ authUser, logOut }) => {
  return (
    <Navbar bg="info" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Tasks <FontAwesomeIcon icon={faListAlt} size="lg" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="todo-navbar-nav" />
        <Navbar.Collapse id="todo-navbar-nav">
          {!authUser.id ? (
            <Nav className="ml-auto">
              <Nav.Link as={NavLink} to="/sign-up" activeClassName="active">
                Sign up
              </Nav.Link>
              <Nav.Link as={NavLink} to="/login" activeClassName="active">
                Log in <FontAwesomeIcon icon={faSignInAlt} />
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link as={NavLink} to="/login" onClick={logOut}>
                Log out <FontAwesomeIcon icon={faSignOutAlt} />
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withRouter(
  connect(
    (state) => ({ authUser: state.auth.authUser }),
    { logOut }
  )(TodoNavbar)
);
