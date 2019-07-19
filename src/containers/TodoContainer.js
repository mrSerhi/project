import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

// components
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import ListOfTasks from "../components/ListOfTasks/ListOfTasks";

class Todo extends Component {
  state = { tasks: [] };

  addTask = task => {
    this.setState({ tasks: [...this.state.tasks, task] });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="mt-5">
            <AddTaskForm handleAddTask={this.addTask} />
            <ListOfTasks tasks={this.state.tasks} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Todo;
