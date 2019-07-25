import React, { Component } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";

// components
import AddTaskForm from "../todos/AddTaskForm";
import TasksList from "../todos/TasksList/TasksList";
import SortTasksBlock from "../todos/SortTasksBlock";
import Pagination from "rc-pagination";

class Todo extends Component {
  state = {
    tasks: [],
    searchQuery: "",
    filter: "all",
    showModal: false,
    tasksPerPage: 5,
    currentPage: 1
  };

  openModal = (e) => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  closeModal = () => this.setState({ showModal: false });

  addTask = (task) => {
    this.setState({ tasks: [...this.state.tasks, task] });
  };

  removeTask = (id) => {
    this.setState({ tasks: this.state.tasks.filter((task) => task.id !== id) });
  };

  removeAllCompletedTasks = () => {
    this.setState({
      tasks: this.state.tasks.filter((task) => !task.done),
      showModal: false
    });
  };

  toggleTaskDone = (id) => {
    this.setState({
      tasks: this.state.tasks.map((task) =>
        task.id !== id ? task : { ...task, done: !task.done }
      )
    });
  };

  setSearchQuery = (searchQuery) => this.setState({ searchQuery });

  setTaskFilter = (filter) => this.setState({ filter });

  getFilteredTasks = (tasks, filter, searchQuery) => {
    const preparedQuery = searchQuery.trim().toLowerCase();

    if (filter === "done") {
      return tasks.filter(
        (task) => task.done && task.title.toLowerCase().includes(preparedQuery)
      );
    }

    if (filter === "active") {
      return tasks.filter(
        (task) => !task.done && task.title.toLowerCase().includes(preparedQuery)
      );
    }

    return tasks.filter(
      (task) => task && task.title.toLowerCase().includes(preparedQuery)
    );
  };

  paginateTasks = (tasks) => {
    const indexOfLastTask = this.state.currentPage * this.state.tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - this.state.tasksPerPage;

    return tasks.slice(indexOfFirstTask, indexOfLastTask);
  };

  changeCurrentPage = (page) => this.setState({ currentPage: page });

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
    const filteredTasks = this.getFilteredTasks(tasks, filter, searchQuery);
    return (
      <>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <h4>Are you sure?</h4>
          </Modal.Header>
          <Modal.Body>
            <p className="lead">All complated tasks will be deleted!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.removeAllCompletedTasks} variant="danger">
              Remove
            </Button>
            <Button onClick={this.closeModal} variant="info">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Container className="mt-3">
          <Row>
            <Col md={{ span: 8, offset: 2 }} className="mb-2">
              <SortTasksBlock
                tasks={tasks}
                onSetTaskFilter={this.setTaskFilter}
                setSearchQuery={this.setSearchQuery}
                openModal={this.openModal}
              />
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 6, offset: 3 }} className="d-flex flex-column">
              <AddTaskForm tasks={tasks} handleAddTask={this.addTask} />

              <TasksList
                tasks={this.paginateTasks(filteredTasks)}
                onRemoveTask={this.removeTask}
                onToggleTaskDone={this.toggleTaskDone}
              />

              <Pagination
                className="ant-pagination align-self-center mt-2"
                current={this.state.currentPage}
                total={tasks.length}
                onChange={this.changeCurrentPage}
                pageSize={this.state.tasksPerPage}
                locale={localeInfo}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Todo;
