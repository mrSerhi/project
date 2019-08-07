import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import * as taskActions from "../../store/task/task-actions";

// components
import AddTaskForm from "../tasks/AddTaskForm";
import TasksList from "../tasks/TasksList/TasksList";
import SortTasksBlock from "../tasks/SortTasksBlock";
import Pagination from "../tasks/Pagination";
import SearchTaskForm from "../tasks/SearchTaskForm";
import TasksRemoveModal from "../modals/TasksRemoveModal";

class Tasks extends Component {
  state = {
    tasks: [],
    searchQuery: "",
    itemsFilter: "all",
    tasksRemoveModalIn: false,
    tasksLimit: 5,
    currentPage: 1
  };

  onToggleModalRemoveTasks = (status = false) => {
    this.setState({ tasksRemoveModalIn: status });
  };

  removeCompletedTasks = () => {
    this.props.clearCompletedTasksAndSave();
    this.setState({
      tasksRemoveModalIn: false
    });
  };

  paginateTasks = (tasks, currentPage, tasksLimit) => {
    const offset = currentPage * tasksLimit;
    const index = offset - tasksLimit;

    return tasks.slice(index, offset);
  };

  onPaginateChangeCurrentPage = (page) => this.setState({ currentPage: page });

  componentDidMount() {
    this.props.getAllTasks();
  }

  componentDidUpdate(prevProps, prevState) {
    // pagination
    // returns back if currentPage number is biggest than number of all pages
    // exp: allPages = 5/5 -> 1; currPage = 2; {2 > 1 and [] is not empty} -> currentPage - 1
    const { tasks, tasksLimit } = this.state;
    const countAllPages = Math.ceil(tasks.length / tasksLimit);

    if (prevState.currentPage > countAllPages && tasks.length) {
      this.setState({ currentPage: prevState.currentPage - 1 });
    }
  }

  render() {
    return (
      <Container className="mt-3">
        {!!this.state.tasksRemoveModalIn && (
          <TasksRemoveModal
            toggleModalRemoveTasks={this.onToggleModalRemoveTasks}
            removeCompletedTasks={this.removeCompletedTasks}
          />
        )}

        <Row>
          <Col sm={{ span: 7 }}>
            <SearchTaskForm setSearchQuery={this.setSearchQuery} />
          </Col>
          <Col sm={{ span: 5 }}>
            <SortTasksBlock
              toggleModalRemoveTasks={this.onToggleModalRemoveTasks}
            />
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 6, offset: 3 }} className="d-flex flex-column mt-2">
            <AddTaskForm />

            <TasksList />

            <Pagination />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.todo.tasks
});

export default connect(
  mapStateToProps,
  { ...taskActions }
)(Tasks);
