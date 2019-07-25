import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

const TasksListGroup = ({ tasks, onRemoveTask, onToggleTaskDone }) => {
  return (
    <ListGroup>
      {tasks.map((task) => (
        <ListGroup.Item key={task.id} className="task-group-item">
          <div
            onClick={() => onToggleTaskDone(task.id)}
            className={classnames("task-item", { "task-done": task.done })}
          >
            {task.title}
          </div>

          <Button
            onClick={() => onRemoveTask(task.id)}
            variant="link"
            size="sm"
            className="task-remove__button"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
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
