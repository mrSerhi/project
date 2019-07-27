import React, { Component } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

// components
import AddTaskForm from "../todos/AddTaskForm";
import TasksList from "../todos/TasksList/TasksList";
import SortTasksBlock from "../todos/SortTasksBlock";
import Pagination from "../todos/Pagination";

class Todo extends Component {
  state = {
    tasks: [],
    searchQuery: "",
    filter: "all",
    showModal: false,
    limit: 5,
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

  paginateTasks = (tasks, currentPage, limit) => {
    const offset = currentPage * limit;
    const index = offset - limit;

    return tasks.slice(index, offset);
  };

  changeCurrentPage = (page) => this.setState({ currentPage: page });

  componentDidMount() {
    // firsty saving to state from localStorage
    this.setState({
      tasks: JSON.parse(localStorage.getItem("tasks")) || []
    });
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));

    // pagination
    // returns back if currentPage number is biggest than number of all pages
    // exp: allPages = 5/5 -> 1; currPage = 2; {2 > 1 and [] is not empty} -> currentPage - 1
    const { tasks, limit } = this.state;
    const countAllPages = Math.ceil(tasks.length / limit);

    if (prevState.currentPage > countAllPages && tasks.length) {
      this.setState({ currentPage: prevState.currentPage - 1 });
    }
  }

  render() {
    const { tasks, filter, searchQuery, currentPage, limit } = this.state;
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
                tasks={this.paginateTasks(filteredTasks, currentPage, limit)}
                onRemoveTask={this.removeTask}
                onToggleTaskDone={this.toggleTaskDone}
              />

              <Pagination
                itemsTotal={filteredTasks.length}
                limit={limit}
                currentPage={currentPage}
                onPaginate={this.changeCurrentPage}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Todo;
