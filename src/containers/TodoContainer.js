import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

// components
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import TasksList from "../components/TasksList/TasksList";
import SortTasksBlock from "../components/SortTasksBlock/SortTasks";
import TasksNavbar from "../components/TasksNavbar/Navbar";

class Todo extends Component {
  state = {
    tasks: [],
    searchQuery: "",
    filter: "all"
  };

  addTask = task => {
    const updatedTasks = [...this.state.tasks, task];
    this.setState({ tasks: updatedTasks });

    this.setDataToLocalStorage("tasks", updatedTasks);
  };

  removeTask = id => {
    const updatedTasks = this.state.tasks.filter(t => t.id !== id);
    this.setState({ tasks: updatedTasks });

    this.setDataToLocalStorage("tasks", updatedTasks);
  };

  removeAllCompletedTasks = e => {
    e.preventDefault();
    const updatedTasks = this.state.tasks.filter(t => !t.done);
    if (!window.confirm("Are you sure?")) return;
    this.setState({ tasks: updatedTasks });

    this.setDataToLocalStorage("tasks", updatedTasks);
  };

  toggleTaskDone = id => {
    const updatedTasks = this.state.tasks.map(task =>
      task.id !== id ? task : { ...task, done: !task.done }
    );
    this.setState({ tasks: updatedTasks });

    this.setDataToLocalStorage("tasks", updatedTasks);
  };

  setSearchQuery = searchQuery => this.setState({ searchQuery });

  getTaskFilter = filter => this.setState({ filter });

  filteringTasksByQuery = (tasks, query) => {
    return tasks.filter(
      t => t.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  };

  // return array of tasks on base searching query
  returnFilteredTaskResult = () => {
    const { tasks, searchQuery, filter } = this.state;
    let result;

    if (filter === "done") {
      result = tasks.filter(t => t.done);
    } else if (filter === "active") {
      result = tasks.filter(t => !t.done);
    } else {
      result = tasks;
    }

    return this.filteringTasksByQuery(result, searchQuery);
  };

  setAllTasksAsCompleted = () => {
    const updatedTasks = this.state.tasks.map(task =>
      task.done ? task : { ...task, done: !task.done }
    );
    this.setState({ tasks: updatedTasks });

    this.setDataToLocalStorage("tasks", updatedTasks);
  };

  setDataToLocalStorage = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data));

  componentDidMount() {
    // firsty saving to state from localStorage
    this.setState({
      tasks: JSON.parse(localStorage.getItem("tasks")) || []
    });
  }

  render() {
    return (
      <>
        <TasksNavbar setSearchQuery={this.setSearchQuery} />
        <Container className="mt-5">
          <Row>
            <Col md={6} className="m-auto">
              <AddTaskForm
                tasks={this.state.tasks}
                allTasksCompleted={this.state.allTasksCompleted}
                setAllTasksAsCompleted={this.setAllTasksAsCompleted}
                handleAddTask={this.addTask}
              />
              <TasksList
                tasks={this.returnFilteredTaskResult()}
                handleRemoveTask={this.removeTask}
                handleToggleTaskDone={this.toggleTaskDone}
              />
              {this.state.tasks.length > 0 && (
                <SortTasksBlock
                  activeTasksLength={
                    this.state.tasks.filter(t => !t.done).length
                  }
                  completedTasksLength={
                    this.state.tasks.filter(t => t.done).length
                  }
                  handleGetTaskFilter={this.getTaskFilter}
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
