import React from "react";
import { ListGroup, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

const TasksListGroup = ({ tasks, onRemoveTask, onToggleTaskDone }) => {
  return (
    <ListGroup>
      {tasks.map((task, index) => (
        <ListGroup.Item
          key={task.id}
          className="d-flex justify-content-between align-items-center"
          onClick={() => onToggleTaskDone(task.id)}
        >
          <div
            style={{ flexGrow: 1 }}
            className={classnames("task-item", { "task-done": task.done })}
          >
            {index + 1}. {task.title}
          </div>

          <Button
            onClick={() => onRemoveTask(task.id)}
            variant="link"
            size="sm"
            className="task-remove__button"
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

TasksListGroup.propTypes = {
  tasks: PropTypes.array.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
  onToggleTaskDone: PropTypes.func.isRequired
};

export default TasksListGroup;
