import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

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

  addTask = (task) => {
    this.setState({ tasks: [...this.state.tasks, task] });
  };

  onRemoveTask = (id) => {
    this.setState({ tasks: this.state.tasks.filter((task) => task.id !== id) });
  };

  removeCompletedTasks = () => {
    this.setState({
      tasks: this.state.tasks.filter((task) => !task.done),
      tasksRemoveModalIn: false
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

  paginateTasks = (tasks, currentPage, tasksLimit) => {
    const offset = currentPage * tasksLimit;
    const index = offset - tasksLimit;

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
    const { tasks, tasksLimit } = this.state;
    const countAllPages = Math.ceil(tasks.length / tasksLimit);

    if (prevState.currentPage > countAllPages && tasks.length) {
      this.setState({ currentPage: prevState.currentPage - 1 });
    }
  }

  render() {
    const {
      tasks,
      itemsFilter,
      searchQuery,
      currentPage,
      tasksLimit,
      tasksRemoveModalIn
    } = this.state;
    const filteredTasks = this.getFilteredTasks(
      tasks,
      itemsFilter,
      searchQuery
    );
    return (
      <Container className="mt-3">
        {!!tasksRemoveModalIn && (
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
              tasks={tasks}
              itemsFilter={itemsFilter}
              setTaskFilter={this.setTaskFilter}
              toggleModalRemoveTasks={this.onToggleModalRemoveTasks}
            />
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 6, offset: 3 }} className="d-flex flex-column mt-2">
            <AddTaskForm tasks={tasks} handleAddTask={this.addTask} />

            <TasksList
              tasks={this.paginateTasks(filteredTasks, currentPage, tasksLimit)}
              removeTask={this.onRemoveTask}
              toggleTaskDone={this.onToggleTaskDone}
            />

            <Pagination
              itemsTotal={filteredTasks.length}
              itemsLimit={tasksLimit}
              currentPage={currentPage}
              paginate={this.onPaginateChangeCurrentPage}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Tasks;
