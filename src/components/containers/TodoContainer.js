import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";
import { connect } from "react-redux";
import {
  addTaskAction,
  getTasksFromStorage,
  removeTaskAction,
  updateTaskAction,
  REMOVE_ALL_COMPLETED_TASKS
} from "../../actions/tasks";

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

  addTask = (task) => this.props.dispatch(addTaskAction(task));

  removeTask = (id) => this.props.dispatch(removeTaskAction(id));

  removeAllCompletedTasks = () => {
    // this.setState({
    //   tasks: this.state.tasks.filter((task) => !task.done),
    //   showModal: false
    // });
    this.props.dispatch({ type: REMOVE_ALL_COMPLETED_TASKS });
  };

  toggleTaskDone = (id) => this.props.dispatch(updateTaskAction(id));

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
    // this.setState({
    //   tasks: JSON.parse(localStorage.getItem("tasks")) || []
    // });
    // const localStorageTasks = JSON.parse(localStorage.getItem("tasks"));
    // this.props.addTaskAction(...localStorageTasks);
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.props.dispatch(getTasksFromStorage(tasks));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tasks !== this.props.tasks)
      localStorage.setItem("tasks", JSON.stringify(this.props.tasks));
  }

  render() {
    const { tasks, filter, searchQuery } = this.state;
    const filteredTasks = this.getFilteredTasks(
      this.props.tasks,
      filter,
      searchQuery
    );
    return (
      <>
        <Container className="mt-3">
          <Row>
            <Col md={{ span: 8, offset: 2 }} className="mb-2">
              <SortTasksBlock
                tasks={this.props.tasks}
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

const mapStateToProps = (state) => ({ tasks: state.tasks });

export default connect(mapStateToProps)(Todo);
