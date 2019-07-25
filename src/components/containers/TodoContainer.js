import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";
import { connect } from "react-redux";
import * as taskActions from "../../actions/tasks";
import { bindActionCreators } from "redux";

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
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.props.getTasksFromStorage(tasks);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tasks !== this.props.tasks)
      localStorage.setItem("tasks", JSON.stringify(this.props.tasks));
  }

  render() {
    return (
      <Container className="mt-3">
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="mb-2">
            <SortTasksBlock
              tasks={this.props.tasks}
              onSetTaskFilter={this.setTaskFilter}
              setSearchQuery={this.setSearchQuery}
            />
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 6, offset: 3 }} className="d-flex flex-column">
            <AddTaskForm />

            <TasksList />

            <Pagination
              className="ant-pagination align-self-center mt-2"
              current={this.state.currentPage}
              // total={tasks.length}
              onChange={this.changeCurrentPage}
              pageSize={this.state.tasksPerPage}
              locale={localeInfo}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({ tasks: state.tasks });
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(taskActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
