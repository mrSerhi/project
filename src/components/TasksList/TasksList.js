import React from "react";
import { Alert } from "react-bootstrap";
import "./taskList.css";

// components
import TasksListGroup from "./TasksListGroup";

const TasksList = ({ tasks, handleRemoveTask, handleToggleTaskDone }) => {
  return (
    <>
      {tasks.length !== 0 ? (
        <TasksListGroup
          tasks={tasks}
          handleRemoveTask={handleRemoveTask}
          handleToggleTaskDone={handleToggleTaskDone}
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
