import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

// components
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import TasksList from "../components/TasksList/TasksList";

class Todo extends Component {
  state = { tasks: [] };

  addTask = task => {
    this.setState({ tasks: [...this.state.tasks, task] });

    // save to localstorage
    localStorage.setItem("tasks", JSON.stringify([...this.state.tasks, task]));
  };

  removeTask = id => {
    const updatedTasks = this.state.tasks.filter(t => t.id !== id);
    this.setState({ tasks: updatedTasks });

    // remove from localstorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  toggleTask = id => {
    const updatedTasks = this.state.tasks.map(task =>
      task.id !== id ? task : { ...task, done: !task.done }
    );
    this.setState({ tasks: updatedTasks });

    // update in localstorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  componentDidMount() {
    // firsty saving to state from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (this.state.tasks.length === 0) {
      this.setState({ tasks });
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="mt-5">
            <AddTaskForm handleAddTask={this.addTask} />
            <TasksList
              tasks={this.state.tasks}
              handleRemoveTask={this.removeTask}
              handleToggleTask={this.toggleTask}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Todo;
