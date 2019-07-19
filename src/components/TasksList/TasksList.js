import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

// components
import TasksListGroup from "./TasksListGroup";

const TasksList = ({ tasks, handleRemoveTask }) => {
  return (
    <>
      {tasks.length !== 0 ? (
        <TasksListGroup tasks={tasks} handleRemoveTask={handleRemoveTask} />
      ) : (
        <Alert variant="info" className="mt-4 text-center">
          No one tasks is found...
        </Alert>
      )}
    </>
  );
};

export default TasksList;
