import React from "react";
import { Alert } from "react-bootstrap";
import "./TasksList.css";

// components
import TasksListGroup from "./TasksListGroup";

const TasksList = ({ tasks, onRemoveTask, onToggleTaskDone }) => {
  return (
    <>
      {tasks.length !== 0 ? (
        <TasksListGroup
          tasks={tasks}
          onRemoveTask={onRemoveTask}
          onToggleTaskDone={onToggleTaskDone}
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
