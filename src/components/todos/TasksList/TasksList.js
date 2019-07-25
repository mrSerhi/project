import React from "react";
import { Alert, Card } from "react-bootstrap";
import "./TasksList.css";

// components
import TasksListGroup from "./TasksListGroup";

const TasksList = ({ tasks, onRemoveTask, onToggleTaskDone }) => {
  return (
    <Card style={{ height: "340px" }}>
      <Card.Body>
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
      </Card.Body>
    </Card>
  );
};

export default TasksList;
