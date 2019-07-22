import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

// components
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import TasksList from "../components/TasksList/TasksList";
// import SearchTaskForm from "../components/SearchTaskForm/SearchTaskForm";
import SortTasksBlock from "../components/SortTasksBlock";
import TasksNavbar from "../components/TasksNavbar/Navbar";

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

  setSearchQuery = searchQuery => this.setState({ searchQuery });

  getTaskFilter = filter => this.setState({ filter });

  filterTasksByQuery = (tasks, query) => {
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

    return this.filterTasksByQuery(result, searchQuery);
  };

  clearComplatedTasks = e => {
    e.preventDefault();
    if (!window.confirm("Are you sure?")) return;
    this.setState({ tasks: this.state.tasks.filter(t => !t.done) });
  };

  setAllTasksAsCompleted = () => {
    const shalow = [...this.state.tasks];
    shalow.forEach(t => ({ ...t, done: true }));
    // this.setState({
    //   tasks: this.state.tasks.map(task => ({ ...task }))
    // });
    // return this.state.tasks.map(task => ({ ...task, done: true }));
    return shalow;
  };

  componentDidMount() {
    // firsty saving to state from localStorage
    this.setState({ tasks: JSON.parse(localStorage.getItem("tasks")) || [] });
  }

  render() {
    const { tasks } = this.state;
    const activeTasksLength = this.state.tasks.reduce(
      (sub, curr) => (sub += !curr.done),
      0
    );
    const completedTasksLength = this.state.tasks.reduce(
      (sub, curr) => (sub += curr.done),
      1
    );

    console.log(this.setAllTasksAsCompleted());
    return (
      <>
        <TasksNavbar setSearchQuery={this.setSearchQuery} />
        <Container className="mt-5">
          <Row>
            <Col md={6} className="m-auto">
              <AddTaskForm
                setAllTasksAsCompleted={this.setAllTasksAsCompleted}
                handleAddTask={this.addTask}
              />
              <TasksList
                tasks={this.returnFilteredTaskResult()}
                handleRemoveTask={this.removeTask}
                handleToggleTaskDone={this.toggleTaskDone}
              />
              {tasks.length > 0 && (
                <SortTasksBlock
                  activeTasksLength={activeTasksLength}
                  completedTasksLength={completedTasksLength}
                  handleGetTaskFilter={this.getTaskFilter}
                  handleClearComplatedTasks={this.clearComplatedTasks}
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
