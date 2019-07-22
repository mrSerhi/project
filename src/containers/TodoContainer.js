import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

// components
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import TasksList from "../components/TasksList/TasksList";
import SearchTaskForm from "../components/SearchTaskForm/SearchTaskForm";
import SortTasksButtonGroup from "../components/SortTasks/SortTasksButtonGroup";

class Todo extends Component {
  state = { tasks: [], searchQuery: "", filter: "all" };

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

  toggleTaskDone = id => {
    const updatedTasks = this.state.tasks.map(task =>
      task.id !== id ? task : { ...task, done: !task.done }
    );
    this.setState({ tasks: updatedTasks });

    // update in localstorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  addSearchQuery = searchQuery => this.setState({ searchQuery });

  getTaskFilter = filter => this.setState({ filter });

  // return array of tasks on base searching query
  returnFilteredTaskResult = () => {
    const { tasks, searchQuery, filter } = this.state;

    if (filter === "done") return tasks.filter(t => t.done);
    if (filter === "active") return tasks.filter(t => !t.done);

    return tasks.filter(
      t => t.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    );
  };

  componentDidMount() {
    // firsty saving to state from localStorage
    this.setState({ tasks: JSON.parse(localStorage.getItem("tasks")) || [] });
  }

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col md={7}>
            <AddTaskForm handleAddTask={this.addTask} />
          </Col>

          <Col md={4}>
            <SearchTaskForm getSearchQuery={this.addSearchQuery} />
          </Col>
        </Row>

        <Row>
          <Col sx={{ span: 7 }}>
            <TasksList
              tasks={this.returnFilteredTaskResult()}
              handleRemoveTask={this.removeTask}
              handleToggleTaskDone={this.toggleTaskDone}
            />
          </Col>

          <Col>
            <SortTasksButtonGroup handleGetTaskFilter={this.getTaskFilter} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Todo;
