import React, { Component } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

// components
import AddTaskForm from "../todo/AddTaskForm";
import TasksList from "../todo/TasksList/TasksList";
import SortTasksBlock from "../todo/SortTasksBlock";
import Pagination from "../todo/Pagination";

class Todo extends Component {
  state = {
    tasks: [],
    searchQuery: "",
    itemsFilter: "all",
    TasksRemoveModalIn: false,
    limit: 5,
    currentPage: 1
  };

  onTasksRemoveModalIn = (e) => {
    e.preventDefault();
    this.setState({ TasksRemoveModalIn: true });
  };

  onTasksRemoveModalOut = () => this.setState({ TasksRemoveModalIn: false });

  addTask = (task) => {
    this.setState({ tasks: [...this.state.tasks, task] });
  };

  onRemoveTask = (id) => {
    this.setState({ tasks: this.state.tasks.filter((task) => task.id !== id) });
  };

  removeAllCompletedTasks = () => {
    this.setState({
      tasks: this.state.tasks.filter((task) => !task.done),
      TasksRemoveModalIn: false
    });
  };

  onToggleTaskDone = (id) => {
    this.setState({
      tasks: this.state.tasks.map((task) =>
        task.id !== id ? task : { ...task, done: !task.done }
      )
    });
  };

  setSearchQuery = (searchQuery) => this.setState({ searchQuery });

  setTaskFilter = (filter) => this.setState({ itemsFilter: filter });

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

  onPaginateChangeCurrentPage = (page) => this.setState({ currentPage: page });

  componentDidMount() {
    // at first saving to state from localStorage
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
    const { tasks, itemsFilter, searchQuery, currentPage, limit } = this.state;
    const filteredTasks = this.getFilteredTasks(
      tasks,
      itemsFilter,
      searchQuery
    );
    return (
      <>
        <Modal
          show={this.state.TasksRemoveModalIn}
          onHide={this.onTasksRemoveModalOut}
        >
          <Modal.Header closeButton>
            <h4>Are you sure?</h4>
          </Modal.Header>
          <Modal.Body>
            <p className="lead">All completed tasks will be deleted!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.removeAllCompletedTasks} variant="danger">
              Remove
            </Button>
            <Button onClick={this.onTasksRemoveModalOut} variant="info">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Container className="mt-3">
          <Row>
            <Col md={{ span: 8, offset: 2 }} className="mb-2">
              <SortTasksBlock
                tasks={tasks}
                itemsFilter={itemsFilter}
                setTaskFilter={this.setTaskFilter}
                setSearchQuery={this.setSearchQuery}
                tasksRemoveModalIn={this.onTasksRemoveModalIn}
              />
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 6, offset: 3 }} className="d-flex flex-column">
              <AddTaskForm tasks={tasks} handleAddTask={this.addTask} />

              <TasksList
                tasks={this.paginateTasks(filteredTasks, currentPage, limit)}
                removeTask={this.onRemoveTask}
                toggleTaskDone={this.onToggleTaskDone}
              />

              <Pagination
                itemsTotal={filteredTasks.length}
                itemsLimit={limit}
                currentPage={currentPage}
                paginate={this.onPaginateChangeCurrentPage}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Todo;
