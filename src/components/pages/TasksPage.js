import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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

const Tasks = ({ clearCompletedTasksAndSave, getAllTasks }) => {
  const [removeTaskModalIn, setRemoveTaskModalIn] = useState(false);
  const onToggleModalRemoveTasks = (status = false) => {
    setRemoveTaskModalIn(status);
  };
  const removeCompletedTasks = () => {
    clearCompletedTasksAndSave();
    setRemoveTaskModalIn(false);
  };

  useEffect(() => {
    getAllTasks();
  });
  return (
    <Container className="mt-3">
      {!!removeTaskModalIn && (
        <TasksRemoveModal
          toggleModalRemoveTasks={onToggleModalRemoveTasks}
          removeCompletedTasks={removeCompletedTasks}
        />
      )}

      <Row>
        <Col sm={{ span: 7 }}>
          <SearchTaskForm />
        </Col>

        <Col sm={{ span: 5 }}>
          <SortTasksBlock toggleModalRemoveTasks={onToggleModalRemoveTasks} />
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
};

Tasks.propTypes = {
  clearCompletedTasksAndSave: PropTypes.func.isRequired,
  getAllTasks: PropTypes.func.isRequired
};

export default connect(
  null,
  { ...taskActions }
)(Tasks);
