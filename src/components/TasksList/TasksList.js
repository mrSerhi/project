import React from "react";
import { Alert } from "react-bootstrap";
import "./taskList.css";

// components
import TasksListGroup from "./TasksListGroup";

const TasksList = ({ tasks, handleRemoveTask, handleToggleTask }) => {
  return (
    <>
      {tasks.length !== 0 ? (
        <TasksListGroup
          tasks={tasks}
          handleRemoveTask={handleRemoveTask}
          handleToggleTask={handleToggleTask}
        />
      ) : (
        <Alert variant="info" className="mt-4 text-center">
          No one tasks is found...
        </Alert>
      )}
    </>
  );
};

export default TasksList;
