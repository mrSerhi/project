import React from "react";
import { Navbar, Container } from "react-bootstrap";
import SearchTaskForm from "../SearchTaskForm/SearchTaskForm";

const TasksNavbar = ({ setSearchQuery }) => {
  return (
    <Navbar bg="info" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Todos</Navbar.Brand>

        <SearchTaskForm setSearchQuery={setSearchQuery} />
      </Container>
    </Navbar>
  );
};

export default TasksNavbar;
