import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

// components
import AddTaskForm from "../todos/AddTaskForm";
import TasksList from "../todos/TasksList/TasksList";
import SortTasksBlock from "../todos/SortTasksBlock/SortTasks";
import TasksNavbar from "../Navbar";

class Todo extends Component {
  state = {
    tasks: [],
    searchQuery: "",
    filter: "all"
  };

  addTask = task => {
    this.setState({ tasks: [...this.state.tasks, task] });
  };

  removeTask = id => {
    this.setState({ tasks: this.state.tasks.filter(task => task.id !== id) });
  };

  removeAllCompletedTasks = e => {
    e.preventDefault();
    if (!window.confirm("Are you sure?")) return;

    this.setState({ tasks: this.state.tasks.filter(task => !task.done) });
  };

  toggleTaskDone = id => {
    this.setState({
      tasks: this.state.tasks.map(task =>
        task.id !== id ? task : { ...task, done: !task.done }
      )
    });
  };

  setSearchQuery = searchQuery => this.setState({ searchQuery });

  setTaskFilter = filter => this.setState({ filter });

  getFilteredTasks = (tasks, filter, searchQuery) => {
    const preparedQuery = searchQuery.trim().toLowerCase();

    if (filter === "done") {
      return tasks.filter(
        task => task.done && task.title.toLowerCase().includes(preparedQuery)
      );
    }

    if (filter === "active") {
      return tasks.filter(
        task => !task.done && task.title.toLowerCase().includes(preparedQuery)
      );
    }

    return tasks.filter(
      task => task && task.title.toLowerCase().includes(preparedQuery)
    );
  };

  componentDidMount() {
    // firsty saving to state from localStorage
    this.setState({
      tasks: JSON.parse(localStorage.getItem("tasks")) || []
    });
  }

  componentDidUpdate() {
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }

  render() {
    const { tasks, filter, searchQuery } = this.state;
    return (
      <>
        <TasksNavbar setSearchQuery={this.setSearchQuery} />
        <Container className="mt-5">
          <Row>
            <Col md={6} className="m-auto">
              <AddTaskForm tasks={tasks} handleAddTask={this.addTask} />

              <TasksList
                tasks={this.getFilteredTasks(tasks, filter, searchQuery)}
                onRemoveTask={this.removeTask}
                onToggleTaskDone={this.toggleTaskDone}
              />

              {this.state.tasks && (
                <SortTasksBlock
                  tasks={tasks}
                  handleGetTaskFilter={this.setTaskFilter}
                  handleRemovingCompletedTasks={this.removeAllCompletedTasks}
                  selectedFilter={this.state.filter}
                />
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Todo;
