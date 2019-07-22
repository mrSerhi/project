import React from "react";
import { ListGroup, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

const TasksListGroup = ({ tasks, handleRemoveTask, handleToggleTaskDone }) => {
  return (
    <ListGroup className="mt-4">
      {tasks.map(task => (
        <ListGroup.Item
          key={task.id}
          className="d-flex justify-content-between align-items-center"
        >
          <Form.Check
            type="checkbox"
            id="taskCheckbox"
            onChange={() => handleToggleTaskDone(task.id)}
            checked={task.done}
          />

          <span
            onClick={() => handleToggleTaskDone(task.id)}
            style={{ flexGrow: 1 }}
            className={classnames("text-uppercase", { "task-done": task.done })}
          >
            {task.title}
          </span>

          <Button
            onClick={() => handleRemoveTask(task.id)}
            variant="danger"
            size="sm"
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

TasksListGroup.propTypes = {
  tasks: PropTypes.array.isRequired,
  handleRemoveTask: PropTypes.func.isRequired,
  handleToggleTaskDone: PropTypes.func.isRequired
};

export default TasksListGroup;
